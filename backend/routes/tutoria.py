"""
Rutas para Tutorías.
"""

from fastapi import APIRouter, HTTPException, Depends, UploadFile, File, Form
from typing import List, Optional
from backend.services.tutoria_service import TutoriaService
from backend.utils.auth import obtener_rol_usuario

router = APIRouter(prefix="/api/tutorias", tags=["tutorias"])
service = TutoriaService()


@router.post("/upload", response_model=dict, summary="Subir reporte de tutoría")
async def subir_tutoria(
    archivo: UploadFile = File(...),
    email: Optional[str] = Form(None),
    rol: str = Depends(obtener_rol_usuario)
):
    extension = os.path.splitext(archivo.filename)[1].lower()
    if extension not in ['.pdf', '.doc', '.docx']:
        raise HTTPException(status_code=400, detail="Formato de archivo no soportado")
        
    try:
        resultado = await service.guardar_reporte(archivo, email)
        return {"success": True, "data": resultado}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/", response_model=dict, summary="Listar reportes de tutoría")
async def listar_tutorias(
    email: Optional[str] = None,
    rol: str = Depends(obtener_rol_usuario)
):
    busqueda_email = email
    if rol == "alumno" and not email:
         raise HTTPException(status_code=400, detail="Email es requerido para alumnos")
         
    try:
        reportes = service.obtener_todos(busqueda_email)
        return {"success": True, "data": reportes}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{id_tutoria}", response_model=dict, summary="Eliminar reporte de tutoría")
async def eliminar_tutoria(
    id_tutoria: str,
    rol: str = Depends(obtener_rol_usuario)
):
    if rol not in ["admin", "coordinador"]:
        raise HTTPException(status_code=403, detail="No tienes permisos para eliminar tutorías")
        
    eliminado = service.eliminar_tutoria(id_tutoria)
    if not eliminado:
        raise HTTPException(status_code=404, detail="Reporte no encontrado")
        
    return {"success": True, "message": "Reporte eliminado correctamente"}

import os # Importar os
