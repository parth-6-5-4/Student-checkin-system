import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { Admin } from '../models/Admin.js';
import { authRequired, setAuthCookie, clearAuthCookie } from '../middleware/auth.js';

const router = Router();

router.post(
  '/signup',
  [
    body('adminId').isString().trim().isLength({ min: 3, max: 100 }),
    body('email').isEmail().matches(/@gmail\.com$/i).normalizeEmail(),
    body('password').isString().isLength({ min: 6 }),
    body('instituteName').isString().trim().isLength({ min: 2, max: 150 }),
  ],
  async (req, res, next) => {
    console.log(req.body);

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      const { adminId, email, password, instituteName } = req.body;
      const admin = await Admin.create({ adminId, email, password, instituteName });
      setAuthCookie(res, { id: admin._id.toString(), adminId: admin.adminId, instituteName: admin.instituteName });
      return res.status(201).json({ adminId: admin.adminId, instituteName: admin.instituteName, email: admin.email });
    } catch (err) {
      if (err && err.code === 11000) {
        const field = Object.keys(err.keyPattern || {})[0] || 'field';
        return res.status(409).json({ message: `${field} must be unique` });
      }
      next(err);
    }
  }
);

router.post(
  '/login',
  [
    body('adminId').optional().isString().trim(),
    body('email').optional().isEmail().normalizeEmail(),
    body('password').isString().isLength({ min: 6 }),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      const { adminId, email, password } = req.body;
      const admin = await Admin.findOne(adminId ? { adminId } : { email });
      if (!admin) return res.status(401).json({ message: 'Invalid credentials' });
      const ok = await admin.comparePassword(password);
      if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
      setAuthCookie(res, { id: admin._id.toString(), adminId: admin.adminId, instituteName: admin.instituteName });
      return res.json({ adminId: admin.adminId, instituteName: admin.instituteName, email: admin.email });
    } catch (err) {
      next(err);
    }
  }
);

router.post('/logout', (req, res) => {
  clearAuthCookie(res);
  res.json({ success: true });
});

router.get('/me', authRequired, (req, res) => {
  res.json({ adminId: req.admin.adminId, instituteName: req.admin.instituteName });
});

export default router;
