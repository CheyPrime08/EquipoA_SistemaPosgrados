# instalar dependencias: pip install fastapi uvicorn pymongo python-dotenv
#Correr backend en terminal 1 (al mismo tiempo que el front)
#python -m uvicorn backend.db.main:app --reload
from fastapi import Body, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.db.conexion import client, db

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#GET Y POST DE POSGRADOS
@app.get("/posgrados")
def get_posgrados():
    colecciones = db.list_collection_names()
    posgrados = []
    for coleccion in colecciones:
        info = db[coleccion].find_one({}, {"_id": 0})
        if info:
            info["nombre_db"] = coleccion
            posgrados.append(info)
    return posgrados

@app.get("/posgrados/{nombre_coleccion}")
def get_posgrado(nombre_coleccion: str):
    # primero intenta buscar por nombre de colección exacto
    info = db[nombre_coleccion].find_one({}, {"_id": 0})
    if info:
        info["nombre_db"] = nombre_coleccion
        return info
    
    # busca en todas las colecciones por nombre del posgrado
    nombre_busqueda = nombre_coleccion.replace("_", " ")  # ← convierte guiones a espacios
    for coleccion in db.list_collection_names():
        info = db[coleccion].find_one(
            {"posgrado": {"$regex": nombre_busqueda, "$options": "i"}},
            {"_id": 0}
        )
        if info:
            info["nombre_db"] = coleccion
            return info
    
    return {"error": "Posgrado no encontrado"}

@app.post("/posgrados")
def agregar_posgrado(posgrado: dict = Body(...)):
    nombre = posgrado.get("posgrado")
    if not nombre:
        return {"error": "El nombre del posgrado es obligatorio"}
    
    # cada posgrado es una nueva colección dentro de Sistema_Posgrados
    nombre_coleccion = nombre.replace(" ", "_")
    db[nombre_coleccion].insert_one(posgrado)
    
    return {"mensaje": f"Posgrado '{nombre}' agregado correctamente"}

@app.put("/posgrados/{nombre_coleccion}")
def actualizar_preregistro(nombre_coleccion: str, datos: dict = Body(...)):
    db[nombre_coleccion].update_one({}, {"$set": {"preregistro": datos["preregistro"]}})
    return {"mensaje": "Preregistro actualizado"}

@app.put("/posgrados/{nombre_coleccion}/info")
def modificar_posgrado(nombre_coleccion: str, datos: dict = Body(...)):
    db[nombre_coleccion].update_one({}, {"$set": datos})
    return {"mensaje": "Posgrado modificado correctamente"}

#ENDPOINT USER
@app.post("/login")
def login(credenciales: dict = Body(...)):
    codigo = credenciales.get("codigo")
    password = credenciales.get("password")
    
    usuario = db["user"].find_one(
        {"codigo": codigo, "password": password},
        {"_id": 0}
    )
    
    if usuario:
        return {"ok": True, "rol": usuario.get("rol", "alumno")}
    
    return {"ok": False, "error": "Credenciales incorrectas"}

