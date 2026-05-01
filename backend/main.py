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
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
import asyncio

# Rutas
from backend.routes import preregistro
try:
    from rutas_tesis import app as tesis_rutas
    from rutas_documentos import app as documentos_rutas
    from rutas_tutorias import app as tutorias_rutas
except ImportError:
    pass # Para evitar errores si los archivos no existen aún

# Crear la aplicación FastAPI
app = FastAPI(
    title="API Sistema de Posgrados",
    description="API para gestionar preregistros, alumnos y coordinación de posgrados",
    version="1.0.0"
)

# CONFIGURACIÓN DE MIDDLEWARES
# ============================

# Middleware CORS - Permite que el frontend (React) se comunique con el backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "http://localhost:5173", 
        "http://127.0.0.1:5173",
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],  # GET, POST, PUT, DELETE, etc.
    allow_headers=["*"],  # Todos los headers
)

# Carpetas estáticas (Para que el frontend pueda ver y descargar archivos)
os.makedirs("uploads/tutorias", exist_ok=True)
os.makedirs("uploads/documentos", exist_ok=True)
app.mount("/static_tutorias", StaticFiles(directory="uploads/tutorias"), name="static_tutorias")
app.mount("/static_documentos", StaticFiles(directory="uploads/documentos"), name="static_documentos")


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

# Incluir las rutas de preregistro
app.include_router(preregistro.router)

# Conexion de otras rutas a la app principal si existen
try:
    app.include_router(tesis_rutas)
    app.include_router(documentos_rutas)
    app.include_router(tutorias_rutas)
except NameError:
    pass


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
    port = int(os.getenv("API_PORT", 5000))
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
