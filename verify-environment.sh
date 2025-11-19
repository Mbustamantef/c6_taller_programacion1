#!/bin/zsh

# Script de verificación del entorno de desarrollo
# Taller 1 - Programación Avanzada

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║           VERIFICACIÓN DEL ENTORNO DE DESARROLLO              ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para verificar comandos
check_command() {
    local cmd=$1
    local name=$2
    local expected=$3

    if command -v $cmd &> /dev/null; then
        local version=$($cmd --version 2>&1 | head -1)
        echo -e "${GREEN}✅ $name instalado${NC}"
        echo "   Versión: $version"
        if [ ! -z "$expected" ]; then
            echo "   Esperado: $expected"
        fi
    else
        echo -e "${RED}❌ $name NO instalado${NC}"
        return 1
    fi
    echo ""
}

# Java
echo "=== Java ==="
if command -v java &> /dev/null; then
    java -version 2>&1 | while read line; do echo "   $line"; done
    echo -e "${GREEN}✅ Java instalado${NC}"
else
    echo -e "${RED}❌ Java NO instalado${NC}"
fi
echo ""

# Maven
echo "=== Maven ==="
if command -v mvn &> /dev/null; then
    mvn -version 2>&1 | head -3 | while read line; do echo "   $line"; done
    echo -e "${GREEN}✅ Maven instalado${NC}"
else
    echo -e "${RED}❌ Maven NO instalado${NC}"
fi
echo ""

# Node.js
echo "=== Node.js ==="
if command -v node &> /dev/null; then
    echo "   Version: $(node --version)"
    echo -e "${GREEN}✅ Node.js instalado${NC}"
else
    echo -e "${RED}❌ Node.js NO instalado${NC}"
fi
echo ""

# npm
echo "=== npm ==="
if command -v npm &> /dev/null; then
    echo "   Version: $(npm --version)"
    echo -e "${GREEN}✅ npm instalado${NC}"
else
    echo -e "${RED}❌ npm NO instalado${NC}"
fi
echo ""

# Docker
echo "=== Docker ==="
if command -v docker &> /dev/null; then
    echo "   Version: $(docker --version)"
    echo -e "${GREEN}✅ Docker instalado${NC}"

    # Verificar si Docker está corriendo
    if docker info > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Docker daemon corriendo${NC}"
    else
        echo -e "${YELLOW}⚠️  Docker daemon NO está corriendo${NC}"
    fi
else
    echo -e "${RED}❌ Docker NO instalado${NC}"
fi
echo ""

# Docker Compose
echo "=== Docker Compose ==="
if command -v docker &> /dev/null && docker compose version > /dev/null 2>&1; then
    echo "   Version: $(docker compose version)"
    echo -e "${GREEN}✅ Docker Compose instalado${NC}"
else
    echo -e "${RED}❌ Docker Compose NO instalado${NC}"
fi
echo ""

# Servicios Docker del proyecto
echo "=== Servicios Docker del Proyecto ==="
if command -v docker &> /dev/null && docker info > /dev/null 2>&1; then
    RUNNING=$(docker ps --format "{{.Names}}" | grep -E "taller1|sonar" | wc -l | tr -d ' ')

    if [ "$RUNNING" -gt 0 ]; then
        echo -e "${GREEN}✅ $RUNNING servicio(s) corriendo${NC}"
        echo ""
        docker ps --format "table {{.Names}}\t{{.Status}}" | grep -E "NAME|taller1|sonar" | while read line; do
            echo "   $line"
        done
    else
        echo -e "${YELLOW}⚠️  No hay servicios del proyecto corriendo${NC}"
        echo "   Para iniciar: cd src/main/docker && docker compose -f postgresql.yml up -d"
    fi
else
    echo -e "${YELLOW}⚠️  No se puede verificar - Docker no está corriendo${NC}"
fi
echo ""

# Resumen
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                    RESUMEN DE VERIFICACIÓN                     ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

ALL_OK=true

if ! command -v java &> /dev/null; then ALL_OK=false; fi
if ! command -v mvn &> /dev/null; then ALL_OK=false; fi
if ! command -v node &> /dev/null; then ALL_OK=false; fi
if ! command -v npm &> /dev/null; then ALL_OK=false; fi
if ! command -v docker &> /dev/null; then ALL_OK=false; fi

if $ALL_OK; then
    echo -e "${GREEN}✅ Todas las herramientas están instaladas correctamente${NC}"
    echo ""
    echo "Siguiente paso:"
    echo "  1. Iniciar servicios Docker: cd src/main/docker && docker compose -f postgresql.yml up -d"
    echo "  2. Iniciar backend: ./mvnw"
    echo "  3. Iniciar frontend: ./npmw start"
else
    echo -e "${RED}❌ Faltan herramientas por instalar${NC}"
    echo ""
    echo "Consulta el README.md para instrucciones de instalación:"
    echo "  https://github.com/Mbustamantef/c6_taller_programacion1#instalación-de-herramientas"
fi
echo ""

