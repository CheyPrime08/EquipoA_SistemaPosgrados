"""
Rutas para Tesis.
"""

from fastapi import APIRouter, HTTPException, Depends, UploadFile, File, Form
from typing import List, Optional
from backend.services.tesis_service import TesisService
from backend.utils.auth import obtener_rol_usuario

router = APIRouter(prefix="/api/tesis", tags=["tesis"])
service = TesisService()


@router.post("/upload", response_model=dict, summary="Subir avance de tesis")
async def subir_tesis(
    archivo: UploadFile = File(...),
    email: Optional[str] = Form(None),
    rol: str = Depends(obtener_rol_usuario)
):
    if not archivo.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Solo se permiten archivos PDF.")
        
    try:
        resultado = await service.guardar_avance(archivo, email)
        return {"success": True, "data": resultado}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/", response_model=dict, summary="Listar archivos de tesis")
async def listar_tesis(
    email: Optional[str] = None,
    rol: str = Depends(obtener_rol_usuario)
):
    busqueda_email = email
    if rol == "alumno" and not email:
         raise HTTPException(status_code=400, detail="Email es requerido para alumnos")
         
    try:
        archivos = service.obtener_todos(busqueda_email)
        return {"success": True, "data": archivos}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{id_tesis}", response_model=dict, summary="Eliminar archivo de tesis")
async def eliminar_tesis(
    id_tesis: str,
    rol: str = Depends(obtener_rol_usuario)
):
    if rol not in ["admin", "coordinador"]:
        raise HTTPException(status_code=403, detail="No tienes permisos para eliminar archivos de tesis")
        
    eliminado = service.eliminar_tesis(id_tesis)
    if not eliminado:
        raise HTTPException(status_code=404, detail="Archivo no encontrado")
        
    return {"success": True, "message": "Archivo eliminado correctamente"}
