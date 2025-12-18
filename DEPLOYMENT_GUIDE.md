# 🌐 Guía de Despliegue Público

Esta guía explica cómo desplegar el proyecto para que sea accesible públicamente mediante un enlace web, con actualización automática en cada commit.

## 📋 Opciones de Despliegue

| Plataforma | Gratis | Auto-Deploy | HTTPS | CDN | Dificultad |
|------------|--------|-------------|-------|-----|------------|
| **Vercel** | ✅ Sí | ✅ Sí | ✅ Sí | ✅ Sí | ⭐ Muy Fácil |
| **Netlify** | ✅ Sí | ✅ Sí | ✅ Sí | ✅ Sí | ⭐ Muy Fácil |
| **GitHub Pages** | ✅ Sí | ✅ Sí | ✅ Sí | ✅ Sí | ⭐⭐ Fácil |
| **Railway** | 💰 Limitado | ✅ Sí | ✅ Sí | ✅ Sí | ⭐⭐ Fácil |
| **Servidor Propio** | 💰 Costo servidor | ✅ Sí | ⚙️ Manual | ❌ No | ⭐⭐⭐ Avanzado |

## 🚀 Opción 1: Vercel (Recomendado)

**Ventajas:**
- ✅ Gratis para proyectos públicos
- ✅ Deploy automático en cada push
- ✅ URL personalizada: `tu-proyecto.vercel.app`
- ✅ CDN global ultra-rápido
- ✅ Zero configuration

### Pasos de Configuración

#### 1. Crear Cuenta en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en "Sign Up"
3. Inicia sesión con tu cuenta de GitHub

#### 2. Importar Repositorio

1. En el dashboard de Vercel, haz clic en "Add New..." → "Project"
2. Selecciona "Import Git Repository"
3. Busca y selecciona `arodovi852/AROProyectoMaqueta`
4. Haz clic en "Import"

#### 3. Configurar el Proyecto

Vercel detectará automáticamente que es un proyecto Angular. Verifica estos ajustes:

```
Framework Preset: Other
Build Command: npm run build:prod
Output Directory: dist/aroproyecto-maqueta/browser
Install Command: npm install
```

#### 4. Desplegar

1. Haz clic en "Deploy"
2. Espera unos 2-3 minutos
3. ¡Listo! Tu aplicación estará en: `https://aroproyecto-maqueta.vercel.app`

#### 5. Configuración Automática

Cada vez que hagas push a `main` o `clientes-fase-3`, Vercel:
1. Detecta el cambio automáticamente
2. Construye el proyecto
3. Despliega la nueva versión
4. Te notifica cuando está listo

### URLs Generadas

- **Producción (main):** `https://aroproyecto-maqueta.vercel.app`
- **Preview (otras ramas):** `https://aroproyecto-maqueta-git-rama.vercel.app`
- **Por commit:** URL única para cada commit

### Configuración Avanzada

El archivo `vercel.json` ya está incluido con:
- Routing para SPA de Angular
- Cache de assets estáticos (1 año)
- Headers optimizados

## 🟦 Opción 2: Netlify

**Ventajas similares a Vercel:**
- ✅ Gratis para proyectos públicos
- ✅ Deploy automático
- ✅ URL personalizada: `tu-proyecto.netlify.app`

### Pasos de Configuración

#### 1. Crear Cuenta en Netlify

1. Ve a [netlify.com](https://netlify.com)
2. Haz clic en "Sign Up"
3. Inicia sesión con tu cuenta de GitHub

#### 2. Importar Repositorio

1. En el dashboard, haz clic en "Add new site" → "Import an existing project"
2. Selecciona "GitHub"
3. Busca y selecciona `arodovi852/AROProyectoMaqueta`
4. Autoriza el acceso si es necesario

#### 3. Configurar Build Settings

```
Branch to deploy: main
Build command: npm run build:prod
Publish directory: dist/aroproyecto-maqueta/browser
```

#### 4. Desplegar

1. Haz clic en "Deploy site"
2. Espera 2-3 minutos
3. Tu app estará en: `https://tu-proyecto.netlify.app`

#### 5. Personalizar URL

1. Ve a "Site settings" → "Change site name"
2. Elige un nombre único: `aroproyecto-maqueta`
3. Tu URL será: `https://aroproyecto-maqueta.netlify.app`

### Configuración Automática

El archivo `netlify.toml` ya está incluido con toda la configuración necesaria.

## 📄 Opción 3: GitHub Pages

**Ventajas:**
- ✅ Completamente gratis
- ✅ Integrado con GitHub
- ✅ URL: `https://arodovi852.github.io/AROProyectoMaqueta`

### Pasos de Configuración

#### 1. Habilitar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Settings → Pages
3. En "Source", selecciona "GitHub Actions"

#### 2. Workflow Ya Configurado

El proyecto incluye `.github/workflows/github-pages.yml` que:
- Se ejecuta automáticamente en cada push a `main`
- Construye el proyecto
- Despliega a GitHub Pages

#### 3. Primer Deploy

1. Haz push de cualquier cambio a `main`
2. Ve a la pestaña "Actions" para ver el progreso
3. Una vez completado, tu app estará en:
   ```
   https://arodovi852.github.io/AROProyectoMaqueta
   ```

#### 4. Configuración Base Path (Importante)

Si usas GitHub Pages en un repositorio de proyecto (no de usuario), necesitas configurar la base path:

Edita `angular.json`:

```json
"production": {
  "baseHref": "/AROProyectoMaqueta/",
  "deployUrl": "/AROProyectoMaqueta/",
  "budgets": [...]
}
```

O modifica el script en `package.json`:

```json
"build:prod": "ng build --configuration production --base-href=/AROProyectoMaqueta/"
```

### Limitaciones

- GitHub Pages no soporta server-side rendering (SSR)
- Puede tardar unos minutos más que Vercel/Netlify

## 🚂 Opción 4: Railway

**Ideal si necesitas:**
- Base de datos
- Backend API
- Variables de entorno secretas

### Pasos Rápidos

1. Ve a [railway.app](https://railway.app)
2. Inicia sesión con GitHub
3. "New Project" → "Deploy from GitHub repo"
4. Selecciona tu repositorio
5. Railway detecta automáticamente el Dockerfile
6. Despliega y obtén tu URL: `https://tu-proyecto.up.railway.app`

**Limitación:** 500 horas gratis/mes (suficiente para demos)

## 🏠 Opción 5: Servidor Propio con Docker

Si ya tienes un servidor (VPS, EC2, DigitalOcean, etc.), usa la [Guía Docker](./DOCKER_GUIDE.md) completa.

### Resumen Rápido

```bash
# En tu servidor
git clone https://github.com/arodovi852/AROProyectoMaqueta.git
cd AROProyectoMaqueta
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Configurar dominio
# Instalar nginx reverse proxy
# Configurar SSL con Let's Encrypt
```

## 📊 Comparativa Detallada

### Performance

| Plataforma | Build Time | First Load | CDN Locations |
|------------|------------|------------|---------------|
| Vercel | ~2-3 min | Ultra rápido | 100+ ubicaciones |
| Netlify | ~2-3 min | Muy rápido | 100+ ubicaciones |
| GitHub Pages | ~3-5 min | Rápido | GitHub CDN |
| Railway | ~4-6 min | Medio | Limitado |
| Servidor Propio | Manual | Variable | No (manual) |

### Costos

| Plataforma | Free Tier | Límites | Costo Adicional |
|------------|-----------|---------|-----------------|
| Vercel | ✅ Generoso | 100 GB bandwidth/mes | $20/mes Pro |
| Netlify | ✅ Generoso | 100 GB bandwidth/mes | $19/mes Pro |
| GitHub Pages | ✅ Ilimitado | Repo público | Gratis siempre |
| Railway | ⚠️ Limitado | 500 hrs/mes, $5 crédito | $5/mes mínimo |
| Servidor Propio | 💰 VPS | Depende del proveedor | $5-50/mes |

## 🎯 Recomendación por Caso de Uso

### Para Proyectos de Portfolio/Demo
**→ Vercel** o **Netlify**
- Setup más simple
- Mejor performance
- Dominio personalizado gratis

### Para Proyectos Open Source
**→ GitHub Pages**
- Completamente gratis
- Integración perfecta con GitHub
- Sin límites de bandwidth

### Para Proyectos con Backend
**→ Railway** o **Servidor Propio**
- Soporte para bases de datos
- Variables de entorno
- APIs custom

### Para Producción Real
**→ Vercel Pro** o **Servidor Propio**
- Mayor control
- Analytics avanzados
- Soporte

## 🔧 Configuración Post-Despliegue

### Dominio Personalizado

#### En Vercel/Netlify:
1. Ve a "Settings" → "Domains"
2. Añade tu dominio: `www.tudominio.com`
3. Configura los DNS en tu registrador:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com (o netlify)
   ```

#### En GitHub Pages:
1. Settings → Pages → Custom domain
2. Añade: `www.tudominio.com`
3. Configura DNS:
   ```
   Type: CNAME
   Name: www
   Value: arodovi852.github.io
   ```

### Variables de Entorno

En Vercel/Netlify:
1. Settings → Environment Variables
2. Añade las variables necesarias
3. Re-deploy automáticamente

### Monitoreo

- **Vercel:** Analytics incluido en el plan Pro
- **Netlify:** Analytics disponible ($9/mes)
- **GitHub Pages:** Usa Google Analytics
- **Railway:** Métricas básicas incluidas

## 🚨 Troubleshooting

### Error: "Página en blanco después del deploy"

**Solución:** Verifica la base path en producción.

Para Vercel/Netlify, en `angular.json`:
```json
"production": {
  "baseHref": "/",
  "deployUrl": "/"
}
```

Para GitHub Pages:
```json
"production": {
  "baseHref": "/AROProyectoMaqueta/",
  "deployUrl": "/AROProyectoMaqueta/"
}
```

### Error: "404 al refrescar la página"

**Solución:** Los archivos de configuración ya incluyen redirects para SPA:
- `vercel.json` → Configurado ✅
- `netlify.toml` → Configurado ✅
- GitHub Pages → Automático ✅

### Build Falla

1. Verifica que `npm run build:prod` funciona localmente
2. Revisa los logs del deployment
3. Asegúrate de que no hay errores TypeScript
4. Verifica las versiones de Node (usa Node 20)

## 📱 Prueba tu Deploy

Después de desplegar, verifica:

```bash
# Vercel
https://aroproyecto-maqueta.vercel.app

# Netlify
https://aroproyecto-maqueta.netlify.app

# GitHub Pages
https://arodovi852.github.io/AROProyectoMaqueta

# Railway
https://aroproyecto-maqueta.up.railway.app
```

## 🎉 ¡Listo!

Tu aplicación ahora está desplegada y accesible públicamente. Cada vez que hagas un commit a `main`, se actualizará automáticamente.

### URLs de Ejemplo

- **Demo en Vercel:** `https://aroproyecto-maqueta.vercel.app`
- **Demo en Netlify:** `https://aroproyecto-maqueta.netlify.app`
- **Demo en GitHub Pages:** `https://arodovi852.github.io/AROProyectoMaqueta`

### Próximos Pasos

1. ✅ Añade el link del deploy a tu README.md
2. ✅ Configura un dominio personalizado (opcional)
3. ✅ Añade analytics para ver el tráfico
4. ✅ Configura notificaciones de deploy en Discord/Slack

---

**¿Necesitas ayuda?** Consulta la documentación oficial:
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
