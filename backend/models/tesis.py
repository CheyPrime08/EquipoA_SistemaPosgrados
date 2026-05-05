"""
Modelo de base de datos para Tesis.
"""

from datetime import datetime


class Tesis:
    """Modelo que representa un avance de tesis"""
    
    def __init__(self, nombre_archivo: str, ruta: str, usuario_email: str = None, 
                 fecha_subida: datetime = None):
        self.nombre_archivo = nombre_archivo
        self.ruta = ruta
        self.usuario_email = usuario_email
        self.fecha_subida = fecha_subida or datetime.now()
    
    def to_dict(self):
        return {
            "nombre_archivo": self.nombre_archivo,
            "ruta": self.ruta,
            "usuario_email": self.usuario_email,
            "fecha_subida": self.fecha_subida
        }
    
    @staticmethod
    def from_dict(data: dict):
        return Tesis(
            nombre_archivo=data.get("nombre_archivo"),
            ruta=data.get("ruta"),
            usuario_email=data.get("usuario_email"),
            fecha_subida=data.get("fecha_subida")
        )
