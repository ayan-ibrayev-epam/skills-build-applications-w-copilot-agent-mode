import mongoose from 'mongoose';
import User from '../models/user.js';
import Team from '../models/team.js';
import Activity from '../models/activity.js';
import Leaderboard from '../models/leaderboard.js';
import Workout from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

// Seed the octofit_db database with test data
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    // Users
    const users = await User.insertMany([
      { username: 'monaoctocat', email: 'mona@octofit.dev', password: 'hashed_pw_1' },
      { username: 'codercat',    email: 'coder@octofit.dev', password: 'hashed_pw_2' },
      { username: 'fitnessfox',  email: 'fox@octofit.dev',   password: 'hashed_pw_3' },
      { username: 'runnerbot',   email: 'runner@octofit.dev', password: 'hashed_pw_4' },
      { username: 'yogabear',    email: 'yoga@octofit.dev',  password: 'hashed_pw_5' },
    ]);
    console.log(`Inserted ${users.length} users`);

    // Teams
    const teams = await Team.insertMany([
      { name: 'Octo Sprinters', members: [users[0]._id, users[1]._id] },
      { name: 'Code & Cardio',  members: [users[2]._id, users[3]._id] },
      { name: 'Zen Devs',       members: [users[4]._id, users[0]._id] },
    ]);
    console.log(`Inserted ${teams.length} teams`);

    // Activities
    const activities = await Activity.insertMany([
      { user: users[0]._id, type: 'Running',   duration: 30, date: new Date('2026-08-20') },
      { user: users[1]._id, type: 'Cycling',   duration: 45, date: new Date('2026-08-21') },
      { user: users[2]._id, type: 'Swimming',  duration: 60, date: new Date('2026-08-22') },
      { user: users[3]._id, type: 'Running',   duration: 25, date: new Date('2026-08-23') },
      { user: users[4]._id, type: 'Yoga',      duration: 50, date: new Date('2026-08-24') },
      { user: users[0]._id, type: 'Strength',  duration: 40, date: new Date('2026-08-25') },
      { user: users[1]._id, type: 'HIIT',      duration: 20, date: new Date('2026-08-26') },
    ]);
    console.log(`Inserted ${activities.length} activities`);

    // Leaderboard
    const leaderboard = await Leaderboard.insertMany([
      { user: users[0]._id, score: 980 },
      { user: users[1]._id, score: 870 },
      { user: users[2]._id, score: 760 },
      { user: users[3]._id, score: 650 },
      { user: users[4]._id, score: 540 },
    ]);
    console.log(`Inserted ${leaderboard.length} leaderboard entries`);

    // Workouts
    const workouts = await Workout.insertMany([
      {
        name: 'Morning Energizer',
        description: 'Quick full-body wake-up routine',
        exercises: ['Jumping Jacks', 'Push-ups', 'High Knees', 'Burpees'],
      },
      {
        name: 'Core Crusher',
        description: 'Targeted core and abs session',
        exercises: ['Plank', 'Crunches', 'Leg Raises', 'Russian Twists'],
      },
      {
        name: 'Endurance Run',
        description: 'Steady-state cardio for stamina',
        exercises: ['5 min warm-up walk', '30 min jog', '5 min cool-down walk'],
      },
      {
        name: 'Yoga Flow',
        description: 'Flexibility and mindfulness session',
        exercises: ['Sun Salutation', 'Warrior I', 'Warrior II', 'Child\'s Pose', 'Savasana'],
      },
    ]);
    console.log(`Inserted ${workouts.length} workouts`);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
