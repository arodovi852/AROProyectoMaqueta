Justificación DIW

# Arquitectura

## ¿Por qué has colocado tus variables en la capa Settings y tus estilos en Components? ¿Qué pasaría si importaras Components antes que Settings en el manifiesto?

Las variables tienen que ir en la capa Settings debido a la arquitectura Inverted Triangle (ITCSS). Esencialmente, como en un triángulo invertido donde la parte superior es la parte más amplia y que más abarca, la capa que esté por encima del resto es la que más contenido abarca (settings en este caso). Esto se hace de esta forma para permitir una sobreescritura sencilla sin que se solape nada ni hayan conflictos, porque si se va de menos específico a más específico el programa no se encuentra con problemas. 

Esto refleja también el por qué las variables van en la capa Settings: Las variables son la parte **más importante** del programa, por lo que tiene sentido que tengan prioridad sobre el resto.

En el caso de importar los Componentes antes que las Settings en el proyecto, los Componentes sobreescribirían el resto del proyecto, incluso por encima de los ajustes que se supone que es lo que más prioridad tiene.

# Metodología

## Explica una ventaja real que te haya aportado usar BEM en este examen frente a usar selectores de etiqueta anidados (ej: div > button).

BEM de por sí ya provee utilidad para la organización de los proyectos y el tiempo de cargo, pero en este caso lo más importante para este proyecto es su legibilidad: A la hora de tanto escribir como volver a leer el código de nuevo, es mucho más intuitivo escribirlo de esta forma que con selectores de etiquetas anidados, además de que los selectores de etiquetas anidados eventualmente se vuelven demasiado engorroson por su propia cuenta.


## Decisiones durante el proyecto:

La página de favoritos contiene lo siguiente:
- 
- Botón para "Ver contenido" (Series "favoritas", valores hardcodeados)
- El nuevo componente creado, que representa el texto adicional por debajo de la serie (nombre y descripción respectivamente)

Se han escogido tanto los componentes Cards ya existentes (más recurrente) como el nuevo componente creado para esta prueba en particular,

La estructura sigue las especificaciones determinadas o en otras palabras:

- Componente de 3 elementos
- Dentro deben de tener 2 cosas mínimo


## Dónde encontrarlo:

[Nuevas variables (añadidas línea 19, comentario)](../../src/styles/00-settings/_variables.scss)

[Nueva página (HTML)](../../src/app/pages/nuevapagina/nuevapagina.html)

[Nueva página (CSS)](../../src/app/pages/nuevapagina/nuevapagina.scss)

[Componente (HTML)](../../src/app/components/shared/componente-hijo/componente-hijo.html)

[Componente (CSS)](../../src/app/components/shared/componente-hijo/componente-hijo.scss)


## Otras anotaciones

Sé que el grid se puede hacer de forma que si estableces el min-width a distintas distancias puedes conseguir que el grid se divida en distintas columnas, el problema es que no he llegado a dar con la tecla de cómo hacerlo funcionar exactamente después de muchos intentos a lo largo del examen. Sin embargo, al menos utilicé el nuevo componente creado.

Además, no me ha llegado a dar tiempo a cambiar los estilos. Dejo registro de ello también por problemas de espacio y el vídeo (lo cual seguramente ya sepas a través de mi palabra o un correo)