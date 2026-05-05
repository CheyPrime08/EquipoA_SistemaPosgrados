"""
BACKEND FASTAPI - SISTEMA DE POSGRADOS
======================================

Este es el archivo principal de la aplicación FastAPI.
Aquí se configura la aplicación, los middlewares y se registran todas las rutas.
"""

import sys
import os

# Agregar la carpeta raíz al path para que Python encuentre el módulo backend
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
import asyncio
from backend.routes import preregistro, convocatoria, documento, tesis, tutoria

# Crear la aplicación FastAPI
app = FastAPI(
    title="API Sistema de Posgrados",
    description="API para gestionar preregistros, alumnos y coordinación de posgrados",
    version="1.0.0"
)

# CONFIGURACIÓN DE MIDDLEWARES
# ============================

# Servir archivos estáticos (Subidas)
os.makedirs("uploads/documentos", exist_ok=True)
os.makedirs("uploads/tesis", exist_ok=True)
os.makedirs("uploads/tutorias", exist_ok=True)

app.mount("/static_documentos", StaticFiles(directory="uploads/documentos"), name="documentos")
app.mount("/static_tesis", StaticFiles(directory="uploads/tesis"), name="tesis")
app.mount("/static_tutorias", StaticFiles(directory="uploads/tutorias"), name="tutorias")

# Middleware CORS - Permite que el frontend (React) se comunique con el backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción especificar dominio exacto
    allow_credentials=True,
    allow_methods=["*"],  # GET, POST, PUT, DELETE, etc.
    allow_headers=["*"],  # Todos los headers
)


# RUTAS DE AUTENTICACIÓN
# ======================

@app.post("/api/login")
async def mock_login(req: Request):
    """
    Endpoint de login simulado.
    En producción, esto verificaría credenciales contra la base de datos.
    """
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
            rol = "coordinador"

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


# REGISTRO DE RUTAS
# =================

# Incluir las rutas de los módulos
app.include_router(preregistro.router)
app.include_router(convocatoria.router)
app.include_router(documento.router)
app.include_router(tesis.router)
app.include_router(tutoria.router)


# RUTAS DE SALUD (Health Check)
# =============================

@app.get("/health")
async def health_check():
    """Endpoint para verificar que el servidor está activo"""
    return {
        "status": "healthy",
        "message": "Backend funcionando correctamente"
    }


@app.get("/")
async def root():
    """Endpoint raíz - muestra información sobre la API"""
    return {
        "nombre": "API Sistema de Posgrados",
        "version": "1.0.0",
        "endpoints": {
            "docs": "/docs",  # Documentación interactiva de Swagger
            "redoc": "/redoc",  # Documentación alternativa
            "health": "/health"  # Estado del servidor
        }
    }


# PUNTO DE ENTRADA
# ================

if __name__ == "__main__":
    import uvicorn
    import os
    
    # Obtener configuración del puerto
    port = int(os.getenv("API_PORT", 5001))
    host = os.getenv("API_HOST", "0.0.0.0")
    
    # El frontend hace llamadas a http://localhost:5000
    print(f"🚀 Iniciando servidor en http://{host}:{port}")
    print(f"📚 Documentación en http://localhost:{port}/docs")
    print(f"🔗 API en http://localhost:{port}/api")
    
    uvicorn.run(
        "backend.main:app",  # ← Ruta correcta del módulo
        host=host,
        port=port,
        reload=False  # Desactivado para simplificar
    )
