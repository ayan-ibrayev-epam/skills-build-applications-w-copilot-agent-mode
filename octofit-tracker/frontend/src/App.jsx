import { NavLink, Route, Routes } from 'react-router-dom';
import logo from './assets/octofitapp-small.png';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const NAV = [
  { to: '/',            label: 'Home'        },
  { to: '/users',       label: 'Users'       },
  { to: '/teams',       label: 'Teams'       },
  { to: '/activities',  label: 'Activities'  },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts',    label: 'Workouts'    },
];

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/">
          <img src={logo} alt="OctoFit" height="32" />
          OctoFit Tracker
        </NavLink>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-3">
            {NAV.slice(1).map(({ to, label }) => (
              <li key={to} className="nav-item">
                <NavLink
                  className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
                  to={to}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main className="container py-4">
        <Routes>
          <Route
            path="/"
            element={
              <div className="text-center">
                <img src={logo} alt="OctoFit" height="120" className="mb-3" />
                <h1>Welcome to OctoFit Tracker</h1>
                <p className="lead">Track activities, compete on the leaderboard, and stay fit.</p>
              </div>
            }
          />
          <Route path="/users"       element={<Users />} />
          <Route path="/teams"       element={<Teams />} />
          <Route path="/activities"  element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts"    element={<Workouts />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
