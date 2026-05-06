from fastapi import APIRouter, HTTPException, Header, status
from bson.objectid import ObjectId
from esquemas import PreregistroRequest, EstadoUpdateRequest
from db.conexion import db
import datetime

app = APIRouter(prefix="/api/preregistro", tags=["Preregistro"])

@app.post("/")
def crear_preregistro(datos: PreregistroRequest):
    nuevo_doc = datos.dict()
    nuevo_doc["fecha_preregistro"] = datetime.datetime.utcnow()
    nuevo_doc["fecha_actualizacion"] = datetime.datetime.utcnow()
    nuevo_doc["estatus"] = "Pendiente"
    
    # Insertar en MongoDB
    resultado = db["preregistro"].insert_one(nuevo_doc)
    
    return {
        "message": "Prerregistro creado exitosamente",
        "id": str(resultado.inserted_id)
    }

@app.get("/")
def obtener_preregistros(authorization: str = Header(default=None)):
    # Protección básica basada en header (como dice el README)
    if authorization != "admin" and authorization != "coord":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tienes permisos para ver los prerregistros"
        )
        
    registros = list(db["preregistro"].find({}))
    for reg in registros:
        reg["_id"] = str(reg["_id"])
        
    return registros

@app.get("/email/{email}")
def obtener_preregistro_por_email(email: str):
    registros = list(db["preregistro"].find({"correo": email}))
    if not registros:
        raise HTTPException(status_code=404, detail="No se encontraron prerregistros para este correo")
        
    for reg in registros:
        reg["_id"] = str(reg["_id"])
        
    return registros

@app.patch("/{id}/estado")
def actualizar_estado(id: str, datos: EstadoUpdateRequest):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="ID inválido")
        
    resultado = db["preregistro"].update_one(
        {"_id": ObjectId(id)},
        {"$set": {"estatus": datos.estado, "fecha_actualizacion": datetime.datetime.utcnow()}}
    )
    
    if resultado.modified_count == 0:
        raise HTTPException(status_code=404, detail="Prerregistro no encontrado o el estado es el mismo")
        
    return {"message": f"Estado actualizado a {datos.estado}"}
