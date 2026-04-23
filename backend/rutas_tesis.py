from fastapi import APIRouter, UploadFile, File, HTTPException
import shutil
import os
from datetime import datetime
from db.conexion import db

app = APIRouter()

tesis_collection = db["archivos_tesis"]

# Carpeta Física para guardar los archivos de tesis
UPLOAD_DIR = "uploads/tesis"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# ----- Rutas -----
@app.post("/api/tesis/upload")
async def subir_avance_tesis(archivo: UploadFile = File(...)):
    # Validar que sea PDF
    if not archivo.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Solo se permiten archivos PDF.")
    
    file_path = os.path.join(UPLOAD_DIR, archivo.filename)
    
    # Guardar archivo físicamente en PC
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(archivo.file, buffer)
        
    # Guardar el registro en MongoDB usando la conexión de mi equipo
    nuevo_documento = {
        "nombre_archivo": archivo.filename,
        "ruta": file_path,
        "fecha_subida": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }
    tesis_collection.insert_one(nuevo_documento)
    
    # Mongo le añade un '_id' interno, lo quitamos antes de devolver el mensaje a React
    nuevo_documento.pop('_id', None)
    
    return {"mensaje": "Archivo subido con éxito", "archivo": nuevo_documento}

@app.get("/api/tesis/archivos")
async def obtener_archivos_tesis():
    # Buscar todos los archivos en MongoDB, omitiendo el _id
    archivos = list(tesis_collection.find({}, {"_id": 0}))
    return archivos