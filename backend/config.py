"""
Archivo de configuración para variables de entorno.
Aquí se definen las configuraciones globales de la aplicación.
"""

import os
from dotenv import load_dotenv

# Cargar variables del archivo .env
load_dotenv()

class Config:
    """Configuración general de la aplicación"""
    
    # Base de datos MongoDB
    MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
    DATABASE_NAME = os.getenv("DATABASE_NAME", "sistema_posgrados")
    PREREGISTROS_COLLECTION = "preregistros"
    USUARIOS_COLLECTION = "usuarios"
    
    # Servidor
    DEBUG = os.getenv("DEBUG", "True").lower() == "true"
    API_HOST = os.getenv("API_HOST", "0.0.0.0")
    API_PORT = int(os.getenv("API_PORT", "5000"))
    
    # Frontend
    FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
    
    # JWT (para autenticación en el futuro)
    SECRET_KEY = os.getenv("SECRET_KEY", "tu-clave-secreta-cambiar-en-produccion")
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Instancia de configuración
config = Config()
