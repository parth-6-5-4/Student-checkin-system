import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { Student } from '../models/Student.js';

const router = Router();

router.post(
  '/',
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
      const student = await Student.create({ name, email, studentId });
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

router.get('/', async (req, res, next) => {
  try {
    const students = await Student.find().lean();
    res.json(students);
  } catch (err) {
    next(err);
  }
});

export default router;
