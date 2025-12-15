@echo off
REM ======================================
REM BROADCASTTD Backend - Setup Script (Windows)
REM ======================================

echo.
echo ========================================
echo   BROADCASTTD Backend Setup (Windows)
echo ========================================
echo.

REM Verificar Node.js
echo [INFO] Verificando Node.js...
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js no esta instalado. Por favor, instala Node.js ^>= 16.x
    echo Descarga desde: https://nodejs.org/
    pause
    exit /b 1
)
echo [OK] Node.js detectado: 
node -v
echo.

REM Verificar npm
echo [INFO] Verificando npm...
where npm >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm no esta instalado
    pause
    exit /b 1
)
echo [OK] npm detectado:
npm -v
echo.

REM Instalar dependencias
echo [INFO] Instalando dependencias...
if exist "backend-package.json" (
    copy /Y backend-package.json package.json >nul
    echo [OK] package.json configurado
)

call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Error al instalar dependencias
    pause
    exit /b 1
)
echo [OK] Dependencias instaladas correctamente
echo.

REM Crear archivo .env
echo [INFO] Configurando variables de entorno...
if not exist ".env" (
    if exist ".env.example" (
        copy .env.example .env >nul
        echo [OK] Archivo .env creado desde .env.example
        echo [WARNING] IMPORTANTE: Edita el archivo .env y configura las variables necesarias
        echo            Especialmente: JWT_SECRET y DATABASE_URL
    ) else (
        echo [ERROR] .env.example no encontrado
    )
) else (
    echo [OK] Archivo .env ya existe
)
echo.

REM Crear directorios necesarios
echo [INFO] Creando estructura de directorios...
if not exist "src\backend" mkdir src\backend
if not exist "src\backend\models" mkdir src\backend\models
if not exist "src\backend\dtos" mkdir src\backend\dtos
if not exist "src\backend\repositories" mkdir src\backend\repositories
if not exist "src\backend\services" mkdir src\backend\services
if not exist "src\backend\controllers" mkdir src\backend\controllers
if not exist "src\backend\middleware" mkdir src\backend\middleware
if not exist "src\backend\utils" mkdir src\backend\utils
if not exist "src\backend\routes" mkdir src\backend\routes
if not exist "src\backend\tests" mkdir src\backend\tests
if not exist "docs\backend" mkdir docs\backend
if not exist "logs" mkdir logs
echo [OK] Directorios creados
echo.

REM Verificar TypeScript
echo [INFO] Verificando TypeScript...
call npm list typescript >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] TypeScript no encontrado, instalando...
    call npm install --save-dev typescript
) else (
    echo [OK] TypeScript instalado
)
echo.

REM Verificar Jest
echo [INFO] Verificando Jest...
call npm list jest >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] Jest no encontrado, instalando...
    call npm install --save-dev jest @types/jest ts-jest
) else (
    echo [OK] Jest instalado
)
echo.

REM Resumen
echo ========================================
echo   Setup completado exitosamente!
echo ========================================
echo.
echo Proximos pasos:
echo.
echo 1. Configurar variables de entorno:
echo    notepad .env
echo.
echo 2. Configurar base de datos (si usas Prisma):
echo    npx prisma init
echo    npx prisma migrate dev
echo.
echo 3. Iniciar el servidor en modo desarrollo:
echo    npm run dev
echo.
echo 4. Ejecutar tests:
echo    npm test
echo.
echo 5. Compilar para produccion:
echo    npm run build
echo    npm start
echo.
echo Documentacion:
echo - README: README_BACKEND.md
echo - API Docs: docs\backend\openapi.yaml
echo - Database Design: docs\design\DATABASE_DESIGN.md
echo.
echo Listo para desarrollar! 
echo.
pause
