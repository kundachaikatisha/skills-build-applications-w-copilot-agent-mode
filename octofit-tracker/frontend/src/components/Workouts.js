import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`;
  const ENDPOINT = `${API_BASE}/api/workouts/`;

  useEffect(() => {
    console.log('Workouts: fetching from', ENDPOINT);
    fetch(ENDPOINT)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Workouts: fetched data', data);
        const results = Array.isArray(data) ? data : data.results || [];
        setWorkouts(results);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Workouts: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [ENDPOINT]);

  if (loading) {
    return (
      <div className="octofit-spinner-wrapper">
        <div className="text-center">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-muted">Loading workouts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger d-flex align-items-center mt-3" role="alert">
        <span className="me-2">&#9888;</span>
        <div>Failed to load workouts: {error}</div>
      </div>
    );
  }

  return (
    <div className="card octofit-card mt-2">
      <div className="card-header">💪 Workouts</div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover octofit-table mb-0">
            <thead>
              <tr>
                <th style={{ width: '25%' }}>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {workouts.length === 0 ? (
                <tr>
                  <td colSpan="2" className="text-center text-muted py-4">
                    No workouts found.
                  </td>
                </tr>
              ) : (
                workouts.map((workout) => (
                  <tr key={workout._id || workout.id}>
                    <td className="fw-semibold">{workout.name}</td>
                    <td>{workout.description}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="card-footer text-muted small">
        {workouts.length} workout{workouts.length !== 1 ? 's' : ''} available
      </div>
    </div>
  );
}

export default Workouts;
