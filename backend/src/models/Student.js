import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    institute: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 150,
    },
    studentId: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

// Enforce composite uniqueness: a student is uniquely identified within an institute by studentId
studentSchema.index({ institute: 1, studentId: 1 }, { unique: true });

export const Student = mongoose.model('Student', studentSchema);
