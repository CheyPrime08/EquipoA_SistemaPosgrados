#!/bin/bash

# Script simple para ejecutar el servidor FastAPI
# Uso: ./start_server.sh

echo "=========================================="
echo "🚀 INICIANDO SERVIDOR FASTAPI"
echo "=========================================="
echo ""

# Ir a la carpeta raíz del proyecto
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo "📍 Ubicación: $(pwd)"
echo ""

# Activar entorno virtual (opcional, pero recomendado)
if [ -d ".venv/bin" ]; then
    echo "✓ Activando entorno virtual..."
    source .venv/bin/activate
    echo "✓ Entorno virtual activado"
    echo ""
fi

# Ejecutar servidor
echo "Iniciando servidor en http://localhost:5000"
echo "Presiona CTRL+C para detener"
echo ""
echo "Documentación interactiva:"
echo "  - Swagger UI: http://localhost:5000/docs"
echo "  - ReDoc: http://localhost:5000/redoc"
echo ""
echo "=========================================="
echo ""

# Ejecutar con Python
python backend/main.py
