"""
Modelo de base de datos para Tutorías.
"""

from datetime import datetime


class Tutoria:
    """Modelo que representa un reporte de tutoría"""
    
    def __init__(self, nombre_archivo: str, url_descarga: str, tipo: str = "Reporte de Tutoría",
                 usuario_email: str = None, fecha_subida: datetime = None):
        self.nombre_archivo = nombre_archivo
        self.url_descarga = url_descarga
        self.tipo = tipo
        self.usuario_email = usuario_email
        self.fecha_subida = fecha_subida or datetime.now()
    
    def to_dict(self):
        return {
            "nombre_archivo": self.nombre_archivo,
            "url_descarga": self.url_descarga,
            "tipo": self.tipo,
            "usuario_email": self.usuario_email,
            "fecha_subida": self.fecha_subida
        }
    
    @staticmethod
    def from_dict(data: dict):
        return Tutoria(
            nombre_archivo=data.get("nombre_archivo"),
            url_descarga=data.get("url_descarga"),
            tipo=data.get("tipo", "Reporte de Tutoría"),
            usuario_email=data.get("usuario_email"),
            fecha_subida=data.get("fecha_subida")
        )
