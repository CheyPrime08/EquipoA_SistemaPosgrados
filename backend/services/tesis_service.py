"""
Servicio de Tesis.
"""

import os
import shutil
from datetime import datetime
from bson import ObjectId
from fastapi import UploadFile
from backend.db.conexion import db
from backend.models.tesis import Tesis

UPLOAD_DIR = "uploads/tesis"
os.makedirs(UPLOAD_DIR, exist_ok=True)


class TesisService:
    def __init__(self):
        self.collection = db["archivos_tesis"]
        self._simulacion_db = []

    def _is_db_available(self):
        try:
            db.client.admin.command('ping')
            return True
        except Exception:
            return False

    async def guardar_avance(self, archivo: UploadFile, email: str = None) -> dict:
        file_path = os.path.join(UPLOAD_DIR, archivo.filename)
        
        # Guardar en disco
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(archivo.file, buffer)
            
        tesis = Tesis(
            nombre_archivo=archivo.filename,
            ruta=f"/static_tesis/{archivo.filename}",
            usuario_email=email
        )
        
        doc_dict = tesis.to_dict()
        
        if self._is_db_available():
            resultado = self.collection.insert_one(doc_dict)
            doc_dict["_id"] = str(resultado.inserted_id)
        else:
            doc_dict["_id"] = str(ObjectId())
            self._simulacion_db.append(doc_dict)
            
        return doc_dict

    def obtener_todos(self, email: str = None) -> list:
        filtro = {}
        if email:
            filtro["usuario_email"] = email
            
        if self._is_db_available():
            cursor = self.collection.find(filtro)
            resultados = []
            for doc in cursor:
                doc["_id"] = str(doc["_id"])
                resultados.append(doc)
            return resultados
        else:
            if email:
                return [d for d in self._simulacion_db if d.get("usuario_email") == email]
            return self._simulacion_db

    def eliminar_tesis(self, id_tesis: str) -> bool:
        if self._is_db_available():
            resultado = self.collection.delete_one({"_id": ObjectId(id_tesis)})
            return resultado.deleted_count > 0
        else:
            for i, doc in enumerate(self._simulacion_db):
                if doc["_id"] == id_tesis:
                    self._simulacion_db.pop(i)
                    return True
            return False
