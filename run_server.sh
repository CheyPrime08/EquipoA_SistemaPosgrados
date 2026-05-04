#!/bin/bash

# Script para ejecutar el servidor FastAPI
# Asegúrate de estar en la carpeta raíz del proyecto

cd "$(dirname "$0")"

echo "🚀 Iniciando servidor FastAPI..."
echo "📍 Ubicación: $(pwd)"
echo ""

# Ejecutar con uvicorn directamente
/home/juanpablo/Programación\ para\ internet/EquipoA_SistemaPosgrados/.venv/bin/uvicorn backend.main:app --host 0.0.0.0 --port 5000 --reload
