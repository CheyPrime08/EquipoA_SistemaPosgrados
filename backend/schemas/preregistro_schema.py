"""
Schema de validación para los datos de preregistro usando Pydantic.
Estos esquemas aseguran que los datos enviados desde el frontend sean válidos.
"""

from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime


class PreregistroBase(BaseModel):
    """Esquema base con los campos comunes de preregistro"""
    nombre: str = Field(..., min_length=1, max_length=100)
    apellidoPaterno: str = Field(..., min_length=1, max_length=100)
    apellidoMaterno: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    telefono: str = Field(..., min_length=10, max_length=20)
    licenciatura: str = Field(..., min_length=1, max_length=200)
    posgrado: str = Field(..., min_length=1, max_length=200)
    explicacion: str = Field(..., min_length=10, max_length=2000)
    esUDG: bool = False


class PreregistroCreate(PreregistroBase):
    """Esquema para crear un nuevo preregistro"""
    pass


class PreregistroResponse(PreregistroBase):
    """Esquema para las respuestas de preregistro desde la API"""
    id: Optional[str] = Field(None, alias="_id")
    fechaCreacion: datetime
    estado: str = "pendiente"  # pendiente, aprobado, rechazado
    
    class Config:
        populate_by_name = True  # Permite usar tanto id como _id


class PreregistroUpdate(BaseModel):
    """Esquema para actualizar un preregistro (solo campos que se pueden actualizar)"""
    estado: Optional[str] = None
    # Los coordinadores y admin pueden actualizar el estado


class PreregistroFilter(BaseModel):
    """Esquema para filtrar preregistros"""
    estado: Optional[str] = None
    email: Optional[str] = None
    posgrado: Optional[str] = None
