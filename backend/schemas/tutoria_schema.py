"""
Schema de validación para Tutorías.
"""

from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class TutoriaBase(BaseModel):
    nombre_archivo: str
    url_descarga: str
    tipo: str = "Reporte de Tutoría"
    usuario_email: Optional[str] = None


class TutoriaResponse(TutoriaBase):
    id: Optional[str] = Field(None, alias="_id")
    fecha_subida: datetime
    
    class Config:
        populate_by_name = True
