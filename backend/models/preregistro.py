"""
Modelo de base de datos para Preregistro en MongoDB.
Define la estructura de cómo se guardarán los datos en la colección.
"""

from datetime import datetime
from bson import ObjectId


class Preregistro:
    """Modelo que representa un documento de preregistro en MongoDB"""
    
    def __init__(self, nombre: str, apellidoPaterno: str, apellidoMaterno: str,
                 email: str, telefono: str, licenciatura: str, posgrado: str,
                 explicacion: str, esUDG: bool, estado: str = "pendiente"):
        self.nombre = nombre
        self.apellidoPaterno = apellidoPaterno
        self.apellidoMaterno = apellidoMaterno
        self.email = email
        self.telefono = telefono
        self.licenciatura = licenciatura
        self.posgrado = posgrado
        self.explicacion = explicacion
        self.esUDG = esUDG
        self.estado = estado
        self.fechaCreacion = datetime.now()
        self.fechaActualizacion = datetime.now()
    
    def to_dict(self):
        """Convierte el objeto a diccionario para guardar en MongoDB"""
        return {
            "nombre": self.nombre,
            "apellidoPaterno": self.apellidoPaterno,
            "apellidoMaterno": self.apellidoMaterno,
            "email": self.email,
            "telefono": self.telefono,
            "licenciatura": self.licenciatura,
            "posgrado": self.posgrado,
            "explicacion": self.explicacion,
            "esUDG": self.esUDG,
            "estado": self.estado,
            "fechaCreacion": self.fechaCreacion,
            "fechaActualizacion": self.fechaActualizacion
        }
    
    @staticmethod
    def from_dict(data: dict):
        """Crea un objeto Preregistro desde un diccionario (documento MongoDB)"""
        preregistro = Preregistro(
            nombre=data.get("nombre"),
            apellidoPaterno=data.get("apellidoPaterno"),
            apellidoMaterno=data.get("apellidoMaterno"),
            email=data.get("email"),
            telefono=data.get("telefono"),
            licenciatura=data.get("licenciatura"),
            posgrado=data.get("posgrado"),
            explicacion=data.get("explicacion"),
            esUDG=data.get("esUDG", False),
            estado=data.get("estado", "pendiente")
        )
        preregistro.fechaCreacion = data.get("fechaCreacion", datetime.now())
        preregistro.fechaActualizacion = data.get("fechaActualizacion", datetime.now())
        return preregistro
