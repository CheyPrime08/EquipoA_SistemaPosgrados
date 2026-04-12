from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
from datetime import datetime
from db.conexion import db 

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
# Colección específica para tutorías
tutorias_collection = db["reportes_tutorias"]
# Carpeta física para reportes de tutoría
UPLOAD_DIR = "uploads/tutorias"
os.makedirs(UPLOAD_DIR, exist_ok=True)
# --- RUTAS ---
@app.get("/api/tutorias/archivos")
async def obtener_reportes():
    """Retorna la lista de todos los reportes subidos"""
    try:
        archivos = list(tutorias_collection.find({}, {"_id": 0}))
        return archivos
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/tutorias/upload")
async def subir_reporte_tutoria(archivo: UploadFile = File(...)):
    """Recibe un archivo, lo guarda y registra en la BD"""
    
    # Validar extensión (puedes añadir .docx si es necesario)
    if not archivo.filename.lower().endswith(('.pdf', '.doc', '.docx')):
        raise HTTPException(status_code=400, detail="Formato de archivo no permitido.")
    
    # Crear nombre único para evitar sobreescritura
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    nombre_final = f"{timestamp}_{archivo.filename}"
    file_path = os.path.join(UPLOAD_DIR, nombre_final)
    
    try:
        # Guardar en disco
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(archivo.file, buffer)
            
        # Registrar en MongoDB
        nuevo_reporte = {
            "nombre_archivo": archivo.filename,
            "nombre_servidor": nombre_final,
            "ruta": file_path,
            "tipo": "Reporte de Tutoría",
            "fecha_subida": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        tutorias_collection.insert_one(nuevo_reporte)
        
        return {"message": "Reporte subido correctamente", "archivo": archivo.filename}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al procesar el archivo: {str(e)}")
