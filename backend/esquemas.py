from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class LoginRequest(BaseModel):
    codigo: str = Field(..., min_length=1, description="Código es requerido y no debe estar vacío")
    password: str = Field(..., min_length=1, description="Password es requerido y no debe estar vacío")

class PreregistroRequest(BaseModel):
    nombre: str = Field(..., max_length=100)
    apellido_paterno: str = Field(..., max_length=100)
    apellido_materno: str = Field(..., max_length=100)
    correo: EmailStr = Field(..., max_length=100)
    telefono: str = Field(..., max_length=20)
    licenciatura: str = Field(...)
    posgrado: str = Field(...)
    interes: str = Field(...)

class EstadoUpdateRequest(BaseModel):
    estado: str # ej. "pendiente", "activo"
