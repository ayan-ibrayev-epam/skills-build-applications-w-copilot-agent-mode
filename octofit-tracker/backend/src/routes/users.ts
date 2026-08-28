import { Router, Request, Response } from 'express';
import User from '../models/user.js';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const users = await User.find().select('-password');
  res.json(users);
});

router.get('/:id', async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) { res.status(404).json({ message: 'User not found' }); return; }
  res.json(user);
});

router.post('/', async (req: Request, res: Response) => {
  const user = new User(req.body);
  await user.save();
  const { password: _pw, ...safe } = user.toObject();
  res.status(201).json(safe);
});

router.put('/:id', async (req: Request, res: Response) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
  if (!user) { res.status(404).json({ message: 'User not found' }); return; }
  res.json(user);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) { res.status(404).json({ message: 'User not found' }); return; }
  res.json({ message: 'User deleted' });
});

export default router;
