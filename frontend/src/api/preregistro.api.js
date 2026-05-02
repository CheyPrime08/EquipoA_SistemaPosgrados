const BASE_URL = "http://localhost:8000";

export async function enviarPreregistro(datos) {
  const res = await fetch(`${BASE_URL}/preregistro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  return res.json();
}