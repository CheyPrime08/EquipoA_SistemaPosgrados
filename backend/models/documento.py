"""
Modelo de base de datos para Documentos en MongoDB.
"""

from datetime import datetime
from bson import ObjectId


class Documento:
    """Modelo que representa un documento (archivo) en MongoDB"""
    
    def __init__(self, nombre_archivo: str, url_descarga: str, tipo: str, 
                 usuario_email: str = None, fecha_subida: datetime = None):
        self.nombre_archivo = nombre_archivo
        self.url_descarga = url_descarga
        self.tipo = tipo  # 'Academico', 'Personal', etc.
        self.usuario_email = usuario_email
        self.fecha_subida = fecha_subida or datetime.now()
    
    def to_dict(self):
        """Convierte el objeto a diccionario para guardar en MongoDB"""
        return {
            "nombre_archivo": self.nombre_archivo,
            "url_descarga": self.url_descarga,
            "tipo": self.tipo,
            "usuario_email": self.usuario_email,
            "fecha_subida": self.fecha_subida
        }
    
    @staticmethod
    def from_dict(data: dict):
        """Crea un objeto Documento desde un diccionario"""
        return Documento(
            nombre_archivo=data.get("nombre_archivo"),
            url_descarga=data.get("url_descarga"),
            tipo=data.get("tipo"),
            usuario_email=data.get("usuario_email"),
            fecha_subida=data.get("fecha_subida")
        )
