import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    amount: { type: Number, required: true },
    transactionType: {
      type: String,
      enum: ['deposit' | 'withdrawal', 'credit'],
      required: true,
    },
    description: { type: String, required: true },
    balanceAfterTransaction: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Transaction', transactionSchema);
