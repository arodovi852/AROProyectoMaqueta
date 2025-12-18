# 🐳 Guía de Despliegue con Docker

Esta guía explica cómo dockerizar y desplegar automáticamente el proyecto AROProyectoMaqueta.

## 📋 Tabla de Contenidos

- [Arquitectura Docker](#arquitectura-docker)
- [Requisitos Previos](#requisitos-previos)
- [Desarrollo Local](#desarrollo-local)
- [Despliegue en Producción](#despliegue-en-producción)
- [CI/CD Automático](#cicd-automático)
- [Comandos Útiles](#comandos-útiles)
- [Troubleshooting](#troubleshooting)

## 🏗️ Arquitectura Docker

Este proyecto utiliza **Docker Compose con archivos de configuración múltiples** para separar ambientes:

### Estructura de Archivos

```
├── Dockerfile              # Build de producción (multi-stage con nginx)
├── Dockerfile.dev          # Build de desarrollo (con hot reload)
├── docker-compose.yml      # Configuración base común
├── docker-compose.dev.yml  # Configuración específica de desarrollo
└── docker-compose.prod.yml # Configuración específica de producción
```

### Diferencias por Ambiente

| Característica | Desarrollo | Producción |
|---------------|------------|------------|
| **Dockerfile** | `Dockerfile.dev` | `Dockerfile` |
| **Puerto** | 4200 | 8080 |
| **Hot Reload** | ✅ Sí | ❌ No |
| **Volúmenes** | ✅ Código montado | ❌ Build en imagen |
| **Optimización** | ❌ No | ✅ Build + minify |
| **Servidor** | Angular Dev Server | Nginx |
| **Health Checks** | ❌ No | ✅ Sí |
| **Logs** | Stdout | Rotación automática |

### Cómo Usar los Archivos

```bash
# Desarrollo: usa base + dev
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# Producción: usa base + prod
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
```

## 🔧 Requisitos Previos

### Software Necesario

- [Docker](https://docs.docker.com/get-docker/) (versión 20.10 o superior)
- [Docker Compose](https://docs.docker.com/compose/install/) (versión 2.0 o superior)
- Git

### Verificar Instalación

```bash
docker --version
docker-compose --version
```

## 💻 Desarrollo Local

### 1. Clonar el Repositorio

```bash
git clone https://github.com/arodovi852/AROProyectoMaqueta.git
cd AROProyectoMaqueta
```

### 2. Modo Desarrollo (con Hot Reload)

El modo desarrollo incluye:
- ✅ Hot reload automático al guardar cambios
- ✅ Source maps para debugging
- ✅ Volúmenes montados para edición en tiempo real
- ✅ Puerto 4200 (estándar de Angular)

```bash
# Construir y levantar en modo desarrollo
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

# Ver logs en tiempo real
docker-compose -f docker-compose.yml -f docker-compose.dev.yml logs -f

# Acceder a la aplicación
# http://localhost:4200
```

### 3. Modo Producción (Local)

El modo producción incluye:
- ✅ Build optimizado y minificado
- ✅ Servidor nginx con compresión gzip
- ✅ Health checks automáticos
- ✅ Puerto 8080

```bash
# Construir y levantar en modo producción
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Ver logs
docker-compose -f docker-compose.yml -f docker-compose.prod.yml logs -f

# Acceder a la aplicación
# http://localhost:8080
```

### 4. Detener la Aplicación

```bash
# Detener modo desarrollo
docker-compose -f docker-compose.yml -f docker-compose.dev.yml down

# Detener modo producción
docker-compose -f docker-compose.yml -f docker-compose.prod.yml down

# Detener y eliminar volúmenes
docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v
```

## 🚀 Despliegue en Producción

### Opción 1: Servidor Propio

#### Paso 1: Preparar el Servidor

```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Añadir usuario al grupo docker
sudo usermod -aG docker $USER
```

#### Paso 2: Clonar y Desplegar

```bash
# Crear directorio
sudo mkdir -p /opt/aroproyecto
cd /opt/aroproyecto

# Clonar repositorio
git clone https://github.com/arodovi852/AROProyectoMaqueta.git .

# Desplegar en modo producción
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

#### Paso 3: Configurar Nginx Reverse Proxy (Opcional)

```bash
# Instalar Nginx
sudo apt install nginx -y

# Crear configuración
sudo nano /etc/nginx/sites-available/aroproyecto
```

Añade esta configuración:

```nginx
server {
    listen 80;
    server_name tudominio.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Activar sitio
sudo ln -s /etc/nginx/sites-available/aroproyecto /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### Paso 4: SSL con Let's Encrypt (Opcional)

```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtener certificado
sudo certbot --nginx -d tudominio.com
```

### Opción 2: Docker Hub

#### Construir y Subir Imagen

```bash
# Login en Docker Hub
docker login

# Construir imagen
docker build -t tuusuario/aroproyecto-maqueta:latest .

# Subir imagen
docker push tuusuario/aroproyecto-maqueta:latest
```

#### Usar Imagen Publicada

Modifica `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  web:
    image: tuusuario/aroproyecto-maqueta:latest
    # Comenta la sección build:
    # build:
    #   context: .
    #   dockerfile: Dockerfile
```

Luego despliega:

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## 🔄 CI/CD Automático

### Configuración de GitHub Actions

El proyecto incluye un workflow de GitHub Actions que:

1. ✅ Construye la imagen Docker automáticamente
2. ✅ La sube a Docker Hub
3. ✅ Despliega en el servidor de producción

### Configurar Secrets en GitHub

Ve a tu repositorio → Settings → Secrets and variables → Actions y añade:

#### Para Docker Hub:

| Secret | Descripción |
|--------|-------------|
| `DOCKER_USERNAME` | Tu usuario de Docker Hub |
| `DOCKER_PASSWORD` | Tu token de acceso de Docker Hub |

#### Para Despliegue Automático:

| Secret | Descripción |
|--------|-------------|
| `SERVER_HOST` | IP o dominio de tu servidor |
| `SERVER_USER` | Usuario SSH del servidor |
| `SERVER_SSH_KEY` | Clave privada SSH (sin passphrase) |

### Generar Clave SSH

```bash
# En tu máquina local
ssh-keygen -t ed25519 -C "deploy@aroproyecto" -f ~/.ssh/aroproyecto_deploy

# Copiar clave pública al servidor
ssh-copy-id -i ~/.ssh/aroproyecto_deploy.pub usuario@servidor

# Copiar clave privada (todo el contenido)
cat ~/.ssh/aroproyecto_deploy
# Pega esto en GitHub Secret SERVER_SSH_KEY
```

### Cómo Funciona

1. **Push a main o clientes-fase-3** → Activa el workflow
2. **Build** → Construye la imagen Docker
3. **Push** → Sube la imagen a Docker Hub
4. **Deploy** → Se conecta al servidor vía SSH y actualiza los contenedores

### Ver Estado del Deployment

Ve a tu repositorio → Actions para ver el progreso.

## 🛠️ Comandos Útiles

### Docker Compose - Desarrollo

```bash
# Alias para comandos más cortos
alias dc-dev='docker-compose -f docker-compose.yml -f docker-compose.dev.yml'

# Ver estado de contenedores
dc-dev ps

# Ver logs en tiempo real
dc-dev logs -f

# Reiniciar servicios
dc-dev restart

# Reconstruir sin caché
dc-dev build --no-cache

# Entrar al contenedor
dc-dev exec web sh

# Ver uso de recursos
docker stats
```

### Docker Compose - Producción

```bash
# Alias para comandos más cortos
alias dc-prod='docker-compose -f docker-compose.yml -f docker-compose.prod.yml'

# Ver estado de contenedores
dc-prod ps

# Ver logs en tiempo real
dc-prod logs -f

# Reiniciar servicios
dc-prod restart

# Reconstruir sin caché
dc-prod build --no-cache

# Ver uso de recursos
docker stats
```

### Docker

```bash
# Listar contenedores
docker ps -a

# Entrar al contenedor
docker exec -it aroproyecto-web sh

# Ver logs del contenedor
docker logs aroproyecto-web

# Limpiar imágenes no usadas
docker image prune -a

# Limpiar todo
docker system prune -a --volumes
```

### Actualización Manual

```bash
# En el servidor (producción)
cd /opt/aroproyecto
git pull
docker-compose -f docker-compose.yml -f docker-compose.prod.yml down
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build

# En desarrollo local
cd /ruta/al/proyecto
git pull
docker-compose -f docker-compose.yml -f docker-compose.dev.yml down
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
```

## 🔍 Troubleshooting

### La aplicación no arranca

```bash
# Verificar logs (desarrollo)
docker-compose -f docker-compose.yml -f docker-compose.dev.yml logs web

# Verificar logs (producción)
docker-compose -f docker-compose.yml -f docker-compose.prod.yml logs web

# Verificar que el puerto no esté ocupado
# Desarrollo: puerto 4200
sudo netstat -tulpn | grep 4200

# Producción: puerto 8080
sudo netstat -tulpn | grep 8080

# Reiniciar contenedores
docker-compose -f docker-compose.yml -f docker-compose.dev.yml restart
```

### Error al construir la imagen

```bash
# Limpiar cache de Docker
docker builder prune -a

# Construir sin cache
docker-compose build --no-cache
```

### Error de permisos

```bash
# Añadir usuario al grupo docker
sudo usermod -aG docker $USER

# Reiniciar sesiónel archivo correspondiente:

**Para desarrollo** (`docker-compose.dev.yml`):
```yaml
ports:
  - "3000:4200"  # Usar puerto 3000 en lugar de 4200
```

**Para producción** (`docker-compose.prod.yml`):logout
```

### Puerto ya en uso

Cambia el puerto en `docker-compose.yml`:

```yaml
ports:
  - "3000:80"  # Usar puerto 3000 en lugar de 8080
```

### Problemas con GitHub Actions

1. Verifica qude **producción** incluye un endpoint de salud:

```bash
# Desde el host
curl http://localhost:8080/health

# Desde Docker
docker-compose -f docker-compose.yml -f docker-compose.prod.yml exec web wget -qO- http://localhost/health
```

**Nota:** El modo desarrollo no incluye health checks ya que usa el servidor de desarrollo de Angular.
```bash
# Desde el host
curl http://localhost:8080/health

# Desde Docker
docker-compose exec web wget -qO- http://localhost/health
```

## 🔐 Seguridad

### Recomendaciones

1. **Firewall**: Abre solo los puertos necesarios
   ```bash
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw allow 22/tcp
   sudo ufw enable
   ```

2. **SSH**: Deshabilita autenticación por contraseña
   ```bash
   # En /etc/ssh/sshd_config
   PasswordAuthentication no
   PubkeyAuthentication yes
   ```

3. **Docker**: Mantén Docker actualizado
   ```bash
   sudo apt update && sudo apt upgrade docker-ce
   ```

4. **SSL**: Usa siempre HTTPS en producción con Let's Encrypt

## 📈 Monitoreo

### Ver Métricas

### Desarrollo
- Puerto **4200** (estándar de Angular)
- Hot reload automático al guardar archivos
- Source maps habilitados para debugging
- Volúmenes montados: cambios reflejados instantáneamente

### Producción
- Puerto **8080** por defecto
- Servidor **nginx alpine** para tamaño mínimo
- Build multi-stage para optimizar el tamaño final
- Compresión gzip automática
- Assets estáticos con cache de 1 año
- Health checks cada 30 segundos
- Logs con rotación automática (máx 10MB x 3 archivos)

### Tips de Rendimiento
- En desarrollo, `--poll 2000` detecta cambios en filesystems con limitaciones
- Los volúmenes excluyen `node_modules` para evitar conflictos
- El build de producción elimina devDependencies
docker-compose logs -f --tail=100
```

### Alertas por Email (Opcional)

Instala un monitor como [Watchtower](https://containrrr.dev/watchtower/):

```bash
docker run -d \
  --name watchtower \
  -v /var/run/docker.sock:/var/run/docker.sock \
  containrrr/watchtower \
  --interval 300
```

## 🎯 Mejores Prácticas

1. ✅ Usa siempre tags específicos en producción
2. ✅ Revisa los logs regularmente
3. ✅ Haz backups de tu configuración
4. ✅ Prueba actualizaciones en entorno de desarrollo primero
5. ✅ Mantén Docker y Docker Compose actualizados
6. ✅ Usa variables de entorno para configuración sensible
7. ✅ Implementa logs centralizados si tienes múltiples servicios

## 📞 Soporte

Si encuentras problemas:

1. Revisa la sección [Troubleshooting](#troubleshooting)
2. Consulta los logs: `docker-compose logs`
3. Abre un issue en GitHub con los detalles del error

## 📝 Notas Adicionales

- La aplicación corre en el puerto **8080** por defecto
- El contenedor usa **nginx alpine** para un tamaño mínimo
- El build es multi-stage para optimizar el tamaño final
- Se incluye compresión gzip para mejor rendimiento
- Los assets estáticos tienen cache de 1 año

---

**¡Listo! Tu aplicación Angular ahora está completamente dockerizada y con despliegue automático.** 🎉
