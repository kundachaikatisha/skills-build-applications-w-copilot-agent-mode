import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`;
  const ENDPOINT = `${API_BASE}/api/activities/`;

  useEffect(() => {
    console.log('Activities: fetching from', ENDPOINT);
    fetch(ENDPOINT)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Activities: fetched data', data);
        const results = Array.isArray(data) ? data : data.results || [];
        setActivities(results);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Activities: fetch error', err);
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
          <p className="mt-2 text-muted">Loading activities...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger d-flex align-items-center mt-3" role="alert">
        <span className="me-2">&#9888;</span>
        <div>Failed to load activities: {error}</div>
      </div>
    );
  }

  return (
    <div className="card octofit-card mt-2">
      <div className="card-header">🏃 Activities</div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover octofit-table mb-0">
            <thead>
              <tr>
                <th>User</th>
                <th>Type</th>
                <th>Duration (min)</th>
                <th>Distance (km)</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {activities.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-4">
                    No activities found.
                  </td>
                </tr>
              ) : (
                activities.map((activity) => (
                  <tr key={activity._id || activity.id}>
                    <td>{typeof activity.user === 'object' ? activity.user.username : activity.user}</td>
                    <td>
                      <span className="badge bg-success">{activity.type}</span>
                    </td>
                    <td>{activity.duration}</td>
                    <td>{activity.distance}</td>
                    <td>{activity.timestamp ? new Date(activity.timestamp).toLocaleString() : '—'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="card-footer text-muted small">
        {activities.length} record{activities.length !== 1 ? 's' : ''} found
      </div>
    </div>
  );
}

export default Activities;
