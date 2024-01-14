# Introduccion
Master en Desarrollo de Software
Asignatura: “Ingeniería WEB”
(Ingeniería Web. Una visión general IW)

Módulo 1. Ejercicio 2: Implementación de un ejemplo funcional de uso de tecnologías web.

## Descripción
Este codigo pertenece al módulo del backend de la aplicacion que se ha desarrollado para el ejercicio.

Consiste en un API basado en NodeJS. El API permite tener una coleccion de ClientId que es un objeto donde se almacena la aplicacion o el enlace que mostrara luego el frontend. Basicamente se compone de nombre, descripcion, URL e icono. El API permitirá un listado de objetos ClientID asi como su gestión: modificacion, creacion de nuevos elementos y borrado.

El API se enlaza con una base de datos MongoDB. Se ha creado un Docker semilla para popular la base de datos con algunos datos basicos

Con el siguiente comando levantamos los dockers trayendolo directamente desde DockerHub cada uno de los modulos (mongo y backend)

    docker-compose -f "docker-compose.yml" up -d --build 

Con el siguiente comando levantamos los dockers trayendolo directamente desde DockerHub los modulos de mongo, pero ejecutando el codigo del backend en local

    docker-compose -f "docker-composeDockerfileLocal.yml" up -d --build 

Una vez levantado, se puede probar con POSTMAN o simplemente con el navegador:

```
http://localhost:3030/version

http://localhost:3030/opoapi/admin

```

## Comandos utiles
### En local para montarlo y ejecutarlo 
npm install
npm run build:local
npm run start:local

### Crear el docker de backend
docker build --pull --rm -f "Dockerfile" -t iwejer2backend "." 

### Levantar el docker-compose
docker-compose up


DOCKER MONGO!!

He creado un docker mongo en el servidor pero con un volumen persistente

docker volume create mongo_data

docker run -d -v mongo_data:/data/db -p 27017:27017 --name my_mongo mongo

Para acceder: mongodbConnectionString: "mongodb://172.30.104.49:27017/iw"

A modo prueba he copiado un JSON y lo he importado:

docker cp ./admin_clients.json my_mongo:/tmp/admin_clients.json 
docker exec my_mongo mongoimport --uri mongodb://localhost:27017/iw --collection admin_clients --file /tmp/admin_clients.json --db iw --jsonArray

