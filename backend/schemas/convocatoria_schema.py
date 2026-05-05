"""
Schema de validación para los datos de convocatoria usando Pydantic.
"""

from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class ConvocatoriaBase(BaseModel):
    """Esquema base con los campos comunes de convocatoria"""
    ciclo: str = Field(..., min_length=1, max_length=50)
    fecha_inicio: str = Field(...)
    fecha_fin: str = Field(...)
    useTemplate: bool = False
    estado: str = "activa"


class ConvocatoriaCreate(ConvocatoriaBase):
    """Esquema para crear una nueva convocatoria"""
    pass


class ConvocatoriaResponse(ConvocatoriaBase):
    """Esquema para las respuestas de convocatoria desde la API"""
    id: Optional[str] = Field(None, alias="_id")
    fechaCreacion: datetime
    
    class Config:
        populate_by_name = True


class ConvocatoriaUpdate(BaseModel):
    """Esquema para actualizar una convocatoria"""
    ciclo: Optional[str] = None
    fecha_inicio: Optional[str] = None
    fecha_fin: Optional[str] = None
    useTemplate: Optional[bool] = None
    estado: Optional[str] = None
