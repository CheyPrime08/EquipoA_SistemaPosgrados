"""
Servicio de PreRegistro - Contiene la lógica de negocio.
Aquí van todas las operaciones CRUD y validaciones de preregistro.
"""

from bson import ObjectId
from datetime import datetime
from backend.db.conexion import db
from backend.models.preregistro import Preregistro


class PreregistroService:
    """Servicio para manejar operaciones de preregistro"""
    
    def __init__(self):
        self.collection = db["preregistros"]
        self._simulacion_db = []
    
    def _is_db_available(self):
        try:
            db.client.admin.command('ping')
            return True
        except Exception:
            return False

    def crear_preregistro(self, datos: dict) -> dict:
        """Crea un nuevo preregistro."""
        preregistro = Preregistro(
            nombre=datos["nombre"],
            apellidoPaterno=datos["apellidoPaterno"],
            apellidoMaterno=datos["apellidoMaterno"],
            email=datos["email"],
            telefono=datos["telefono"],
            licenciatura=datos["licenciatura"],
            posgrado=datos["posgrado"],
            explicacion=datos["explicacion"],
            esUDG=datos.get("esUDG", False)
        )
        
        doc = preregistro.to_dict()
        
        if self._is_db_available():
            resultado = self.collection.insert_one(doc)
            doc["_id"] = str(resultado.inserted_id)
        else:
            doc["_id"] = str(ObjectId())
            self._simulacion_db.append(doc)
            
        return doc
    
    def obtener_preregistro_por_id(self, id_preregistro: str) -> dict:
        """Obtiene un preregistro por su ID."""
        if self._is_db_available():
            doc = self.collection.find_one({"_id": ObjectId(id_preregistro)})
            if doc:
                doc["_id"] = str(doc["_id"])
            return doc
        else:
            for doc in self._simulacion_db:
                if doc["_id"] == id_preregistro:
                    return doc
            return None
    
    def obtener_preregistros_por_email(self, email: str) -> dict:
        """Obtiene un preregistro por email."""
        if self._is_db_available():
            doc = self.collection.find_one({"email": email})
            if doc:
                doc["_id"] = str(doc["_id"])
            return doc
        else:
            for doc in self._simulacion_db:
                if doc.get("email") == email:
                    return doc
            return None
    
    def obtener_todos_preregistros(self, estado: str = None, posgrado: str = None) -> list:
        """Obtiene todos los preregistros con filtros."""
        if self._is_db_available():
            filtro = {}
            if estado:
                filtro["estado"] = estado
            if posgrado:
                filtro["posgrado"] = posgrado
            cursor = self.collection.find(filtro)
            resultados = []
            for doc in cursor:
                doc["_id"] = str(doc["_id"])
                resultados.append(doc)
            return resultados
        else:
            resultados = []
            for doc in self._simulacion_db:
                cumple_estado = estado is None or doc.get("estado") == estado
                cumple_posgrado = posgrado is None or doc.get("posgrado") == posgrado
                if cumple_estado and cumple_posgrado:
                    resultados.append(doc)
            return resultados
    
    def actualizar_estado_preregistro(self, id_preregistro: str, nuevo_estado: str) -> dict:
        """Actualiza el estado de un preregistro."""
        estados_validos = ["pendiente", "aprobado", "rechazado"]
        if nuevo_estado not in estados_validos:
            raise ValueError(f"Estado inválido. Debe ser uno de: {estados_validos}")
        
        if self._is_db_available():
            resultado = self.collection.find_one_and_update(
                {"_id": ObjectId(id_preregistro)},
                {"$set": {"estado": nuevo_estado, "fechaActualizacion": datetime.now()}},
                return_document=True
            )
            if resultado:
                resultado["_id"] = str(resultado["_id"])
            return resultado
        else:
            for doc in self._simulacion_db:
                if doc["_id"] == id_preregistro:
                    doc["estado"] = nuevo_estado
                    doc["fechaActualizacion"] = datetime.now()
                    return doc
            return None
    
    def eliminar_preregistro(self, id_preregistro: str) -> bool:
        """Elimina un preregistro."""
        if self._is_db_available():
            resultado = self.collection.delete_one({"_id": ObjectId(id_preregistro)})
            return resultado.deleted_count > 0
        else:
            for i, doc in enumerate(self._simulacion_db):
                if doc["_id"] == id_preregistro:
                    self._simulacion_db.pop(i)
                    return True
            return False
