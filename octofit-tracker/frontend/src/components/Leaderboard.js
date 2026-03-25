import React, { useState, useEffect } from 'react';

const RANK_MEDALS = ['🥇', '🥈', '🥉'];

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`;
  const ENDPOINT = `${API_BASE}/api/leaderboard/`;

  useEffect(() => {
    console.log('Leaderboard: fetching from', ENDPOINT);
    fetch(ENDPOINT)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Leaderboard: fetched data', data);
        const results = Array.isArray(data) ? data : data.results || [];
        setEntries(results);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Leaderboard: fetch error', err);
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
          <p className="mt-2 text-muted">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger d-flex align-items-center mt-3" role="alert">
        <span className="me-2">&#9888;</span>
        <div>Failed to load leaderboard: {error}</div>
      </div>
    );
  }

  return (
    <div className="card octofit-card mt-2">
      <div className="card-header">📊 Leaderboard</div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover octofit-table mb-0">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>Rank</th>
                <th>User</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {entries.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center text-muted py-4">
                    No leaderboard data found.
                  </td>
                </tr>
              ) : (
                entries.map((entry, index) => (
                  <tr key={entry._id || entry.id}>
                    <td className="text-center fw-bold">
                      {RANK_MEDALS[index] || (
                        <span className="badge bg-secondary badge-rank">{index + 1}</span>
                      )}
                    </td>
                    <td>{typeof entry.user === 'object' ? entry.user.username : entry.user}</td>
                    <td>
                      <span className="badge bg-success fs-6">{entry.points}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="card-footer text-muted small">
        {entries.length} participant{entries.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
}

export default Leaderboard;
