const BASE_URL = "http://localhost:8000";

// Obtener todas las convocatorias desde el backend
export async function getConvocatorias() {
  const res = await fetch(`${BASE_URL}/api/convocatorias`);
  if (!res.ok) throw new Error("Error al obtener las convocatorias");
  return res.json();
}

// Crear una nueva convocatoria
export async function createConvocatoria(data) {
  const res = await fetch(`${BASE_URL}/api/convocatorias`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  
  if (!res.ok) throw new Error("Error al crear la convocatoria");
  return res.json();
}
