import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCollection('/api/workouts/')
      .then(setWorkouts)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div>
      <h2>Workouts</h2>
      <div className="row g-3">
        {workouts.map((w) => (
          <div key={w._id} className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{w.name}</h5>
                <p className="card-text text-muted">{w.description}</p>
                {w.exercises?.length > 0 && (
                  <ul className="list-group list-group-flush">
                    {w.exercises.map((ex, i) => (
                      <li key={i} className="list-group-item">{ex}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
