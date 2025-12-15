# 🚀 Guía de Instalación Rápida - BROADCASTTD Backend

## ⚡ Instalación Express (5 minutos)

### Windows

```cmd
# 1. Ejecutar script de setup
setup-backend.bat

# 2. Editar variables de entorno
notepad .env

# 3. Iniciar servidor
npm run dev
```

### Linux/Mac

```bash
# 1. Dar permisos y ejecutar setup
chmod +x setup-backend.sh
./setup-backend.sh

# 2. Editar variables de entorno
nano .env

# 3. Iniciar servidor
npm run dev
```

---

## 📝 Instalación Manual Paso a Paso

### 1. Verificar Requisitos

```bash
node -v    # Debe ser >= 16.x
npm -v     # Debe ser >= 8.x
```

Si no tienes Node.js: https://nodejs.org/

### 2. Clonar e Instalar

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/AROProyectoMaqueta.git
cd AROProyectoMaqueta

# Copiar package.json del backend
cp backend-package.json package.json

# Instalar dependencias
npm install
```

### 3. Configurar Variables de Entorno

```bash
# Copiar ejemplo
cp .env.example .env

# Editar .env
nano .env  # Linux/Mac
notepad .env  # Windows
```

**⚠️ IMPORTANTE:** Edita estas variables:

```env
JWT_SECRET=genera-un-string-aleatorio-muy-largo-aqui
DATABASE_URL=postgresql://usuario:password@localhost:5432/broadcasttd
```

### 4. Configurar Base de Datos

#### Opción A: Con Prisma (Recomendado)

```bash
# Instalar Prisma
npm install prisma @prisma/client

# Inicializar
npx prisma init

# Copiar modelos desde docs/design/DATABASE_DESIGN.md
# al archivo prisma/schema.prisma

# Crear base de datos
npx prisma migrate dev --name init

# Generar cliente
npx prisma generate
```

#### Opción B: Con TypeORM

```bash
# Instalar TypeORM
npm install typeorm reflect-metadata pg

# Configurar ormconfig.json
# Ejecutar migraciones
npm run typeorm migration:run
```

#### Opción C: Con Sequelize

```bash
# Instalar Sequelize
npm install sequelize pg pg-hstore

# Configurar database.js
# Ejecutar migraciones
npx sequelize-cli db:migrate
```

### 5. Ejecutar el Servidor

```bash
# Modo desarrollo (con hot-reload)
npm run dev

# Verificar que funciona
curl http://localhost:3000/health
```

Deberías ver:
```json
{
  "success": true,
  "message": "Server is running"
}
```

### 6. Ejecutar Tests

```bash
# Todos los tests
npm test

# Con coverage
npm run test:coverage
```

### 7. Compilar para Producción

```bash
# Compilar TypeScript
npm run build

# Ejecutar versión compilada
npm start
```

---

## 📦 Dependencias Instaladas

### Core
- ✅ `express` - Framework HTTP
- ✅ `cors` - Control de acceso cross-origin
- ✅ `dotenv` - Variables de entorno
- ✅ `jsonwebtoken` - Autenticación JWT
- ✅ `bcryptjs` - Password hashing

### Development
- ✅ `typescript` - Lenguaje
- ✅ `ts-node-dev` - Desarrollo con hot-reload
- ✅ `jest` - Testing framework
- ✅ `supertest` - HTTP tests
- ✅ `@types/*` - TypeScript types

---

## 🧪 Verificar Instalación

### Test 1: Health Check

```bash
curl http://localhost:3000/health
```

✅ Esperado: `{"success": true, "message": "Server is running"}`

### Test 2: Registro de Usuario

```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "password": "password123"
  }'
```

✅ Esperado: Status 201 con datos del usuario

### Test 3: Login

```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

✅ Esperado: Status 200 con token JWT

### Test 4: Ejecutar Tests

```bash
npm test
```

✅ Esperado: Todos los tests pasan

---

## 🔧 Solución de Problemas

### Problema: "Cannot find module 'express'"

**Solución:**
```bash
npm install express cors dotenv
```

### Problema: "JWT_SECRET not defined"

**Solución:**
```bash
# Asegúrate de tener .env configurado
cp .env.example .env
# Edita .env y añade:
JWT_SECRET=tu-clave-secreta-aqui
```

### Problema: "Port 3000 already in use"

**Solución:**
```bash
# Cambiar puerto en .env
PORT=3001
```

O matar el proceso:
```bash
# Linux/Mac
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Problema: Tests fallan

**Solución:**
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install

# Verificar Jest config
cat jest.config.js
```

### Problema: "Database connection failed"

**Solución:**
```bash
# Verificar que la base de datos está corriendo
# PostgreSQL:
psql -U usuario -d broadcasttd

# Verificar DATABASE_URL en .env
cat .env | grep DATABASE_URL
```

---

## 📚 Recursos Adicionales

### Documentación
- [README Completo](README_BACKEND.md) - Documentación completa
- [API Documentation](docs/backend/openapi.yaml) - OpenAPI spec
- [Database Design](docs/design/DATABASE_DESIGN.md) - Diseño de BD
- [Implementation Guide](docs/backend/IMPLEMENTATION_GUIDE.md) - Guía técnica

### Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia servidor en modo desarrollo |
| `npm start` | Inicia servidor en producción |
| `npm test` | Ejecuta tests |
| `npm run test:watch` | Tests en modo watch |
| `npm run test:coverage` | Tests con coverage |
| `npm run build` | Compila TypeScript |
| `npm run lint` | Ejecuta linter |
| `npm run format` | Formatea código |

### Endpoints Importantes

| URL | Descripción |
|-----|-------------|
| `http://localhost:3000/health` | Health check |
| `http://localhost:3000/api/users/register` | Registro |
| `http://localhost:3000/api/users/login` | Login |
| `http://localhost:3000/api/series` | Lista de series |

---

## ✅ Checklist de Instalación

- [ ] Node.js >= 16 instalado
- [ ] Repositorio clonado
- [ ] Dependencias instaladas (`npm install`)
- [ ] Archivo `.env` configurado
- [ ] Base de datos configurada
- [ ] Servidor inicia correctamente (`npm run dev`)
- [ ] Health check funciona
- [ ] Tests pasan (`npm test`)
- [ ] Puedes registrar un usuario
- [ ] Puedes hacer login

---

## 🎉 ¡Listo!

Si todos los pasos funcionan, tu backend está correctamente instalado.

**Próximos pasos:**
1. Leer [README_BACKEND.md](README_BACKEND.md) para entender la arquitectura
2. Explorar [docs/backend/openapi.yaml](docs/backend/openapi.yaml) para ver todos los endpoints
3. Revisar [docs/design/DATABASE_DESIGN.md](docs/design/DATABASE_DESIGN.md) para entender el modelo de datos

**¿Dudas?** Consulta la documentación completa o abre un issue en GitHub.

---

**Made with ❤️ for IES Rafael Alberti**
