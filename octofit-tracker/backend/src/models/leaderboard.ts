import mongoose from 'mongoose';

const leaderboardSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true, default: 0 },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Leaderboard', leaderboardSchema);
