# Backend Login y Preregistro (Branch: dev-login-preregistro-db)

Este backend expone endpoints para login y preregistro conectados a MongoDB.

## Requisitos
- Python 3.12+
- MongoDB Atlas (o local)

## Configuracion rapida
1) Crea el archivo `backend/.env` usando `backend/.env.example` como base.
2) Coloca `MONGO_URL` y `DATABASE_NAME` con tus valores reales.

## Datos de prueba (seed)
Ejecuta el seed para crear usuarios y preregistros:

```bash
"/home/juanpablo/Programación para internet/EquipoA_SistemaPosgrados/.venv/bin/python" backend/scripts/seed_data.py
```

Credenciales de prueba:
- admin / Admin123
- coord / Coord123
- alumno / Alumno123

## Levantar backend
```bash
cd backend
"/home/juanpablo/Programación para internet/EquipoA_SistemaPosgrados/.venv/bin/python" -m uvicorn main:app --reload --host 0.0.0.0 --port 5000
```

## Endpoints clave
- POST `/api/login`
- POST `/api/preregistro`
- GET `/api/preregistro` (requiere header `Authorization: admin`)
- GET `/api/preregistro/email/{email}`
- PATCH `/api/preregistro/{id}/estado`
