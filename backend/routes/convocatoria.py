"""
Rutas (Endpoints) para Convocatorias.
"""

from fastapi import APIRouter, HTTPException, Depends
from typing import List, Optional
from backend.schemas.convocatoria_schema import (
    ConvocatoriaCreate, ConvocatoriaResponse, ConvocatoriaUpdate
)
from backend.services.convocatoria_service import ConvocatoriaService
from backend.utils.auth import obtener_rol_usuario

router = APIRouter(prefix="/api/convocatorias", tags=["convocatorias"])
service = ConvocatoriaService()


@router.post("/", response_model=dict, summary="Crear nueva convocatoria")
async def crear_convocatoria(
    datos: ConvocatoriaCreate,
    rol: str = Depends(obtener_rol_usuario)
):
    if rol not in ["admin", "coordinador"]:
        raise HTTPException(status_code=403, detail="No tienes permisos para crear convocatorias")
    
    try:
        nueva = service.crear_convocatoria(datos.dict())
        return {"success": True, "data": nueva}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/", response_model=dict, summary="Listar todas las convocatorias")
async def listar_convocatorias():
    try:
        convocatorias = service.obtener_todas()
        return {"success": True, "data": convocatorias}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/{id_conv}", response_model=dict, summary="Obtener convocatoria por ID")
async def obtener_convocatoria(id_conv: str):
    convocatoria = service.obtener_por_id(id_conv)
    if not convocatoria:
        raise HTTPException(status_code=404, detail="Convocatoria no encontrada")
    return {"success": True, "data": convocatoria}


@router.patch("/{id_conv}", response_model=dict, summary="Actualizar convocatoria")
async def actualizar_convocatoria(
    id_conv: str,
    datos: ConvocatoriaUpdate,
    rol: str = Depends(obtener_rol_usuario)
):
    if rol not in ["admin", "coordinador"]:
        raise HTTPException(status_code=403, detail="No tienes permisos para editar convocatorias")
    
    actualizada = service.actualizar_convocatoria(id_conv, datos.dict(exclude_unset=True))
    if not actualizada:
        raise HTTPException(status_code=404, detail="Convocatoria no encontrada")
    return {"success": True, "data": actualizada}


@router.delete("/{id_conv}", response_model=dict, summary="Eliminar convocatoria")
async def eliminar_convocatoria(
    id_conv: str,
    rol: str = Depends(obtener_rol_usuario)
):
    if rol != "admin":
        raise HTTPException(status_code=403, detail="Solo administradores pueden eliminar convocatorias")
    
    eliminada = service.eliminar_convocatoria(id_conv)
    if not eliminada:
        raise HTTPException(status_code=404, detail="Convocatoria no encontrada")
    return {"success": True, "message": "Convocatoria eliminada exitosamente"}
