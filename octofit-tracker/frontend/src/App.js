import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import octofitLogo from './octofitapp-small.png';
import './App.css';

function Home() {
  return (
    <div className="octofit-hero p-5 text-center mt-2">
      <img
        src={octofitLogo}
        alt="OctoFit Tracker"
        style={{ height: '80px', width: 'auto', borderRadius: '12px', marginBottom: '1rem',
                  border: '3px solid #2ea043', boxShadow: '0 0 20px rgba(63,185,80,0.3)' }}
      />
      <h1 className="display-5">Welcome to OctoFit Tracker</h1>
      <p className="lead mt-3">
        Track your activities, compete on the leaderboard, join teams, and get personalized workout suggestions.
      </p>
      <hr className="my-4" style={{ borderColor: '#2ea043' }} />
      <div className="row g-3 justify-content-center mt-2">
        {[
          { to: '/users', label: 'Users', icon: '👤' },
          { to: '/teams', label: 'Teams', icon: '🏆' },
          { to: '/activities', label: 'Activities', icon: '🏃' },
          { to: '/leaderboard', label: 'Leaderboard', icon: '📊' },
          { to: '/workouts', label: 'Workouts', icon: '💪' },
        ].map(({ to, label, icon }) => (
          <div className="col-6 col-md-2" key={to}>
            <NavLink to={to} className="btn btn-outline-success w-100 py-3 fw-semibold">
              <div style={{ fontSize: '1.5rem' }}>{icon}</div>
              {label}
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg octofit-navbar">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            <img src={octofitLogo} alt="OctoFit logo" />
            OctoFit Tracker
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/users">Users</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/teams">Teams</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/activities">Activities</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
