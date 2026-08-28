import { Router, Request, Response } from 'express';
import Workout from '../models/workout.js';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const workouts = await Workout.find();
  res.json(workouts);
});

router.get('/:id', async (req: Request, res: Response) => {
  const workout = await Workout.findById(req.params.id);
  if (!workout) { res.status(404).json({ message: 'Workout not found' }); return; }
  res.json(workout);
});

router.post('/', async (req: Request, res: Response) => {
  const workout = new Workout(req.body);
  await workout.save();
  res.status(201).json(workout);
});

router.put('/:id', async (req: Request, res: Response) => {
  const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!workout) { res.status(404).json({ message: 'Workout not found' }); return; }
  res.json(workout);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const workout = await Workout.findByIdAndDelete(req.params.id);
  if (!workout) { res.status(404).json({ message: 'Workout not found' }); return; }
  res.json({ message: 'Workout deleted' });
});

export default router;
