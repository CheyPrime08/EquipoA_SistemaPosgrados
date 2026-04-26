from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from rutas_tesis import app as tesis_rutas
from rutas_documentos import app as documentos_rutas
from rutas_tutorias import app as tutorias_rutas

app = FastAPI()

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "http://localhost:5173", 
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Carpetas estáticas (Para que el frontend pueda ver y descargar archivos)
app.mount("/static_tutorias", StaticFiles(directory="uploads/tutorias"), name="static_tutorias")
app.mount("/static_documentos", StaticFiles(directory="uploads/documentos"), name="static_documentos")

# Conexion de todas las rutas a la app principal
app.include_router(tesis_rutas)
app.include_router(documentos_rutas)
app.include_router(tutorias_rutas)