import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const USERS_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCollection(USERS_URL)
      .then(setUsers)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div>
      <h2>Users</h2>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{new Date(u.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
