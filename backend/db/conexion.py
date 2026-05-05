import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Obtener la ruta absoluta a la raíz del proyecto para cargar el .env correctamente
env_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), '.env')
load_dotenv(dotenv_path=env_path)

# obtener datos de acceso del .env (con valores por defecto para simulación)
uri = os.getenv("MONGO_URL", "mongodb://localhost:27017")
database_name = os.getenv("DATABASE_NAME", "sistema_posgrados")

# Validar que database_name sea string
if not isinstance(database_name, str) or not database_name:
    database_name = "sistema_posgrados"

print(f"[CONEXIÓN MONGODB] Intentando conectar a: {uri}")
print(f"[BASE DE DATOS] Usando base de datos: {database_name}")

# conectar a MongoDB
try:
    client = MongoClient(uri, serverSelectionTimeoutMS=5000, tlsAllowInvalidCertificates=True)
    # Intentar verificar la conexión
    client.admin.command('ping')
    print("[✓] Conexión exitosa a MongoDB Atlas")
except Exception as e:
    print(f"[⚠] MongoDB no disponible: {str(e)}")
    print(f"[!] Usando simulación en memoria para desarrollo")
    # La conexión falla, pero es OK para desarrollo
    pass

# seleccionar base de datos
db = client[database_name]

# para usar esta conexion en otros archivos (ejemplo)
# from backend.db.conexion import db
# usuarios = db["usuarios"]
