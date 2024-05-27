import { $Enums, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const grados = await prisma.grado.createMany({
    skipDuplicates: true,
    data: [
      { nom_grado: 'Primero' },
      { nom_grado: 'Segundo' },
      { nom_grado: 'Tercero' },
      { nom_grado: 'Cuarto' },
      { nom_grado: 'Quinto' },
    ],
  });

  const generosLiterarios = await prisma.generoLiterario.createMany({
    skipDuplicates: true,
    data: [
      {
        nom_genero: 'Aventura',
        descripcion:
          'Sumérgete en emocionantes viajes llenos de acción y peligro con nuestros libros de aventuras. Desde explorar islas misteriosas hasta descubrir tesoros perdidos, cada página te llevará a un mundo lleno de adrenalina y emoción.',
      },
      {
        nom_genero: 'Fantasía',
        descripcion:
          'Abre las puertas a la magia y la imaginación con nuestros libros de fantasía. Con mundos mágicos habitados por criaturas extraordinarias y héroes valientes, estos libros te transportarán a universos donde los sueños se vuelven realidad y la fantasía cobra vida.',
      },
      {
        nom_genero: 'Historia',
        descripcion:
          'Viaja en el tiempo y descubre los secretos del pasado con nuestros libros de historia. Desde épocas antiguas hasta eventos históricos más recientes, cada libro te llevará a un viaje fascinante a través de los acontecimientos que han moldeado nuestro mundo.',
      },
    ],
  });

  const avatars = await prisma.avatar.createMany({
    skipDuplicates: true,
    data: [
      // Avatars para docentes
      {
        nom_avatar: 'user01.png',
        descripcion: 'Avatar 1',
        rol: $Enums.Rol.DOCENTE,
      },
      {
        nom_avatar: 'user02.png',
        descripcion: 'Avatar 2',
        rol: $Enums.Rol.DOCENTE,
      },
      {
        nom_avatar: 'user03.png',
        descripcion: 'Avatar 3',
        rol: $Enums.Rol.DOCENTE,
      },
      {
        nom_avatar: 'user04.png',
        descripcion: 'Avatar 4',
        rol: $Enums.Rol.DOCENTE,
      },
      {
        nom_avatar: 'user05.png',
        descripcion: 'Avatar 5',
        rol: $Enums.Rol.DOCENTE,
      },
      // Avatars para estudiantes
      {
        nom_avatar: 'astronauta.png',
        descripcion: 'Avatar 6',
        rol: $Enums.Rol.ESTUDIANTE,
      },
      {
        nom_avatar: 'cocodrilo_1.png',
        descripcion: 'Avatar 7',
        rol: $Enums.Rol.ESTUDIANTE,
      },
      {
        nom_avatar: 'cocodrilo_2.png',
        descripcion: 'Avatar 8',
        rol: $Enums.Rol.ESTUDIANTE,
      },
      {
        nom_avatar: 'conejo_1.png',
        descripcion: 'Avatar 9',
        rol: $Enums.Rol.ESTUDIANTE,
      },
      {
        nom_avatar: 'conejo_2.png',
        descripcion: 'Avatar 10',
        rol: $Enums.Rol.ESTUDIANTE,
      },
      {
        nom_avatar: 'lobo_niño.png',
        descripcion: 'Avatar 11',
        rol: $Enums.Rol.ESTUDIANTE,
      },
      {
        nom_avatar: 'manzana.png',
        descripcion: 'Avatar 12',
        rol: $Enums.Rol.ESTUDIANTE,
      },
      {
        nom_avatar: 'mazorca.png',
        descripcion: 'Avatar 13',
        rol: $Enums.Rol.ESTUDIANTE,
      },
      {
        nom_avatar: 'saly_bruja.png',
        descripcion: 'Avatar 14',
        rol: $Enums.Rol.ESTUDIANTE,
      },
      {
        nom_avatar: 'saly_vaquera.png',
        descripcion: 'Avatar 15',
        rol: $Enums.Rol.ESTUDIANTE,
      },
    ],
  });

  console.info({
    grados,
    generosLiterarios,
    avatars,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
