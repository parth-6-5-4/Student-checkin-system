import mongoose from 'mongoose';

const checkInSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    timestamp: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  }
);

checkInSchema.index({ student: 1, timestamp: -1 });

export const CheckIn = mongoose.model('CheckIn', checkInSchema);
