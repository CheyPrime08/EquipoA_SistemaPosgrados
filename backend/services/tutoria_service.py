"""
Servicio de Tutorías.
"""

import os
import shutil
from datetime import datetime
from bson import ObjectId
from fastapi import UploadFile
from backend.db.conexion import db
from backend.models.tutoria import Tutoria

UPLOAD_DIR = "uploads/tutorias"
os.makedirs(UPLOAD_DIR, exist_ok=True)


class TutoriaService:
    def __init__(self):
        self.collection = db["reportes_tutorias"]
        self._simulacion_db = []

    def _is_db_available(self):
        try:
            db.client.admin.command('ping')
            return True
        except Exception:
            return False

    async def guardar_reporte(self, archivo: UploadFile, email: str = None) -> dict:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        nombre_seguro = f"{timestamp}_{archivo.filename.replace(' ', '_')}"
        file_path = os.path.join(UPLOAD_DIR, nombre_seguro)
        
        # Guardar en disco
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(archivo.file, buffer)
            
        tutoria = Tutoria(
            nombre_archivo=archivo.filename,
            url_descarga=f"/static_tutorias/{nombre_seguro}",
            usuario_email=email
        )
        
        doc_dict = tutoria.to_dict()
        
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
            cursor = self.collection.find(filtro).sort("fecha_subida", -1)
            resultados = []
            for doc in cursor:
                doc["_id"] = str(doc["_id"])
                resultados.append(doc)
            return resultados
        else:
            if email:
                return [d for d in self._simulacion_db if d.get("usuario_email") == email]
            return self._simulacion_db

    def eliminar_tutoria(self, id_tutoria: str) -> bool:
        if self._is_db_available():
            resultado = self.collection.delete_one({"_id": ObjectId(id_tutoria)})
            return resultado.deleted_count > 0
        else:
            for i, doc in enumerate(self._simulacion_db):
                if doc["_id"] == id_tutoria:
                    self._simulacion_db.pop(i)
                    return True
            return False
