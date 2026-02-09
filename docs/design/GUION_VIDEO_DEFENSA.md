# GUIÓN PARA VÍDEO DE DEFENSA TÉCNICA
## Duración objetivo: ~5 minutos

---

## 1. FLUJO MVP (0:00 - 0:45)
*[Con la consola del navegador abierta - F12]*

> "Voy a demostrar el flujo principal de BROADCASTTD, una aplicación de seguimiento de series."

> "Lo primero que vemos es el componente **Header**, que contiene el logo de la aplicación, un **ThemeToggle** para cambiar entre modo claro y oscuro, botones de navegación usando el componente **Button** con variantes primary y ghost, y un campo de búsqueda con debounce."

> "En la sección principal tenemos un **Hero** con un carrusel de imágenes y un botón **Button secondary** de 'Get started'."

> "Debajo están las secciones de series 'Popular this week' y 'Future releases', donde cada serie se muestra mediante el componente **Card** con variante media. Al hacer hover sobre las tarjetas, se puede ver el título de la serie."

> "Si navego a una serie específica, entro a la página **series-info** que muestra el componente **Card** con la imagen, **CardStatReview** con estadísticas y el componente **CardReview** para las reseñas de usuarios."

> "Al cambiar el tema con el **ThemeToggle**, se aprecia cómo todos los colores cambian gracias al uso de variables CSS nativas."

---

## 2. ARQUITECTURA SASS - ITCSS (0:45 - 1:45)

> "Abro ahora mi archivo **styles.scss** donde implemento la arquitectura ITCSS - Inverted Triangle CSS."

> "Como se ve en los comentarios, tengo 7 capas organizadas de menor a mayor especificidad:"

> "Primero **00-settings** con variables y design tokens. Luego **01-tools** con mixins y funciones. Después **02-generic** para el reset CSS. Seguido de **03-elements** con estilos base de elementos HTML. **04-objects** para patrones de layout. **05-components** para componentes específicos. Y finalmente **06-utilities** para clases de utilidad."

> "Esta estructura es crucial porque evita problemas de especificidad: los estilos genéricos nunca sobrescriben los específicos porque están ordenados de menor a mayor especificidad."

**[Abrir _mixins.scss]**

> "Ahora voy a mostrar un mixin propio: el mixin **responsive**."

> "Este mixin recibe un nombre de breakpoint como parámetro, y utiliza la función **map.get** de Sass para obtener el valor del mapa **$breakpoints** definido en variables."

> "Si el breakpoint existe, genera una media query de min-width con ese valor. Si no existe, muestra un warning con los breakpoints disponibles."

> "Lo invoco en los componentes así: **@include responsive('md')** y dentro defino los estilos para tablet. Esto me permite escribir código más limpio y mantenible, centralizando todos los valores de breakpoints en un solo lugar."

---

## 3. BEM (1:45 - 2:45)

> "Voy a mi componente más complejo: el **Header**."

**[Abrir header.scss]**

> "Aquí aplico BEM - Block Element Modifier de forma consistente."

> "El bloque es **.header**. Los elementos usan doble guion bajo: **.header__container**, **.header__brand**, **.header__logo**, **.header__actions**, **.header__search**."

> "Los modificadores usan doble guion: **.header__toggle--active** para el estado activo del menú hamburguesa, **.header__mobile-btn--login** y **.header__mobile-btn--logout** para las variantes de botones móviles."

> "Evito el anidamiento profundo de selectores por varias razones importantes:"

> "Primera: **mayor especificidad innecesaria**. Si anido `.header .header__container .header__search .header__search-input`, obtengo una especificidad muy alta que luego es difícil de sobrescribir."

> "Segunda: **mejor rendimiento**. Los selectores planos como `.header__search-input` son más rápidos de procesar para el navegador que los selectores anidados."

> "Tercera: **facilita la reutilización**. Con BEM cada clase es única y autodescriptiva, puedo mover un elemento sin romper estilos."

> "Cuarta: **legibilidad del código**. Cada selector dice exactamente qué es sin necesidad de ver la estructura HTML."

---

## 4. LÓGICA CSS (2:45 - 4:00)

### 4.1 Temas (2:45 - 3:20)

**[Abrir _variables.scss]**

> "Aquí defino las variables del modo oscuro y modo claro."

> "En **:root** tengo todas las variables CSS nativas para el modo claro: colores primarios morados, secundarios amarillos, colores de texto, fondos, botones, etc."

> "Más abajo, en la clase **.dark-mode**, redefinimos esas mismas variables con los valores del modo oscuro: fondos morados, acentos amarillos, textos claros."

> "¿Por qué uso variables CSS nativas en lugar de variables SASS? Por tres razones fundamentales:"

> "Primera: **pueden cambiar en tiempo de ejecución**. Las variables SASS se compilan a valores estáticos, mientras que las CSS custom properties permiten cambios dinámicos sin recompilar."

> "Segunda: **herencia en cascada**. Al añadir la clase `.dark-mode` al body, todas las variables se actualizan automáticamente en toda la aplicación."

> "Tercera: **mejor rendimiento**. El navegador solo recalcula los estilos afectados, no toda la hoja de estilos."

### 4.2 Responsive - Container Queries (3:20 - 4:00)

**[Abrir main.scss - línea ~310]**

> "Aquí implemento Container Queries para la sección de series."

> "Defino el contenedor con **container-type: inline-size** y **container-name: series-section**."

> "Luego uso **@container series-section** con diferentes anchos para adaptar el grid."

> "La ventaja frente a Media Queries tradicionales es que Container Queries responden al tamaño del **contenedor padre**, no del viewport."

> "Esto es ideal para componentes reutilizables: si pongo esta sección de series en un sidebar estrecho, las cards se adaptarán al espacio disponible, no al tamaño de la pantalla."

> "Con Media Queries tendría que conocer dónde se usará el componente, pero con Container Queries es verdaderamente modular y portable."

---

## 5. OPTIMIZACIÓN DE IMÁGENES (4:00 - 4:45)

**[Abrir DevTools > Network > Img o inspeccionar elemento de imagen]**

> "Voy a inspeccionar una imagen para demostrar la optimización."

> "Uso el componente **ResponsiveBanner** que implementa el elemento **picture** con **srcset**."

> "En el HTML tengo un **picture** con dos **source**: uno para WebP y otro como fallback al formato original."

> "Cada source tiene un **srcset** con 4 tamaños: small 400w, medium 800w, large 1200w, xlarge 1920w."

**[En Network, filtrar por imágenes]**

> "Como se puede ver en la pestaña Network, el navegador está cargando la versión **WebP** que pesa significativamente menos que el JPG original."

> "Además, según el tamaño del viewport, carga el tamaño apropiado: en móvil cargará small, en desktop large o xlarge."

> "Las imágenes optimizadas están en la carpeta **/assets/optimized** y se generaron con un script que crea automáticamente los 4 tamaños en WebP y formato original."

> "Esta estrategia reduce drásticamente el tiempo de carga, especialmente en conexiones lentas y dispositivos móviles."

---

## CIERRE (4:45 - 5:00)

> "En resumen: ITCSS para arquitectura SASS escalable, BEM para nomenclatura clara sin anidamiento excesivo, variables CSS nativas para temas dinámicos, Container Queries para componentes verdaderamente responsive, y optimización de imágenes con picture y srcset."

> "Gracias."

---

*Nota: Este guión está diseñado para ~5 minutos. Practica para ajustar el ritmo según necesites.*
