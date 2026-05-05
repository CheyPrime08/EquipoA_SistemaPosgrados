"""
Schema de validación para Documentos.
"""

from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class DocumentoBase(BaseModel):
    nombre_archivo: str
    url_descarga: str
    tipo: str
    usuario_email: Optional[str] = None


class DocumentoResponse(DocumentoBase):
    id: Optional[str] = Field(None, alias="_id")
    fecha_subida: datetime
    
    class Config:
        populate_by_name = True
