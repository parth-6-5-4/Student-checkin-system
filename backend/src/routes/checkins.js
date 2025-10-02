import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { Student } from '../models/Student.js';
import { CheckIn } from '../models/CheckIn.js';

const router = Router();

router.post(
  '/checkin',
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
      const student = await Student.findOne({ studentId });
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

router.get('/checkins', async (req, res, next) => {
  try {
    const checkins = await CheckIn.find()
      .sort({ timestamp: -1 })
      .populate({ path: 'student', select: 'name email studentId' })
      .lean();
    res.json(checkins);
  } catch (err) {
    next(err);
  }
});

export default router;
