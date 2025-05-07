import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bankName: { type: String, required: true },
    accountType: { type: String, enum: ['savings', 'checking'], required: true },
    balance: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Account', accountSchema);
