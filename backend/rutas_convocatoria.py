from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from db.conexion import db

app = APIRouter()

# Seleccionamos la colección en la base de datos
# (MongoDB la creará automáticamente cuando insertemos el primer dato)
coleccion_convocatorias = db["convocatorias"]

# Modelo de datos para las peticiones POST (coincide con tu ModalAddConvoc)
class Convocatoria(BaseModel):
    ciclo: str
    fecha_inicio: str
    fecha_fin: str
    useTemplate: Optional[bool] = False
    estado: Optional[str] = "activa"



# Ruta para OBTENER todas las convocatorias (GET)
@app.get("/api/convocatorias")
async def obtener_convocatorias():
    # Buscamos todas las convocatorias y quitamos el _id de mongo (porque no es serializable directamente a JSON en FastAPI)
    convocatorias = list(coleccion_convocatorias.find({}, {"_id": 0}))
    return convocatorias

# Ruta para CREAR una nueva convocatoria (POST)
@app.post("/api/convocatorias")
async def crear_convocatoria(convocatoria: Convocatoria):
    try:
        nuevo_documento = convocatoria.dict()
        # Insertar en MongoDB
        coleccion_convocatorias.insert_one(nuevo_documento)
        
        # Mongo le añade un '_id' interno, lo quitamos antes de devolver el mensaje
        if "_id" in nuevo_documento:
            nuevo_documento.pop("_id")
            
        return {"mensaje": "Convocatoria creada con éxito", "datos": nuevo_documento}
    except Exception as e:
        import traceback
        error_detalles = traceback.format_exc()
        raise HTTPException(status_code=500, detail=str(e) + "\n" + error_detalles)
