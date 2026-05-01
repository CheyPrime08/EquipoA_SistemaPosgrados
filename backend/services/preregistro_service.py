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
        # Simulamos la colección, cuando MongoDB esté disponible se usará la conexión real
        # Ahora estamos usando una lista en memoria para simular
        self.simulacion_db = []
    
    def crear_preregistro(self, datos: dict) -> dict:
        """
        Crea un nuevo preregistro.
        Simula la inserción en MongoDB.
        
        Args:
            datos: Diccionario con los datos del preregistro
            
        Returns:
            Diccionario con el preregistro creado incluyendo su ID
        """
        # Crear objeto Preregistro
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
        
        # Cuando MongoDB esté configurado, usar:
        # coleccion = db["preregistros"]
        # resultado = coleccion.insert_one(preregistro.to_dict())
        # return {"_id": str(resultado.inserted_id), **preregistro.to_dict()}
        
        # Por ahora simulamos con un ID simulado
        documento = preregistro.to_dict()
        documento["_id"] = ObjectId()  # Generamos un ID simulado
        self.simulacion_db.append(documento)
        
        return {
            "_id": str(documento["_id"]),
            **documento
        }
    
    def obtener_preregistro_por_id(self, id_preregistro: str) -> dict:
        """
        Obtiene un preregistro por su ID.
        
        Args:
            id_preregistro: ID del preregistro a obtener
            
        Returns:
            Diccionario con los datos del preregistro o None
        """
        # Cuando MongoDB esté configurado:
        # coleccion = db["preregistros"]
        # resultado = coleccion.find_one({"_id": ObjectId(id_preregistro)})
        # return resultado
        
        # Simulación
        for doc in self.simulacion_db:
            if str(doc["_id"]) == id_preregistro:
                return {
                    "_id": str(doc["_id"]),
                    **{k: v for k, v in doc.items() if k != "_id"}
                }
        return None
    
    def obtener_preregistros_por_email(self, email: str) -> dict:
        """
        Obtiene un preregistro por email (útil para alumnos que consultan su propio registro).
        
        Args:
            email: Email del alumno
            
        Returns:
            Diccionario con los datos del preregistro o None
        """
        # Cuando MongoDB esté configurado:
        # coleccion = db["preregistros"]
        # resultado = coleccion.find_one({"email": email})
        # return resultado
        
        # Simulación
        for doc in self.simulacion_db:
            if doc.get("email") == email:
                return {
                    "_id": str(doc["_id"]),
                    **{k: v for k, v in doc.items() if k != "_id"}
                }
        return None
    
    def obtener_todos_preregistros(self, estado: str = None, posgrado: str = None) -> list:
        """
        Obtiene todos los preregistros (solo coordinadores y admin pueden usar esto).
        Permite filtrar por estado o posgrado.
        
        Args:
            estado: Filtro opcional por estado (pendiente, aprobado, rechazado)
            posgrado: Filtro opcional por posgrado
            
        Returns:
            Lista de preregistros
        """
        # Cuando MongoDB esté configurado:
        # coleccion = db["preregistros"]
        # filtro = {}
        # if estado:
        #     filtro["estado"] = estado
        # if posgrado:
        #     filtro["posgrado"] = posgrado
        # resultado = list(coleccion.find(filtro))
        # return resultado
        
        # Simulación
        resultados = []
        for doc in self.simulacion_db:
            cumple_estado = estado is None or doc.get("estado") == estado
            cumple_posgrado = posgrado is None or doc.get("posgrado") == posgrado
            
            if cumple_estado and cumple_posgrado:
                resultados.append({
                    "_id": str(doc["_id"]),
                    **{k: v for k, v in doc.items() if k != "_id"}
                })
        
        return resultados
    
    def actualizar_estado_preregistro(self, id_preregistro: str, nuevo_estado: str) -> dict:
        """
        Actualiza el estado de un preregistro (solo coordinadores y admin).
        Estados válidos: pendiente, aprobado, rechazado
        
        Args:
            id_preregistro: ID del preregistro
            nuevo_estado: Nuevo estado
            
        Returns:
            Diccionario con el preregistro actualizado
        """
        estados_validos = ["pendiente", "aprobado", "rechazado"]
        if nuevo_estado not in estados_validos:
            raise ValueError(f"Estado inválido. Debe ser uno de: {estados_validos}")
        
        # Cuando MongoDB esté configurado:
        # coleccion = db["preregistros"]
        # resultado = coleccion.find_one_and_update(
        #     {"_id": ObjectId(id_preregistro)},
        #     {"$set": {"estado": nuevo_estado, "fechaActualizacion": datetime.now()}},
        #     return_document=True
        # )
        # return resultado
        
        # Simulación
        for doc in self.simulacion_db:
            if str(doc["_id"]) == id_preregistro:
                doc["estado"] = nuevo_estado
                doc["fechaActualizacion"] = datetime.now()
                return {
                    "_id": str(doc["_id"]),
                    **{k: v for k, v in doc.items() if k != "_id"}
                }
        
        return None
    
    def eliminar_preregistro(self, id_preregistro: str) -> bool:
        """
        Elimina un preregistro (solo admin).
        
        Args:
            id_preregistro: ID del preregistro a eliminar
            
        Returns:
            True si se eliminó, False si no existía
        """
        # Cuando MongoDB esté configurado:
        # coleccion = db["preregistros"]
        # resultado = coleccion.delete_one({"_id": ObjectId(id_preregistro)})
        # return resultado.deleted_count > 0
        
        # Simulación
        for i, doc in enumerate(self.simulacion_db):
            if str(doc["_id"]) == id_preregistro:
                self.simulacion_db.pop(i)
                return True
        
        return False
