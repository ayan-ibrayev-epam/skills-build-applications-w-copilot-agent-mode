import { Router, Request, Response } from 'express';
import Activity from '../models/activity.js';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const activities = await Activity.find().populate('user', '-password');
  res.json(activities);
});

router.get('/:id', async (req: Request, res: Response) => {
  const activity = await Activity.findById(req.params.id).populate('user', '-password');
  if (!activity) { res.status(404).json({ message: 'Activity not found' }); return; }
  res.json(activity);
});

router.post('/', async (req: Request, res: Response) => {
  const activity = new Activity(req.body);
  await activity.save();
  res.status(201).json(activity);
});

router.put('/:id', async (req: Request, res: Response) => {
  const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!activity) { res.status(404).json({ message: 'Activity not found' }); return; }
  res.json(activity);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const activity = await Activity.findByIdAndDelete(req.params.id);
  if (!activity) { res.status(404).json({ message: 'Activity not found' }); return; }
  res.json({ message: 'Activity deleted' });
});

export default router;
