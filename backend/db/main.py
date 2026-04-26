#instalar dependencias pip install fastapi uvicorn pymongo python-dotenv

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.db.conexion import client #db  #archivo de conexion a db

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

PROGRAMAS = [ #lista de todas las bases de datos (programas) en MongoDB Atlas
    "Doctorado_Biociencias",
    "Especialidad_Odontopediatria",
    "Maestria_AdminNegocios",
    "Maestria_Immovacion",
    "Maestria_IntervencionesPsico",
]

@app.get("/alumnos")
def get_alumnos():
    todos = []
    for programa in PROGRAMAS:
        db = client[programa]
        alumnos = list(db["user"].find({}, {"_id": 0}))
        todos.extend(alumnos)
    return todos

#CORRER EN TERMINAL 1 para backend (al mismo tiempo)
#correr/levantar (estando en la carpeta) con: python -m uvicorn main:app --reload
#API estara en http://localhost:8000
#abrir http://127.0.0.1:8000/alumnos para ver los datos de tu base de datos en formato JSON
#si dice "Conexión exitosa a MongoDB Atlas" es que ya conecto el backend con la base de datos

#CORRER EN TERMINAL 2 para frontend
#npm install
#npm run dev
#abrir http://localhost:5173 para ver la interfaz del frontend 
