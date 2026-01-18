# BROADCASTTD - Track Series. Rate Them. See What's Good.

## 📺 Descripción

**BROADCASTTD** es una aplicación web moderna para el seguimiento y valoración de series de televisión. Inspirada en plataformas como Letterboxd y Trakt, permite a los usuarios:

- 🎬 Explorar series populares y próximos estrenos
- ⭐ Valorar y reseñar series
- 📋 Crear y gestionar listas personalizadas
- 👤 Gestionar perfiles de usuario
- 🌙 Alternar entre modo claro y oscuro

## 🌐 URL de Producción

> **URL de la aplicación desplegada:** [Pendiente de despliegue]

## 🛠️ Tecnologías Utilizadas

- **Framework:** Angular 19
- **Lenguaje:** TypeScript
- **Estilos:** SCSS con arquitectura ITCSS
- **Metodología CSS:** BEM (Block Element Modifier)
- **Gestión de Estado:** Signals de Angular + RxJS
- **Testing:** Jasmine + Karma

## ✨ Características Principales

### Diseño (DIW)
- ✅ Sistema de diseño completo con CSS Custom Properties
- ✅ Responsive design (mobile-first) para todos los viewports
- ✅ Container Queries en componentes clave
- ✅ Sistema de temas (claro/oscuro) con persistencia
- ✅ Animaciones CSS optimizadas (transform/opacity)
- ✅ Imágenes optimizadas con srcset y loading lazy

### Funcionalidad (DWEC)
- ✅ Navegación SPA con Angular Router
- ✅ Formularios reactivos con validación avanzada
- ✅ Consumo de APIs con HttpClient
- ✅ Estados de carga y error
- ✅ Comunicación entre componentes con servicios
- ✅ Autenticación y guards de rutas

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── components/        # Componentes reutilizables
│   │   ├── layout/        # Header, Footer
│   │   └── shared/        # Buttons, Cards, Forms...
│   ├── core/              # Guards, Interceptors, Resolvers
│   ├── pages/             # Páginas de la aplicación
│   ├── services/          # Servicios de la aplicación
│   └── validators/        # Validadores personalizados
├── styles/                # Estilos globales (ITCSS)
│   ├── 00-settings/       # Variables y tokens
│   ├── 01-tools/          # Mixins y funciones
│   ├── 02-generic/        # Reset
│   ├── 03-elements/       # Estilos base
│   ├── 04-objects/        # Layout y grid
│   ├── 05-components/     # Componentes
│   └── 06-utilities/      # Helpers y animaciones
└── assets/                # Imágenes y recursos
```

## 🚀 Instalación Local

### Requisitos Previos
- Node.js 18.19.0 o superior
- npm 9.0.0 o superior

### Pasos de Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/arodovi852/AROProyectoMaqueta.git

# 2. Navegar al directorio
cd AROProyectoMaqueta

# 3. Instalar dependencias
npm install

# 4. Iniciar servidor de desarrollo
npm start
```

La aplicación estará disponible en `http://localhost:4200`

### Comandos Disponibles

```bash
npm start          # Iniciar servidor de desarrollo
npm run build      # Build de producción
npm test           # Ejecutar tests
npm run lint       # Ejecutar linter
```

## 📱 Breakpoints Responsive

| Viewport | Tamaño | Descripción |
|----------|--------|-------------|
| XS | 320px | Mobile pequeño |
| SM | 375px | Mobile estándar |
| MD | 768px | Tablet |
| LG | 1024px | Desktop pequeño |
| XL | 1280px | Desktop estándar |

## 📚 Documentación

- [Documentación de Diseño](./docs/design/DOCUMENTACION.md)
- [Documentación de Clientes](./docs/design/DOCUMENTACION_CLIENTES.md)
- [Guía de Despliegue](./DEPLOYMENT_GUIDE.md)

## 📝 Licencia

Este proyecto fue creado con fines educativos.

---

**Autor:** Alberto Rodríguez  
**Curso:** DAW 2024-2025
