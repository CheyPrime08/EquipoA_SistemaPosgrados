"""
Servicio de Convocatorias - Contiene la lógica de negocio.
"""

from bson import ObjectId
from datetime import datetime
from backend.db.conexion import db
from backend.models.convocatoria import Convocatoria


class ConvocatoriaService:
    """Servicio para manejar operaciones de convocatoria"""
    
    def __init__(self):
        self.collection = db["convocatorias"]
        # Simulación en memoria si DB no está disponible
        self._simulacion_db = []
    
    def _is_db_available(self):
        try:
            db.client.admin.command('ping')
            return True
        except Exception:
            return False

    def crear_convocatoria(self, datos: dict) -> dict:
        """Crea una nueva convocatoria"""
        convocatoria = Convocatoria(
            ciclo=datos["ciclo"],
            fecha_inicio=datos["fecha_inicio"],
            fecha_fin=datos["fecha_fin"],
            useTemplate=datos.get("useTemplate", False),
            estado=datos.get("estado", "activa")
        )
        
        doc = convocatoria.to_dict()
        
        if self._is_db_available():
            resultado = self.collection.insert_one(doc)
            doc["_id"] = str(resultado.inserted_id)
        else:
            doc["_id"] = str(ObjectId())
            self._simulacion_db.append(doc)
            
        return doc

    def obtener_todas(self) -> list:
        """Obtiene todas las convocatorias"""
        if self._is_db_available():
            cursor = self.collection.find()
            resultados = []
            for doc in cursor:
                doc["_id"] = str(doc["_id"])
                resultados.append(doc)
            return resultados
        else:
            return self._simulacion_db

    def obtener_por_id(self, id_conv: str) -> dict:
        """Obtiene una convocatoria por ID"""
        if self._is_db_available():
            doc = self.collection.find_one({"_id": ObjectId(id_conv)})
            if doc:
                doc["_id"] = str(doc["_id"])
            return doc
        else:
            for doc in self._simulacion_db:
                if doc["_id"] == id_conv:
                    return doc
            return None

    def actualizar_convocatoria(self, id_conv: str, datos: dict) -> dict:
        """Actualiza una convocatoria"""
        datos["fechaActualizacion"] = datetime.now()
        
        if self._is_db_available():
            resultado = self.collection.find_one_and_update(
                {"_id": ObjectId(id_conv)},
                {"$set": datos},
                return_document=True
            )
            if resultado:
                resultado["_id"] = str(resultado["_id"])
            return resultado
        else:
            for doc in self._simulacion_db:
                if doc["_id"] == id_conv:
                    doc.update(datos)
                    return doc
            return None

    def eliminar_convocatoria(self, id_conv: str) -> bool:
        """Elimina una convocatoria"""
        if self._is_db_available():
            resultado = self.collection.delete_one({"_id": ObjectId(id_conv)})
            return resultado.deleted_count > 0
        else:
            for i, doc in enumerate(self._simulacion_db):
                if doc["_id"] == id_conv:
                    self._simulacion_db.pop(i)
                    return True
            return False
