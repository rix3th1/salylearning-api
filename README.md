# Documentación de la API de salylearning

La [API](https://salylearning.vercel.app) de salylearning es una [API RESTful](https://en.wikipedia.org/wiki/Representational_state_transfer) que proporciona acceso a recursos como libros, usuarios, categorías, comentarios, etc. La API está diseñada para ser utilizada por la aplicación web de [salylearning](https://salylearning-app.vercel.app), pero también puede ser utilizada por otras aplicaciones que deseen consumir los recursos proporcionados por la API.

El lenguaje de programación utilizado para desarrollar la API es [TypeScript](https://www.typescriptlang.org/) y se basa en el paradigma de [programación orientada a objetos](https://en.wikipedia.org/wiki/Object-oriented_programming) y [programación funcional](https://en.wikipedia.org/wiki/Functional_programming). TypeScript es un superconjunto de [JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript) que agrega tipado estático y otras características a JavaScript, lo que hace que el código sea más seguro y fácil de mantener.

Está implementada utilizando [Bun](https://bun.sh) como entorno de ejecución y el marco de trabajo [Nest.js](https://nestjs.com).
Bun es un entorno de ejecución de JavaScript y TypeScript basado en [Deno](https://deno.land/) que proporciona una API simple y segura para ejecutar código JavaScript y TypeScript en el servidor.

Bun es una alternativa a Node.js que proporciona una experiencia de desarrollo moderna y segura para los desarrolladores de JavaScript y TypeScript y es totalmente compatible con los módulos de Node.js y Deno.
Nest.js es un marco de trabajo de Node.js que proporciona una arquitectura modular y escalable para construir aplicaciones web y APIs en Node.js y TypeScript

La API utiliza una base de datos [MySQL](https://www.mysql.com/) para almacenar los datos y se comunica con la base de datos utilizando el [ORM Prisma](https://www.prisma.io). La autenticación en la API se realiza utilizando tokens [JWT](https://jwt.io/introduction/), las imágenes se almacenan en [Cloudinary](https://cloudinary.com/). Para el envío de correos electrónicos se utiliza [NodeMailer](https://nodemailer.com/).

La API de salylearning proporciona una serie de endpoints que permiten a los usuarios realizar operaciones como registrarse, iniciar sesión, obtener información de libros, agregar comentarios, etc.

La API está alojada en [Vercel](https://vercel.com/) y está disponible en la siguiente URL: [https://salylearning.vercel.app](https://salylearning.vercel.app) y la documentación de la API se genera automáticamente utilizando [Swagger](https://swagger.io/) y está disponible en la ruta `/docs`.

<p align="center">
  <a href="https://bun.sh" target="blank"><img src="https://bun.sh/logo.svg" width="100" alt="Bun Logo" style="margin-right: 30;" /></a>
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="100" alt="Nest Logo" /></a>
</p>
<p align="center">
  <a href="https://www.typescriptlang.org/" target="blank"><img src="https://icons.veryicon.com/png/o/business/vscode-program-item-icon/typescript-def.png" width="100" alt="TypeScript Logo" style="margin-right: 30;" /></a> 
  <a href="https://www.prisma.io/" target="blank"><img src="https://cdn.worldvectorlogo.com/logos/prisma-2.svg" width="200" alt="Prisma Logo" style="margin-right: 30;" /></a>
  <a href="https://jwt.io/introduction/" target="blank"><img src="https://jwt.io/img/pic_logo.svg" width="100" alt="JWT Logo" /></a>
</p>
<p align="center">
  <a href="https://vercel.com/" target="blank"><img src="https://assets.vercel.com/image/upload/v1538361091/repositories/vercel/logo.png" width="100" alt="Vercel Logo" style="margin-right: 30; margin-bottom: 50;" /></a>
  <a href="https://cloudinary.com/" target="blank"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Cloudinary_logo.svg/2560px-Cloudinary_logo.svg.png" width="200" alt="Cloudinary Logo" style="margin-bottom: 80; margin-right: 30;" /></a>
  <a href="https://nodemailer.com/" target="blank"><img src="https://i0.wp.com/community.nodemailer.com/wp-content/uploads/2015/10/n2-2.png?fit=422%2C360&ssl=1" width="100" alt="Nodemailer Logo" style="margin-right: 30;" /></a>
</p>
<p align="center">
  <a><img src="https://www.mysql.com/common/logos/logo-mysql-170x115.png" width="150" alt="MySQL Logo" style="margin-right: 30; margin-bottom: 50" /></a>
  <a href="https://swagger.io/" target="blank"><img src="https://static-00.iconduck.com/assets.00/swagger-icon-1024x1024-09037v1r.png" width="100" alt="Swagger Logo" style="margin-bottom: 50;" /></a>
</p>

## Tabla de contenidos

- [Instalación](#instalación)
- [Variables de entorno](#variables-de-entorno)
- [Autenticación](#autenticación)
- [Consumir endpoints con Fetch](#consumir-endpoints-con-fetch)
- [Endpoints con subida de archivos](#endpoints-con-subida-de-archivos-imágenes-de-portadas-de-libros-avatares-etc)

## Instalación

Para instalar y ejecutar la aplicación en desarrollo local, sigue estos pasos:

1. Clona el repositorio de salylearning-api o bifurca el repositorio y clónalo desde tu cuenta de GitHub. Para clonar el repositorio, ejecuta el siguiente comando en tu terminal:

```bash
git clone https://github.com/rojasricor/salylearning-api.git
```

2. Navega al directorio del proyecto:

```bash
cd salylearning-api
```

3. Instala las dependencias utilizando Bun:

```bash
bun install
```

4. Configura las [variables de entorno](#variables-de-entorno) necesarias para la aplicación.

5. Ejecuta la aplicación en modo de desarrollo:

```bash
bun run dev
```

La aplicación ahora estará disponible en `http://localhost:3000`.

> [!NOTE]
> Debes tener instalado [Bun](https://bun.sh) para ejecutar la aplicación. Puedes instalar Bun siguiendo las [instrucciones de instalación](https://bun.sh/#installation).

## Variables de entorno

La aplicación de salylearning utiliza variables de entorno para configurar la aplicación en diferentes entornos (desarrollo, producción, etc). Debes configurar las variables de entorno necesarias para la aplicación antes de ejecutarla. Puedes configurar las variables de entorno en un archivo `.env` en el directorio raíz del proyecto. Asegúrate de que el archivo `.env` no se incluya en el control de versiones y que no se comparta públicamente.

Para configurar las variables de entorno responsables del envío de correos electrónicos, debes habilitar el acceso de aplicaciones menos seguras en tu cuenta de Gmail. Puedes hacerlo siguiendo los pasos en este [enlace](https://myaccount.google.com/lesssecureapps). Luego debes proporcionar esos datos obtenidos en las variables de entorno `GMAIL_USER` y `GMAIL_PASS`.

La aplicación utiliza las siguientes variables de entorno:

- `DATABASE_URL` - La URL de la base de datos de MySQL utilizada por la aplicación.

- `DEV_PROJECT_URL` - La URL de la api cuando se está en desarrollo.

- `PROD_PROJECT_URL` - La URL de la api cuando se está en producción.

- `JWTSECRET` - La clave secreta utilizada para firmar los tokens JWT.

- `JWTEXPIRESIN` - El tiempo de expiración de los tokens JWT.

- `GMAIL_USER` - El correo electrónico de Gmail utilizado para enviar correos electrónicos.

- `GMAIL_PASS` - Contraseña de applicaciones de Gmail.

- `GMAIL_SENDER` - El nombre del remitente que aparecerá en los correos electrónicos enviados.

- `CLD_CLOUD_NAME` - El nombre de la nube de Cloudinary para guardar las imágenes **_(Portadas de los libros, avatares, imágenes de perfíl, etc)_**.

- `CLD_API_KEY` - La clave de la API de Cloudinary.

- `CLD_API_SECRET` - La clave secreta de la API de Cloudinary.

> [!CAUTION]
> Asegúrate de que el archivo `.env` no se incluya en el control de versiones y que no se comparta públicamente.

> [!WARNING]
> Si alguna de las variables de entorno no está configurada, la aplicación no se ejecutará correctamente y mostrará un error.

## Autenticación

La API de salylearning utiliza autenticación basada en [Bearer Token](https://swagger.io/docs/specification/authentication/bearer-authentication/), lo que significa que debes enviar un token de autenticación en tus solicitudes para acceder a los recursos protegidos, incluyendo un encabezado `Authorization` con el valor `Bearer <token>`. Los tokens de autenticación son generados por la API cuando un usuario inicia sesión y tienen una duración limitada [JWT](https://jwt.io/introduction/).

Para obtener un token de autenticación, debes enviar una solicitud POST a la ruta `/auth/login` con las credenciales de inicio de sesión en el cuerpo de la solicitud. A continuación se muestra un ejemplo de cómo iniciar sesión y obtener un token de autenticación:

```javascript
const login = async () => {
  const response = await fetch('https://salylearning.vercel.app/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: 'johndoe',
      password: 'Password123!',
    }),
  });

  const data = await response.json();
  const access_token = data.access_token;
  console.log(access_token);
};

login();
```

> [!IMPORTANT]
> Reemplaza `username` y `password` con las credenciales de inicio de sesión válidas.

## Consumir endpoints con Fetch

Puedes consumir los endpoints de la API de salylearning utilizando la función [`fetch`](https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch) de JavaScript. A continuación se muestra un ejemplo de cómo consumir un endpoint utilizando `fetch`:

```javascript
const fetchEndpoint = async () => {
  const token = 'your_token here';

  const response = await fetch('https://salylearning.vercel.app/<endpoint>', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  console.log(data);
};

fetchEndpoint();
```

> [!NOTE]
> Reemplaza `your_token_here` con el token de autenticación que obtuviste al iniciar sesión.

### Endpoints con subida de archivos (Imágenes de portadas de libros, avatares, etc)

Para consumir los endpoints que requieren subida de archivos, debes enviar una solicitud POST con un objeto [`FormData`](https://developer.mozilla.org/es/docs/Web/API/FormData) en lugar de un objeto JSON. La API de salylearning espera que el archivo se llame `file` en el objeto FormData. Asegúrate de que el campo de entrada de archivo en tu HTML tenga el id o nombre que la API espera.

A continuación se muestra un ejemplo de cómo subir una imagen utilizando `fetch`:

```javascript
const uploadImage = async () => {
  const token = 'your_token here';

  const file = document.getElementById('file').files[0];
  const formData = new FormData();
  formData.append('file', file);

  // Aquí puedes agregar más campos al formData si es necesario, por ejemplo:
  // formData.append('nom_libro', 'El principito');
  // formData.append('num_pag', '100');

  const response = await fetch('https://salylearning.vercel.app/<endpoint>', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();

  console.log(data);
};

uploadImage();
```

> [!IMPORTANT]
> Asegúrate de que el campo de entrada de archivo en tu HTML tenga el id o nombre que la api espera. En el ejemplo anterior, el campo de entrada de archivo debe tener el id `file` y la API espera que el archivo se llame `file`.

> [!NOTE]
> Reemplaza `your_token_here` con el token de autenticación que obtuviste al iniciar sesión y `<endpoint>` con la ruta del endpoint que requiere subida de archivos (Ej: `POST: /libros`).

Para obtener más información sobre cómo consumir los endpoints de la API de salylearning, consulta la [documentación de la API](https://salylearning.vercel.app/docs).

> [!TIP]
> Si tienes alguna pregunta o problema, no dudes en [crear un issue](https://github.com/rojasricor/salylearning-api/issues) en el repositorio de GitHub.
