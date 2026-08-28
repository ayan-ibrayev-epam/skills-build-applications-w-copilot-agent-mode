import { Router, Request, Response } from 'express';
import Leaderboard from '../models/leaderboard.js';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const entries = await Leaderboard.find()
    .populate('user', '-password')
    .sort({ score: -1 });
  res.json(entries);
});

router.get('/:id', async (req: Request, res: Response) => {
  const entry = await Leaderboard.findById(req.params.id).populate('user', '-password');
  if (!entry) { res.status(404).json({ message: 'Leaderboard entry not found' }); return; }
  res.json(entry);
});

router.post('/', async (req: Request, res: Response) => {
  const entry = new Leaderboard(req.body);
  await entry.save();
  res.status(201).json(entry);
});

router.put('/:id', async (req: Request, res: Response) => {
  const entry = await Leaderboard.findByIdAndUpdate(
    req.params.id,
    { ...req.body, updatedAt: new Date() },
    { new: true }
  );
  if (!entry) { res.status(404).json({ message: 'Leaderboard entry not found' }); return; }
  res.json(entry);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const entry = await Leaderboard.findByIdAndDelete(req.params.id);
  if (!entry) { res.status(404).json({ message: 'Leaderboard entry not found' }); return; }
  res.json({ message: 'Leaderboard entry deleted' });
});

export default router;
