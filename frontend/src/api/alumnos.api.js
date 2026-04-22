const BASE_URL = "http://localhost:8000";

export async function getAlumnos() {
  const res = await fetch(`${BASE_URL}/alumnos`);
  return res.json();
}