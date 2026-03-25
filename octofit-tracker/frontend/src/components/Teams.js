import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`;
  const ENDPOINT = `${API_BASE}/api/teams/`;

  useEffect(() => {
    console.log('Teams: fetching from', ENDPOINT);
    fetch(ENDPOINT)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Teams: fetched data', data);
        const results = Array.isArray(data) ? data : data.results || [];
        setTeams(results);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Teams: fetch error', err);
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
          <p className="mt-2 text-muted">Loading teams...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger d-flex align-items-center mt-3" role="alert">
        <span className="me-2">&#9888;</span>
        <div>Failed to load teams: {error}</div>
      </div>
    );
  }

  return (
    <div className="card octofit-card mt-2">
      <div className="card-header">🏆 Teams</div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover octofit-table mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Team Name</th>
              </tr>
            </thead>
            <tbody>
              {teams.length === 0 ? (
                <tr>
                  <td colSpan="2" className="text-center text-muted py-4">
                    No teams found.
                  </td>
                </tr>
              ) : (
                teams.map((team, index) => (
                  <tr key={team._id || team.id}>
                    <td className="text-muted">{index + 1}</td>
                    <td className="fw-semibold">{team.name}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="card-footer text-muted small">
        {teams.length} team{teams.length !== 1 ? 's' : ''} registered
      </div>
    </div>
  );
}

export default Teams;
