import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`;
  const ENDPOINT = `${API_BASE}/api/users/`;

  useEffect(() => {
    console.log('Users: fetching from', ENDPOINT);
    fetch(ENDPOINT)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Users: fetched data', data);
        const results = Array.isArray(data) ? data : data.results || [];
        setUsers(results);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Users: fetch error', err);
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
          <p className="mt-2 text-muted">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger d-flex align-items-center mt-3" role="alert">
        <span className="me-2">&#9888;</span>
        <div>Failed to load users: {error}</div>
      </div>
    );
  }

  return (
    <div className="card octofit-card mt-2">
      <div className="card-header">👤 Users</div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover octofit-table mb-0">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center text-muted py-4">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id || user.id}>
                    <td className="fw-semibold">{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      {typeof user.team === 'object' && user.team ? (
                        <span className="badge bg-success">{user.team.name}</span>
                      ) : user.team ? (
                        <span className="badge bg-success">{user.team}</span>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="card-footer text-muted small">
        {users.length} user{users.length !== 1 ? 's' : ''} registered
      </div>
    </div>
  );
}

export default Users;
