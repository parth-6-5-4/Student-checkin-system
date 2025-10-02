import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { Student } from '../models/Student.js';
import { CheckIn } from '../models/CheckIn.js';
import { authRequired } from '../middleware/auth.js';

const router = Router();

router.post(
  '/',
  authRequired,
  [
    body('name').isString().trim().isLength({ min: 2, max: 100 }),
    body('email').isEmail().normalizeEmail(),
    body('studentId').isString().trim().isLength({ min: 3, max: 50 }),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { name, email, studentId } = req.body;
      const institute = req.admin?.instituteName;
      if (!institute) return res.status(401).json({ message: 'Unauthorized' });
      const student = await Student.create({ name, email, studentId, institute });
      return res.status(201).json(student);
    } catch (err) {
      if (err && err.code === 11000) {
        const field = Object.keys(err.keyPattern || {})[0] || 'field';
        return res.status(409).json({ message: `${field} must be unique` });
      }
      next(err);
    }
  }
);

router.get('/', authRequired, async (req, res, next) => {
  try {
    const institute = req.admin?.instituteName;
    const { q } = req.query;
    const filter = { institute };
    if (q && typeof q === 'string' && q.trim()) {
      const regex = new RegExp(q.trim(), 'i');
      Object.assign(filter, {
        $or: [
          { name: regex },
          { studentId: regex },
        ],
      });
    }
    const students = await Student.find(filter).lean();
    res.json(students);
  } catch (err) {
    next(err);
  }
});

// Get single student by studentId within admin's institute
router.get('/:studentId', authRequired, async (req, res, next) => {
  try {
    const institute = req.admin?.instituteName;
    const { studentId } = req.params;
    const student = await Student.findOne({ institute, studentId }).lean();
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    next(err);
  }
});

// Get check-in history for a student with optional UTC date range filters
router.get('/:studentId/checkins', authRequired, async (req, res, next) => {
  try {
    const institute = req.admin?.instituteName;
    const { studentId } = req.params;
    const { from, to } = req.query;
    const student = await Student.findOne({ institute, studentId }).lean();
    if (!student) return res.status(404).json({ message: 'Student not found' });

    let startDate = null;
    let endDate = null;
    if (typeof from === 'string' && from) {
      const d = new Date(from);
      if (!isNaN(d)) startDate = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
    }
    if (typeof to === 'string' && to) {
      const d = new Date(to);
      if (!isNaN(d)) endDate = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 1));
    }

    const query = { student: student._id };
    if (startDate || endDate) {
      query.timestamp = {};
      if (startDate) query.timestamp.$gte = startDate;
      if (endDate) query.timestamp.$lt = endDate;
    }

    const checkins = await CheckIn.find(query).sort({ timestamp: -1 }).lean();
    res.json(checkins);
  } catch (err) {
    next(err);
  }
});
export default router;
