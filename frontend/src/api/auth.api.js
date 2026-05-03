const BASE_URL = "http://localhost:8000";

export async function verificarCorreo(correo) {
  const res = await fetch(`${BASE_URL}/verificar-correo`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correo }),
  });
  return res.json();
}

export async function verificarTelefono(telefono) {
  const res = await fetch(`${BASE_URL}/verificar-telefono`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ telefono }),
  });
  return res.json();
}
