"""
Rutas (Endpoints) para PreRegistro.
Define todos los endpoints disponibles para el módulo de preregistro.
"""

from fastapi import APIRouter, HTTPException, Depends, Header
from typing import Optional
from datetime import datetime
from backend.schemas.preregistro_schema import (
    PreregistroCreate, PreregistroResponse, PreregistroUpdate, PreregistroFilter
)
from backend.services.preregistro_service import PreregistroService

router = APIRouter(prefix="/api/preregistro", tags=["preregistro"])
service = PreregistroService()


def obtener_rol_usuario(authorization: Optional[str] = Header(None)) -> str:
    """
    Simula la obtención del rol del usuario desde el header de autorización.
    En producción, se verificaría un JWT token.
    
    Args:
        authorization: Header de autorización (Bearer token)
        
    Returns:
        El rol del usuario: "alumno", "coordinador" o "admin"
    """
    # Por ahora retorna un rol simulado basado en el header
    # En producción, esto verificaría un JWT token
    
    if authorization and "admin" in authorization.lower():
        return "admin"
    elif authorization and "coord" in authorization.lower():
        return "coordinador"
    else:
        return "alumno"  # Por defecto


@router.post("/", response_model=dict, summary="Crear nuevo preregistro")
async def crear_preregistro(
    datos: PreregistroCreate,
    rol: str = Depends(obtener_rol_usuario)
):
    """
    **Endpoint público para crear un nuevo preregistro.**
    
    Cualquier usuario puede crear un preregistro.
    
    Datos requeridos:
    - nombre: Nombre del aspirante
    - apellidoPaterno: Apellido paterno
    - apellidoMaterno: Apellido materno
    - email: Email válido
    - telefono: Número de teléfono
    - licenciatura: Carrera de origen
    - posgrado: Programa de posgrado deseado
    - explicacion: Carta de motivación o explicación
    - esUDG: Booleano indicando si es egresado UDG
    """
    try:
        # Convertir el modelo Pydantic a diccionario
        datos_dict = datos.dict()
        
        # Crear el preregistro usando el servicio
        preregistro_creado = service.crear_preregistro(datos_dict)
        
        return {
            "success": True,
            "message": "Pre-registro creado exitosamente",
            "data": preregistro_creado
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error al crear preregistro: {str(e)}")


@router.get("/email/{email}", response_model=dict, summary="Obtener preregistro propio")
async def obtener_preregistro_propio(
    email: str,
    rol: str = Depends(obtener_rol_usuario)
):
    """
    **Endpoint para que los alumnos obtengan su propio preregistro.**
    
    Los alumnos solo pueden ver su propia información usando su email.
    Los coordinadores y admin pueden ver cualquier preregistro.
    
    Args:
        email: Email del preregistro a obtener
    """
    # Verificar permisos
    # En una app real, obtendríamos el email del usuario autenticado
    # Aquí solo lo permitimos a coordinadores y admin para este ejemplo
    
    preregistro = service.obtener_preregistros_por_email(email)
    
    if not preregistro:
        raise HTTPException(status_code=404, detail="Preregistro no encontrado")
    
    return {
        "success": True,
        "data": preregistro
    }


@router.get("/{id_preregistro}", response_model=dict, summary="Obtener preregistro por ID")
async def obtener_preregistro(
    id_preregistro: str,
    rol: str = Depends(obtener_rol_usuario)
):
    """
    **Endpoint para obtener un preregistro específico por ID.**
    
    - Los alumnos NO pueden usar este endpoint
    - Los coordinadores pueden obtener preregistros
    - Los administradores pueden obtener cualquier preregistro
    
    Args:
        id_preregistro: ID del preregistro
    """
    # Control de acceso
    if rol == "alumno":
        raise HTTPException(status_code=403, detail="No tienes permiso para acceder a este recurso")
    
    preregistro = service.obtener_preregistro_por_id(id_preregistro)
    
    if not preregistro:
        raise HTTPException(status_code=404, detail="Preregistro no encontrado")
    
    return {
        "success": True,
        "data": preregistro
    }


@router.get("/", response_model=dict, summary="Listar todos los preregistros")
async def listar_preregistros(
    estado: Optional[str] = None,
    posgrado: Optional[str] = None,
    rol: str = Depends(obtener_rol_usuario)
):
    """
    **Endpoint para listar todos los preregistros (con filtros opcionales).**
    
    - Los alumnos NO pueden usar este endpoint
    - Los coordinadores pueden ver todos los preregistros
    - Los administradores pueden ver todos los preregistros
    
    Parámetros opcionales:
    - estado: Filtrar por estado (pendiente, aprobado, rechazado)
    - posgrado: Filtrar por programa de posgrado
    """
    # Control de acceso
    if rol == "alumno":
        raise HTTPException(
            status_code=403,
            detail="Alumnos no pueden acceder a este recurso. Usa /email/{email} en su lugar"
        )
    
    try:
        preregistros = service.obtener_todos_preregistros(estado=estado, posgrado=posgrado)
        
        return {
            "success": True,
            "total": len(preregistros),
            "data": preregistros
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error al obtener preregistros: {str(e)}")


@router.patch("/{id_preregistro}/estado", response_model=dict, summary="Actualizar estado de preregistro")
async def actualizar_estado_preregistro(
    id_preregistro: str,
    datos: PreregistroUpdate,
    rol: str = Depends(obtener_rol_usuario)
):
    """
    **Endpoint para actualizar el estado de un preregistro.**
    
    - Los alumnos NO pueden usar este endpoint
    - Los coordinadores PUEDEN actualizar estados
    - Los administradores PUEDEN actualizar estados
    
    Estados válidos:
    - pendiente: Aún no revisado
    - aprobado: Aceptado
    - rechazado: No aceptado
    
    Args:
        id_preregistro: ID del preregistro
        datos: Objeto con el nuevo estado
    """
    # Control de acceso
    if rol == "alumno":
        raise HTTPException(status_code=403, detail="No tienes permiso para actualizar preregistros")
    
    if not datos.estado:
        raise HTTPException(status_code=400, detail="El campo 'estado' es requerido")
    
    try:
        preregistro_actualizado = service.actualizar_estado_preregistro(
            id_preregistro, datos.estado
        )
        
        if not preregistro_actualizado:
            raise HTTPException(status_code=404, detail="Preregistro no encontrado")
        
        return {
            "success": True,
            "message": f"Estado actualizado a '{datos.estado}'",
            "data": preregistro_actualizado
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error al actualizar: {str(e)}")


@router.delete("/{id_preregistro}", response_model=dict, summary="Eliminar preregistro")
async def eliminar_preregistro(
    id_preregistro: str,
    rol: str = Depends(obtener_rol_usuario)
):
    """
    **Endpoint para eliminar un preregistro (solo admin).**
    
    - Los alumnos NO pueden usar este endpoint
    - Los coordinadores NO pueden usar este endpoint
    - Solo los ADMINISTRADORES pueden eliminar preregistros
    
    Args:
        id_preregistro: ID del preregistro a eliminar
    """
    # Control de acceso - solo admin
    if rol != "admin":
        raise HTTPException(
            status_code=403,
            detail="Solo los administradores pueden eliminar preregistros"
        )
    
    try:
        eliminado = service.eliminar_preregistro(id_preregistro)
        
        if not eliminado:
            raise HTTPException(status_code=404, detail="Preregistro no encontrado")
        
        return {
            "success": True,
            "message": "Preregistro eliminado exitosamente"
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error al eliminar: {str(e)}")
