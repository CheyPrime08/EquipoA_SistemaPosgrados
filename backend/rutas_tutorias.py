from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import shutil
import os
from datetime import datetime
from db.conexion import db 

app = FastAPI()

# 1. CORRECCIÓN DE CORS (Crucial para que los botones no se bloqueen)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cambia esto a tu URL de Vite si vas a producción
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. DIRECTORIOS Y ARCHIVOS ESTÁTICOS
UPLOAD_DIR = "uploads/tutorias"
os.makedirs(UPLOAD_DIR, exist_ok=True)
# Esto permite que el front pueda "ver" los archivos en la sección blanca de abajo
app.mount("/static_tutorias", StaticFiles(directory=UPLOAD_DIR), name="static_tutorias")

tutorias_collection = db["reportes_tutorias"]

# --- RUTAS ---

@app.get("/api/tutorias/archivos")
async def obtener_reportes():
    try:
        # Convertimos cursor de Mongo a lista y manejamos posibles errores de conexión
        archivos = list(tutorias_collection.find({}, {"_id": 0}))
        return archivos
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error al conectar con la base de datos")

@app.post("/api/tutorias/upload")
async def subir_reporte_tutoria(archivo: UploadFile = File(...)): # El nombre 'archivo' debe ser igual en el FormData del front
    
    # Validación de seguridad
    if not archivo:
        raise HTTPException(status_code=400, detail="No se envió ningún archivo")

    extension = os.path.splitext(archivo.filename)[1].lower()
    if extension not in ['.pdf', '.doc', '.docx']:
        raise HTTPException(status_code=400, detail="Formato no soportado")

    # Nombre único para evitar colisiones
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    nombre_seguro = f"{timestamp}_{archivo.filename.replace(' ', '_')}"
    file_path = os.path.join(UPLOAD_DIR, nombre_seguro)
    
    try:
        # Guardado físico
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(archivo.file, buffer)
            
        # Registro en MongoDB
        nuevo_reporte = {
            "nombre_archivo": archivo.filename,
            "url_descarga": f"http://localhost:8000/static_tutorias/{nombre_seguro}",
            "tipo": "Reporte de Tutoría",
            "fecha_subida": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        tutorias_collection.insert_one(nuevo_reporte)
        
        return {"message": "Éxito", "archivo": archivo.filename}
    
    except Exception as e:
        if os.path.exists(file_path): os.remove(file_path)
        raise HTTPException(status_code=500, detail=str(e))