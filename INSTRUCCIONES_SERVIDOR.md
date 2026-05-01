# 🚀 Instrucciones de Ejecución - Backend FastAPI

## ⚠️ IMPORTANTE: Dónde ejecutar

**Debes estar en la CARPETA RAÍZ del proyecto, NO en la carpeta `backend/`**

```bash
# ❌ INCORRECTO (no funciona)
cd backend
python3 main.py

# ✅ CORRECTO
cd /ruta/a/EquipoA_SistemaPosgrados
python main.py
```

---

## 🔧 Opción 1: Ejecutar directamente (Recomendado)

### Paso 1: Activar el entorno virtual

```bash
cd ~/Programación\ para\ internet/EquipoA_SistemaPosgrados

# En Linux/Mac
source .venv/bin/activate

# En Windows
.venv\Scripts\activate
```

Verás que aparece `(.venv)` al inicio de tu terminal.

### Paso 2: Ejecutar el servidor

```bash
python backend/main.py
```

Deberías ver:
```
[CONEXIÓN MONGODB] Intentando conectar a: mongodb://localhost:27017
[!] Usando simulación en memoria para desarrollo
🚀 Iniciando servidor en http://0.0.0.0:5000
📚 Documentación en http://localhost:5000/docs
🔗 API en http://localhost:5000/api

INFO:     Uvicorn running on http://0.0.0.0:5000
```

---

## 🎬 Opción 2: Usar el script (Linux/Mac)

```bash
# Hacer el script ejecutable
chmod +x run_server.sh

# Ejecutar
./run_server.sh
```

---

## 🧪 Verificar que funciona

**En otra terminal:**

```bash
curl http://localhost:5000/health
```

Deberías recibir:
```json
{"status":"healthy","message":"Backend funcionando correctamente"}
```

---

## 📖 Acceder a la documentación interactiva

Una vez el servidor esté corriendo:

- **Swagger UI:** http://localhost:5000/docs
- **ReDoc:** http://localhost:5000/redoc
- **Raíz API:** http://localhost:5000

---

## 🛑 Detener el servidor

- **Si corre en foreground:** `Ctrl + C`
- **Si corre en background:** 

```bash
# En Linux/Mac, encuentra el proceso
lsof -i :5000

# Mata el proceso (reemplaza PID)
kill -9 <PID>

# O simplemente
pkill -f "uvicorn"
```

---

## 🔗 Quick Reference - Comandos de Inicio

```bash
# Desde la carpeta raíz del proyecto

# Opción 1: Con entorno virtual activado (RECOMENDADO)
source .venv/bin/activate
python backend/main.py

# Opción 2: Sin activar (especificando la ruta)
/ruta/a/.venv/bin/python backend/main.py

# Opción 3: Con variables de entorno
PYTHONPATH=$(pwd) /ruta/a/.venv/bin/python backend/main.py

# Opción 4: Con uvicorn directamente
source .venv/bin/activate
uvicorn backend.main:app --host 0.0.0.0 --port 5000 --reload
```

---

## 🐛 Troubleshooting

### Error: `ModuleNotFoundError: No module named 'fastapi'`
**Solución:** Asegúrate de:
1. Estar en la carpeta raíz (no en `backend/`)
2. Usar el Python del entorno virtual
3. Haber instalado las dependencias: `pip install -r backend/requirements.txt`

### Error: `ModuleNotFoundError: No module named 'backend'`
**Solución:** Ejecuta siempre desde la carpeta raíz del proyecto

### Error: `Port 5000 already in use`
**Solución:**
```bash
# Mata el proceso anterior
pkill -f "uvicorn"

# O usa otro puerto
python backend/main.py  # Cambia el puerto en config.py
```

### Error: `Connection refused` en la documentación
**Solución:** Asegúrate de que el servidor está corriendo, espera 3-5 segundos e intenta de nuevo.

---

## 📝 Notas

- El servidor se inicia en **http://0.0.0.0:5000** (accesible desde cualquier máquina)
- La documentación interactiva está en `/docs` (Swagger UI)
- Los datos se guardan en **simulación** (en memoria) hasta que MongoDB esté disponible
- El modo `--reload` reinicia el servidor cuando cambias archivos Python

