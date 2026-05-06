from fastapi import APIRouter, HTTPException, status
from esquemas import LoginRequest
from db.conexion import db

app = APIRouter(prefix="/api", tags=["Login"])

@app.post("/login")
def login(credenciales: LoginRequest):
    # Buscamos en la colección 'user'
    usuario_db = db["user"].find_one({"codigo": credenciales.codigo})
    
    if not usuario_db:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales incorrectas"
        )
        
    # Validamos la contraseña (simulando hash como lo indica el diccionario, aunque por ahora sea texto o lo que mande el frontend)
    # NOTA: En producción, se usaría bcrypt.checkpw(credenciales.password, usuario_db.get("password"))
    if usuario_db.get("password") != credenciales.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales incorrectas"
        )
        
    # Evitamos devolver la contraseña al frontend
    usuario_db["_id"] = str(usuario_db["_id"])
    usuario_db.pop("password", None)
    
    return {
        "message": "Login exitoso",
        "rol": usuario_db.get("rol", "alumno"),
        "user": usuario_db
    }
