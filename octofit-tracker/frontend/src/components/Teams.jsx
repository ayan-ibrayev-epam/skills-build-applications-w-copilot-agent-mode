import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const TEAMS_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCollection(TEAMS_URL)
      .then(setTeams)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div>
      <h2>Teams</h2>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Team Name</th>
            <th>Members</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((t) => (
            <tr key={t._id}>
              <td>{t.name}</td>
              <td>
                {(t.members ?? [])
                  .map((m) => (typeof m === 'object' ? m.username : m))
                  .join(', ')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
