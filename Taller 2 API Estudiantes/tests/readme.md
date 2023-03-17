# API REST CRUD - Pruebas Unitarias con Chai y Sinon
Este proyecto contiene pruebas unitarias para un API REST CRUD que utiliza MongoDB como base de datos. Las pruebas se realizaron utilizando los paquetes chai, chai-http y sinon.

## Dependencias
Para poder ejecutar las pruebas es necesario tener instalados los siguientes paquetes de npm:
```javascript
chai
chai-http
sinon
```
## Ejecución de las pruebas
Para ejecutar las pruebas se debe correr el comando npm test en la terminal. El archivo test.js se encuentra en la carpeta tests.

## Pruebas realizadas
Se realizaron las siguientes pruebas unitarias:

### GET ```/estudiantes:``` se prueba que se obtengan todos los estudiantes registrados en la base de datos. Se utiliza sinon para simular la respuesta de la base de datos.
### GET ```/estudiantes/:id:```se prueba que se obtenga un estudiante específico por su ID. Se crea un estudiante de prueba y se utiliza sinon para simular la respuesta de la base de datos.
### POST ```/estudiantes: ```se prueba que se cree un nuevo estudiante. Se utiliza sinon para simular la respuesta de la base de datos.
### PUT ```/estudiantes/:id:``` se prueba que se actualice un estudiante existente. Se crea un estudiante de prueba y se utiliza sinon para simular la respuesta de la base de datos.
### DELETE ```/estudiantes/:id:``` se prueba que se elimine un estudiante existente. Se crea un estudiante de prueba y se utiliza sinon para simular la respuesta de la base de datos.
En cada prueba se verifica que se reciba la respuesta esperada y que la estructura de los datos sea la adecuada.
