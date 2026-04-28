const BASE_URL = "http://localhost:8000";

export async function getPosgrados() {
  const res = await fetch(`${BASE_URL}/posgrados`);
  return res.json();
}

export async function agregarPosgrado(posgrado) {
  const res = await fetch(`${BASE_URL}/posgrados`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(posgrado),
  });
  return res.json();
}

export async function actualizarPreregistro(nombre_db, preregistro) {
  const res = await fetch(`${BASE_URL}/posgrados/${nombre_db}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ preregistro }),
  });
  return res.json();
}

export async function buscarPosgrado(nombre_db) {
  const res = await fetch(`${BASE_URL}/posgrados/${nombre_db}`);
  return res.json();
}

export async function modificarPosgrado(nombre_db, datos) {
  const res = await fetch(`${BASE_URL}/posgrados/${nombre_db}/info`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  return res.json();
}