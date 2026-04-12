from fastapi import FastAPI, APIRouter, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import shutil
import os
from datetime import datetime
from db.conexion import db 

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads/documentos"
os.makedirs(UPLOAD_DIR, exist_ok=True)
app.mount("/static_documentos", StaticFiles(directory=UPLOAD_DIR), name="static_documentos")

# Colección para los documentos
documentos_collection = db["reportes_documentos"]

# --- aqu ponemos las rutas ---

@app.get("/api/documentos/archivos")
async def obtener_documentos():
    try:
        archivos = list(documentos_collection.find({}, {"_id": 0}))
        return archivos
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error al conectar con la base de datos")

@app.post("/api/documentos/upload")
#Agrego el parámetro 'tipo' que nos envia el frontend
async def subir_documento(archivo: UploadFile = File(...), tipo: str = Form(...)): 
    
    if not archivo:
        raise HTTPException(status_code=400, detail="No se envió ningún archivo")

    extension = os.path.splitext(archivo.filename)[1].lower()
    if extension not in ['.pdf', '.doc', '.docx', '.png', '.jpg', '.jpeg']: # Agrega imagenes por si se necesitan
        raise HTTPException(status_code=400, detail="Formato no soportado")

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    nombre_seguro = f"{timestamp}_{archivo.filename.replace(' ', '_')}"
    file_path = os.path.join(UPLOAD_DIR, nombre_seguro)
    
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(archivo.file, buffer)
            
        nuevo_documento = {
            "nombre_archivo": archivo.filename,
            "url_descarga": f"http://localhost:8000/static_documentos/{nombre_seguro}",
            "tipo": tipo, # 'Academico' o 'Personal'
            "fecha_subida": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        documentos_collection.insert_one(nuevo_documento)
        
        return {"message": "Éxito", "archivo": archivo.filename, "tipo": tipo}
    
    except Exception as e:
        if os.path.exists(file_path): os.remove(file_path)
        raise HTTPException(status_code=500, detail=str(e))
