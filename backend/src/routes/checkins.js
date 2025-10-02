import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { Student } from '../models/Student.js';
import { CheckIn } from '../models/CheckIn.js';
import { authRequired } from '../middleware/auth.js';

const router = Router();

router.post(
  '/checkin',
  authRequired,
  [
    body('studentId').isString().trim().isLength({ min: 3, max: 50 }),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { studentId } = req.body;
      const institute = req.admin?.instituteName;
      const student = await Student.findOne({ studentId, institute });
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      // Do not accept client-provided timestamps. Use server time via schema default (UTC)
      const checkIn = await CheckIn.create({
        student: student._id,
        timestamp: new Date(),
      });
      const populated = await checkIn.populate({
        path: 'student',
        select: 'name email studentId',
      });
      return res.status(201).json(populated);
    } catch (err) {
      next(err);
    }
  }
);

router.get('/checkins', authRequired, async (req, res, next) => {
  try {
    const institute = req.admin?.instituteName;
    const checkins = await CheckIn.find()
      .sort({ timestamp: -1 })
      .populate({ path: 'student', select: 'name email studentId institute' })
      .lean();
    const filtered = checkins.filter((c) => c.student && c.student.institute === institute)
      .map((c) => ({ ...c, student: { name: c.student.name, email: c.student.email, studentId: c.student.studentId } }));
    res.json(filtered);
  } catch (err) {
    next(err);
  }
});

export default router;
