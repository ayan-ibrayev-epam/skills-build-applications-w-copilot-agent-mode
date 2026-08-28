import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  exercises: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Workout', workoutSchema);
