# Imagen preexistente de node pensada para docker que es LTS, en concreto la versión 3.10
FROM node:lts-alpine3.10 AS node-for-build

# Crea el directorio app en la máquina, ya que no hay nada aparte de lo traido de node
RUN mkdir app

# Las siguientes instrucciones se ejecutarán en este directorio
WORKDIR /app

# Copia del directorio actual (./) al directorio actual del contenedor (./ especificado con WORKDIR)
COPY . .

# Ejecuta el npm install (genera las dependencias) y el build (nos deja la app optimizada para el despliegue)
RUN npm install && npm run build

# Nos trae a nuestro contenedor la imagen del servidor web: nginx, para poder ejecutar un servidor de paginas web nginx
FROM nginx:stable-alpine3.20 AS nginx-server

# Nos trae a esta nueva capa la carpeta que node nos generó al ejecutar el build y que lo ponga en el directorio que nginx usa para servir las páginas web
COPY --from=node-for-build /app/build /usr/share/nginx/html

# Que la aplicación esté disponible en el puerto 80 (por defecto de nginx, esta linea se podría eliminar)
EXPOSE 80

# Lanza nginx y queda servida nuestra app
CMD ["nginx","-g","daemon off;"]