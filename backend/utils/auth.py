from fastapi import Header
from typing import Optional

def obtener_rol_usuario(authorization: Optional[str] = Header(None, alias="Authorization")) -> str:
    """
    Simula la obtención del rol del usuario desde el header de autorización.
    """
    if authorization and "admin" in authorization.lower():
        return "admin"
    elif authorization and "coord" in authorization.lower():
        return "coordinador"
    else:
        return "alumno"
