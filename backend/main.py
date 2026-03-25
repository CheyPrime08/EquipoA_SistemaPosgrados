from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import asyncio

app = FastAPI()

# Permitir peticiones desde el frontend (React usa Vite en el puerto 5173 por defecto)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/login")
async def mock_login(req: Request):
    try:
        data = await req.json()
    except Exception:
        data = {}
        
    codigo = data.get('codigo')
    password = data.get('password')
    
    print(f"Intento de login recibido: código={codigo}, password={password}")
    
    # Simulamos un delay de red de medio segundo
    await asyncio.sleep(0.5)

    if codigo and password:
        rol = "admin"
        # Asignar rol simulado basado en el código digitado
        if "alumno" in str(codigo).lower():
            rol = "alumno"
        elif "coord" in str(codigo).lower():
            rol = "coordinacion"

        return {
            "success": True,
            "token": "mock-jwt-token-12345",
            "rol": rol,
            "message": "Login exitoso (Simulado)"
        }
    else:
        return JSONResponse(
            status_code=400,
            content={
                "success": False,
                "error": "Faltan credenciales"
            }
        )

@app.post("/api/preregistro")
async def mock_preregistro(req: Request):
    try:
        data = await req.json()
    except Exception:
        data = {}
        
    print(f"Datos de pre-registro recibidos: {data}")
    
    # Simulamos un delay de red
    await asyncio.sleep(0.5)
    
    return JSONResponse(
        status_code=201, # Código 201 Created
        content={
            "success": True,
            "message": "Registro completado exitosamente (Simulado)"
        }
    )

if __name__ == "__main__":
    import uvicorn
    # El frontend hace llamadas a http://localhost:5000
    uvicorn.run("main:app", host="0.0.0.0", port=5000, reload=True)
