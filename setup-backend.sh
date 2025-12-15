#!/bin/bash

# ======================================
# BROADCASTTD Backend - Setup Script
# ======================================

echo "🚀 BROADCASTTD Backend Setup"
echo "=============================="
echo ""

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para imprimir con colores
print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar Node.js
print_info "Verificando Node.js..."
if ! command -v node &> /dev/null; then
    print_error "Node.js no está instalado. Por favor, instala Node.js >= 16.x"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    print_error "Node.js versión $NODE_VERSION detectada. Se requiere >= 16.x"
    exit 1
fi
print_info "✓ Node.js $(node -v) detectado"

# Verificar npm
print_info "Verificando npm..."
if ! command -v npm &> /dev/null; then
    print_error "npm no está instalado"
    exit 1
fi
print_info "✓ npm $(npm -v) detectado"

# Instalar dependencias
print_info "Instalando dependencias..."
if [ -f "backend-package.json" ]; then
    cp backend-package.json package.json
    print_info "✓ package.json configurado"
fi

npm install
if [ $? -eq 0 ]; then
    print_info "✓ Dependencias instaladas correctamente"
else
    print_error "Error al instalar dependencias"
    exit 1
fi

# Crear archivo .env si no existe
print_info "Configurando variables de entorno..."
if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example .env
        print_info "✓ Archivo .env creado desde .env.example"
        print_warning "⚠️  IMPORTANTE: Edita el archivo .env y configura las variables necesarias"
        print_warning "   Especialmente: JWT_SECRET y DATABASE_URL"
    else
        print_error ".env.example no encontrado"
    fi
else
    print_info "✓ Archivo .env ya existe"
fi

# Crear directorios necesarios
print_info "Creando estructura de directorios..."
mkdir -p src/backend/{models,dtos,repositories,services,controllers,middleware,utils,routes,tests}
mkdir -p docs/backend
mkdir -p logs
print_info "✓ Directorios creados"

# Verificar TypeScript
print_info "Verificando TypeScript..."
if npm list typescript &> /dev/null; then
    print_info "✓ TypeScript instalado"
else
    print_warning "TypeScript no encontrado, instalando..."
    npm install --save-dev typescript
fi

# Verificar Jest
print_info "Verificando Jest..."
if npm list jest &> /dev/null; then
    print_info "✓ Jest instalado"
else
    print_warning "Jest no encontrado, instalando..."
    npm install --save-dev jest @types/jest ts-jest
fi

# Resumen
echo ""
echo "=============================="
print_info "✅ Setup completado exitosamente"
echo "=============================="
echo ""
echo "Próximos pasos:"
echo ""
echo "1. Configurar variables de entorno:"
echo "   ${YELLOW}nano .env${NC}"
echo ""
echo "2. Configurar base de datos (si usas Prisma):"
echo "   ${YELLOW}npx prisma init${NC}"
echo "   ${YELLOW}npx prisma migrate dev${NC}"
echo ""
echo "3. Iniciar el servidor en modo desarrollo:"
echo "   ${YELLOW}npm run dev${NC}"
echo ""
echo "4. Ejecutar tests:"
echo "   ${YELLOW}npm test${NC}"
echo ""
echo "5. Compilar para producción:"
echo "   ${YELLOW}npm run build${NC}"
echo "   ${YELLOW}npm start${NC}"
echo ""
echo "Documentación:"
echo "- README: ${YELLOW}README_BACKEND.md${NC}"
echo "- API Docs: ${YELLOW}docs/backend/openapi.yaml${NC}"
echo "- Database Design: ${YELLOW}docs/design/DATABASE_DESIGN.md${NC}"
echo ""
print_info "¡Listo para desarrollar! 🎉"
