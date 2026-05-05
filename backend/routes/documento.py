"""
Rutas para Documentos.
"""

from fastapi import APIRouter, HTTPException, Depends, UploadFile, File, Form
from typing import List, Optional
from backend.services.documento_service import DocumentoService
from backend.utils.auth import obtener_rol_usuario

router = APIRouter(prefix="/api/documentos", tags=["documentos"])
service = DocumentoService()


@router.post("/upload", response_model=dict, summary="Subir un documento")
async def subir_documento(
    archivo: UploadFile = File(...),
    tipo: str = Form(...),
    email: Optional[str] = Form(None),
    rol: str = Depends(obtener_rol_usuario)
):
    # Validar extensión
    extension = os.path.splitext(archivo.filename)[1].lower()
    if extension not in ['.pdf', '.doc', '.docx', '.png', '.jpg', '.jpeg']:
        raise HTTPException(status_code=400, detail="Formato de archivo no soportado")
        
    try:
        resultado = await service.guardar_archivo(archivo, tipo, email)
        return {"success": True, "data": resultado}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/", response_model=dict, summary="Listar documentos")
async def listar_documentos(
    email: Optional[str] = None,
    rol: str = Depends(obtener_rol_usuario)
):
    # Si es alumno, solo puede ver los suyos (esto es una simplificación)
    # En una app real filtraríamos por el email del token
    busqueda_email = email
    if rol == "alumno" and not email:
         raise HTTPException(status_code=400, detail="Email es requerido para alumnos")
         
    try:
        documentos = service.obtener_todos(busqueda_email)
        return {"success": True, "data": documentos}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{id_doc}", response_model=dict, summary="Eliminar documento")
async def eliminar_documento(
    id_doc: str,
    rol: str = Depends(obtener_rol_usuario)
):
    if rol not in ["admin", "coordinador"]:
        raise HTTPException(status_code=403, detail="No tienes permisos para eliminar documentos")
        
    eliminado = service.eliminar_documento(id_doc)
    if not eliminado:
        raise HTTPException(status_code=404, detail="Documento no encontrado")
        
    return {"success": True, "message": "Documento eliminado correctamente"}

import os # Importar os para la validación de extensión
