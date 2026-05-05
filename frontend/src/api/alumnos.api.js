const BASE_URL = "http://localhost:5001";

export async function getAlumnos() {
  const res = await fetch(`${BASE_URL}/alumnos`);
  return res.json();
}