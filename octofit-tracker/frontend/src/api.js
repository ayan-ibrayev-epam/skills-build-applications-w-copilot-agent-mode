// Base URL for all API calls. Falls back to localhost when VITE_CODESPACE_NAME is unset.
const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
export const API_BASE = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

// Normalise paginated {results:[]} and plain array responses.
export async function fetchCollection(path) {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  const data = await res.json();
  return Array.isArray(data) ? data : (data.results ?? []);
}
