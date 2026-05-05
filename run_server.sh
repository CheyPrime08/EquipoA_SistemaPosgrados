#!/bin/bash

# Script para ejecutar el servidor FastAPI
# Asegúrate de estar en la carpeta raíz del proyecto

cd "$(dirname "$0")"

echo "🚀 Iniciando servidor FastAPI..."
echo "📍 Ubicación: $(pwd)"
echo ""

# Activar el entorno virtual
source .venv/bin/activate
cd backend

# Ejecutar con uvicorn directamente
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
