# instalar dependencias: pip install fastapi uvicorn pymongo python-dotenv
from fastapi import Body, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.db.conexion import client

app = FastAPI()

app.add_middleware( #peticiones del front end
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Bases de datos del sistema que no son posgrados
EXCLUIR = ["admin", "config", "local", "database"]

#ENDPOINTS POSGRADOS
@app.get("/posgrados")
def get_posgrados():
    excluir = ["admin", "config", "local"]
    bases = [b for b in client.list_database_names() if b not in excluir]
    posgrados = []
    for nombre in bases:
        db_posgrado = client[nombre]
        info = db_posgrado["info"].find_one({}, {"_id": 0})
        if info:
            info["nombre_db"] = nombre  #
            posgrados.append(info)
        else:
            posgrados.append({"posgrado": nombre.replace("_", " "), "nombre_db": nombre})
    return posgrados

@app.post("/posgrados")
def agregar_posgrado(posgrado: dict = Body(...)):
    nombre = posgrado.get("posgrado")
    if not nombre:
        return {"error": "El nombre del posgrado es obligatorio"}
    nombre_db = nombre.replace(" ", "_") # reemplazar espacios con guión bajo poruqe si no no los puede agregar mongo a la basededatos
    db_posgrado = client[nombre_db]
    db_posgrado["info"].insert_one({**posgrado, "_id": nombre_db})
    return {"mensaje": f"Posgrado '{nombre}' creado correctamente"}

@app.put("/posgrados/{nombre_db}")
def actualizar_preregistro(nombre_db: str, datos: dict = Body(...)):
    db_posgrado = client[nombre_db]
    db_posgrado["info"].update_one({}, {"$set": {"preregistro": datos["preregistro"]}})
    return {"mensaje": "Preregistro actualizado"}

@app.get("/posgrados/{nombre_db}")
def get_posgrado(nombre_db: str):
    db_posgrado = client[nombre_db]
    info = db_posgrado["info"].find_one({}, {"_id": 0})
    if info:
        info["nombre_db"] = nombre_db
        return info
    return {"error": "Posgrado no encontrado"}

@app.put("/posgrados/{nombre_db}/info")
def modificar_posgrado(nombre_db: str, datos: dict = Body(...)):
    db_posgrado = client[nombre_db]
    db_posgrado["info"].update_one({}, {"$set": datos})
    return {"mensaje": "Posgrado modificado correctamente"}




#ENDPOINT ALUMNOS
@app.get("/alumnos")
def get_alumnos():
    todos = []
    bases = [b for b in client.list_database_names() if b not in EXCLUIR]
    for programa in bases:
        db = client[programa]
        alumnos = list(db["user"].find({}, {"_id": 0}))
        todos.extend(alumnos)
    return todos