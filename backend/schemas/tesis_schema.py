"""
Schema de validación para Tesis.
"""

from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class TesisBase(BaseModel):
    nombre_archivo: str
    ruta: str
    usuario_email: Optional[str] = None


class TesisResponse(TesisBase):
    id: Optional[str] = Field(None, alias="_id")
    fecha_subida: datetime
    
    class Config:
        populate_by_name = True
        json_encoders = {
            datetime: lambda v: v.strftime("%Y-%m-%d %H:%M:%S")
        }
