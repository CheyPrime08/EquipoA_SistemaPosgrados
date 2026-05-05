"""
Modelo de base de datos para Convocatoria en MongoDB.
"""

from datetime import datetime
from bson import ObjectId


class Convocatoria:
    """Modelo que representa un documento de convocatoria en MongoDB"""
    
    def __init__(self, ciclo: str, fecha_inicio: str, fecha_fin: str,
                 useTemplate: bool = False, estado: str = "activa"):
        self.ciclo = ciclo
        self.fecha_inicio = fecha_inicio
        self.fecha_fin = fecha_fin
        self.useTemplate = useTemplate
        self.estado = estado
        self.fechaCreacion = datetime.now()
        self.fechaActualizacion = datetime.now()
    
    def to_dict(self):
        """Convierte el objeto a diccionario para guardar en MongoDB"""
        return {
            "ciclo": self.ciclo,
            "fecha_inicio": self.fecha_inicio,
            "fecha_fin": self.fecha_fin,
            "useTemplate": self.useTemplate,
            "estado": self.estado,
            "fechaCreacion": self.fechaCreacion,
            "fechaActualizacion": self.fechaActualizacion
        }
    
    @staticmethod
    def from_dict(data: dict):
        """Crea un objeto Convocatoria desde un diccionario (documento MongoDB)"""
        convocatoria = Convocatoria(
            ciclo=data.get("ciclo"),
            fecha_inicio=data.get("fecha_inicio"),
            fecha_fin=data.get("fecha_fin"),
            useTemplate=data.get("useTemplate", False),
            estado=data.get("estado", "activa")
        )
        convocatoria.fechaCreacion = data.get("fechaCreacion", datetime.now())
        convocatoria.fechaActualizacion = data.get("fechaActualizacion", datetime.now())
        return convocatoria
