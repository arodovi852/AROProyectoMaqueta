# Endpoint nuevo creado

Se ha creado el endpoint REST para favoritos, donde:

- El GET debe de obtener las series favoritas de los usuarios

- El POST en cambio añade una serie a favoritos

Esto es para que los usuarios puedan añadir series a favoritos y estas se guarden, pero estoy teniendo algunos problemas con el backend por el cómo fue estructurado el proyecto. 


Además, está dividido por capas, donde:

- El controlador recibe las peticiones HTTP y valida los headers para la seguridad

- El Servicio contiene la lógica de negocio

- El Repisotorio  accede a los datos en memoria y tiene las operaciones CRUD básicas

La seguridad además se implementó comparando el ID del usuario con la del Header, porque si no coinciden devolverá 403 Forbidden

# Comandos para probarlo, etc.

Añadir: curl -X POST http://localhost:8080/api/favoritos/user1/1 -H "X-User-Id: user1"

Obtener: curl http://localhost:8080/api/favoritos/user1 -H "X-User-Id: user1"


# Archivos en el programa:

[Servicio Nuevo](../../backend/src/main/java/com/aroproyecto/seriesapi/service/FavoritoService.java)

[Repositorio Nuevo](../../backend/src/main/java/com/aroproyecto/seriesapi/repository/FavoritoRepository.java)

[Controlador Nuevo](../../backend/src/main/java/com/aroproyecto/seriesapi/controller/FavoritoController.java)