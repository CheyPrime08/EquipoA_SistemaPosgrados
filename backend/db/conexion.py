import os
from pymongo import MongoClient
from dotenv import load_dotenv

# cargar variables del archivo .env NO esta en github porque tiene credenciales de acceso
load_dotenv()

# obtener datos de acceso del .env
uri = os.getenv("MONGO_URL")
database_name = os.getenv("DATABASE_NAME")

# conectar a MongoDB
client = MongoClient(uri)

# seleccionar base de datos
db = client[database_name]

#si imprime esto es que funciona
print("Conexión exitosa a MongoDB Atlas")
print(db.list_collection_names()) #debe imprimir []


#para usar esta conexion en otros archivos (ejemplo)
#from database.conexion import db
#usuarios = db["usuarios"]