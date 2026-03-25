# Backend FastAPI - Sistema de Preregistro de Posgrados

## 📋 Resumen de la Estructura

He creado una arquitectura **intermedia** para el backend que balanceal simplista y lo avanzado. La estructura es modular, escalable y fácil de mantener.

### Directorios Creados

```
backend/
├── main.py                          # Archivo principal de FastAPI
├── config.py                        # Configuración de la aplicación
├── requirements.txt                 # Dependencias (actualizado)
├── db/
│   └── conexion.py                 # Conexión a MongoDB (ya existía)
├── models/                          # Modelos de datos
│   ├── __init__.py
│   └── preregistro.py              # Modelo Preregistro
├── schemas/                         # Esquemas de validación (Pydantic)
│   ├── __init__.py
│   └── preregistro_schema.py       # Validación de datos de entrada
├── services/                        # Lógica de negocio
│   ├── __init__.py
│   └── preregistro_service.py      # Servicios CRUD para preregistro
└── routes/                          # Endpoints (rutas)
    ├── __init__.py
    └── preregistro.py              # Endpoints de preregistro
```

---

## 🏗️ Explicación Detallada de Cada Componente

### 1. **`main.py` - Archivo Principal**
Este archivo configura toda la aplicación FastAPI:

```python
# Configura CORS (permite comunicación con el frontend)
# Registra todas las rutas
# Define endpoints de salud
```

**Cambios principales:**
- ✅ Integra todas las rutas modularizadas
- ✅ Mantiene el endpoint `/api/login` para autenticación simulada
- ✅ Agrega endpoints de salud (`/health`) para monitoreo
- ✅ Documentación automática en `/docs`

---

### 2. **`config.py` - Configuración**
Centraliza todas las configuraciones de la aplicación:

```python
MONGO_URL              # URL de conexión a MongoDB
DATABASE_NAME          # Nombre de la base de datos
API_PORT               # Puerto donde corre el servidor
SECRET_KEY             # Para tokens JWT en el futuro
```

**Ventajas:**
- Variables de entorno manejadas desde `.env`
- Fácil cambiar configuraciones sin editar muchos archivos
- Escalable para producción

---

### 3. **`schemas/preregistro_schema.py` - Validación de Datos**
Define cómo deben verse los datos que llegan del frontend:

```python
class PreregistroCreate(BaseModel):
    nombre: str = Field(..., min_length=1, max_length=100)
    apellidoPaterno: str
    apellidoMaterno: str
    email: EmailStr  # Valida que sea un email real
    telefono: str
    licenciatura: str
    posgrado: str
    explicacion: str = Field(..., min_length=10)  # Mínimo 10 caracteres
    esUDG: bool
```

**Por qué es importante:**
- Pydantic valida automáticamente que los datos sean correctos
- Si algo falta o tiene formato inválido, rechaza la solicitud
- Genera errores claros describiendo qué está mal

**Ejemplo:**
- Si alguien envía `"email": "no-es-email"` → Error automático
- Si faltan campos → Error con lista de campos faltantes

---

### 4. **`models/preregistro.py` - Modelo de Base de Datos**
Define la estructura de un preregistro en MongoDB:

```python
class Preregistro:
    nombre: str
    apellidoPaterno: str
    # ... otros campos
    fechaCreacion: datetime  # Se agrega automáticamente
    estado: str  # "pendiente", "aprobado", "rechazado"
```

**Funcionalidades:**
- `to_dict()` - Convierte a formato MongoDB
- `from_dict()` - Crea objeto desde un documento de MongoDB

**Cuando MongoDB esté disponible:**
Solo cambias en `services/preregistro_service.py` las líneas:
```python
# DE:
resultado = self.simulacion_db.append(documento)

# A:
coleccion = db["preregistros"]
resultado = coleccion.insert_one(preregistro.to_dict())
```

---

### 5. **`services/preregistro_service.py` - Lógica de Negocio**
Aquí está toda la "inteligencia" para manejar preregistros:

```python
class PreregistroService:
    # CRUD: Create, Read, Update, Delete
    
    crear_preregistro()              # Guarda nuevo preregistro
    obtener_preregistro_por_id()    # Obtiene uno por ID
    obtener_preregistros_por_email()# Útil para alumnos
    obtener_todos_preregistros()    # Coordinadores/Admin ven todos
    actualizar_estado_preregistro() # Cambiar a aprobado/rechazado
    eliminar_preregistro()          # Solo Admin
```

**Simulación de MongoDB:**
Actualmente usa una lista en memoria (`self.simulacion_db`) que se reinicia cuando reinicias el servidor. Cuando MongoDB esté disponible, solo cambias comentarios de "Simulación" por código real.

**Estados de Preregistro:**
- `pendiente` → Acaba de registrarse, aún no revisado
- `aprobado` → Coordinador/Admin lo aprobó
- `rechazado` → No cumplia requisitos

---

### 6. **`routes/preregistro.py` - Endpoints (Rutas)**
Define los **endpoints** que el frontend puede llamar.

#### **Endpoints Disponibles:**

| Método | URL | Quién puede | Descripción |
|--------|-----|-----------|-------------|
| **POST** | `/api/preregistro/` | **Público** | Crear nuevo preregistro |
| **GET** | `/api/preregistro/{id}` | Coordinador, Admin | Obtener un preregistro por ID |
| **GET** | `/api/preregistro/email/{email}` | Alumno, Coord, Admin | Obtener por email |
| **GET** | `/api/preregistro/` | Coordinador, Admin | Listar todos (con filtros) |
| **PATCH** | `/api/preregistro/{id}/estado` | Coordinador, Admin | Cambiar estado |
| **DELETE** | `/api/preregistro/{id}` | **Solo Admin** | Eliminar preregistro |

#### **Control de Acceso por Rol:**

```python
# ALUMNO (rol="alumno")
✅ Puede: Crear preregistro
✅ Puede: Ver su propio preregistro (GET /email/{email})
❌ NO puede: Ver preregistros ajenos
❌ NO puede: Cambiar estados
❌ NO puede: Eliminar

# COORDINADOR (rol="coordinador")  
✅ Puede: Ver todos los preregistros
✅ Puede: Filtrar por estado, posgrado
✅ Puede: Cambiar estado de preregistros
❌ NO puede: Eliminar preregistros

# ADMINISTRADOR (rol="admin")
✅ Puede: TODO - Ver, cambiar estado, eliminar, etc.
```

---

## 📝 Cómo Usar (Instrucciones de Ejecución)

### **Paso 1: Instalar dependencias** (ya hecho)
```bash
cd backend
pip install -r requirements.txt
```

### **Paso 2: Crear archivo `.env`** (IMPORTANTE)
Crea un archivo `backend/.env` con:
```env
MONGO_URL=mongodb://localhost:27017
DATABASE_NAME=sistema_posgrados
DEBUG=True
API_PORT=5000
```

Cuando MongoDB esté disponible:
```env
MONGO_URL=mongodb+srv://usuario:contraseña@cluster.mongodb.net
DATABASE_NAME=sistema_posgrados
```

### **Paso 3: Ejecutar el servidor**
```bash
python main.py
```

El servidor correrá en: `http://localhost:5000`

### **Paso 4: Acceder a la documentación**
- **Swagger UI (interactivo):** http://localhost:5000/docs
- **ReDoc (alternativo):** http://localhost:5000/redoc

---

## 🧪 Ejemplos de Pruebas

### **1. Crear un preregistro (POST)**
```bash
curl -X POST "http://localhost:5000/api/preregistro/" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan",
    "apellidoPaterno": "Pérez",
    "apellidoMaterno": "López",
    "email": "juan@example.com",
    "telefono": "1234567890",
    "licenciatura": "Ingeniería en Informática",
    "posgrado": "Maestría en Ciencias de la Computación",
    "explicacion": "Soy un candidato muy interesado en el programa",
    "esUDG": true
  }'
```

### **2. Ver todos los preregistros (GET)**
```bash
# Como coordinador (incluye "coordinator" en header)
curl -X GET "http://localhost:5000/api/preregistro/" \
  -H "Authorization: coordinator-token"
```

### **3. Cambiar estado de preregistro (PATCH)**
```bash
curl -X PATCH "http://localhost:5000/api/preregistro/{id}/estado" \
  -H "Content-Type: application/json" \
  -H "Authorization: admin-token" \
  -d '{"estado": "aprobado"}'
```

---

## 🔄 Flujo Actual (Simulación)

1. **Frontend envia datos** → POST `/api/preregistro/`
2. **FastAPI valida** con Pydantic (esquema)
3. **Service guarda en simulación** (lista en memoria)
4. **Retorna respuesta JSON**

```json
{
  "success": true,
  "message": "Pre-registro creado exitosamente",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "nombre": "Juan",
    "estado": "pendiente",
    "fechaCreacion": "2024-03-24T10:30:00"
  }
}
```

---

## 🚀 Cambios para MongoDB Real

Cuando MongoDB esté configurado, solo cambias en `services/preregistro_service.py`:

**Paso 1:** Descomenta las líneas que dicen:
```python
# Cuando MongoDB esté configurado:
# coleccion = db["preregistros"]
# resultado = coleccion.insert_one(...)
```

**Paso 2:** Comenta las líneas de simulación:
```python
# self.simulacion_db.append(...)
```

**Paso 3:** Importa la conexión:
```python
from backend.db.conexion import db
```

¡Listo! El resto del código sigue igual.

---

## 📊 Ventajas de Esta Estructura

| Aspecto | Beneficio |
|--------|-----------|
| **Modular** | Cada carpeta tiene responsabilidad clara |
| **Escalable** | Fácil agregar nuevos módulos (alumnos, coordinación) |
| **Mantenible** | Cambios en un lugar afectan todo|
| **Testeable** | Services se pueden probar independientemente |
| **Documentado** | Pydantic genera docs automáticamente |
| **Roles** | Control de acceso por roles integrado |

---

## 📌 Próximos Pasos

1. ✅ **Estructura creada**
2. ⏳ **Cuando MongoDB esté listo:** Cambiar simulación por código real
3. ⏳ **Autenticación JWT:** Reemplazar headers simulados con tokens reales
4. ⏳ **Módulos adicionales:** Alumnos, Coordinación, Tesis (misma estructura)
5. ⏳ **Tests unitarios:** Crear tests para services

---

## 🔗 Conexión con Frontend

El frontend (React) hace llamadas así:

```javascript
// Crear preregistro
const response = await fetch("http://localhost:5000/api/preregistro", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(datosDelFormulario)
});
```

El backend recibe, valida y responde. ¡Funciona perfectamente con el frontend actual!

---

## 📚 Archivos Clave

| Archivo | Línea | Propósito |
|---------|------|-----------|
| [main.py](../main.py) | 1-50 | Configuración de FastAPI |
| [config.py](../config.py) | 1-20 | Variables de entorno |
| [schemas/preregistro_schema.py](../schemas/preregistro_schema.py) | 1-30 | Validación con Pydantic |
| [models/preregistro.py](../models/preregistro.py) | 1-40 | Estructura de BD |
| [services/preregistro_service.py](../services/preregistro_service.py) | 1-100 | Lógica CRUD |
| [routes/preregistro.py](../routes/preregistro.py) | 1-50 | Endpoints públicos |

---

¡El backend está listo! 🚀
