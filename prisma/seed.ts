import { PrismaClient } from '@prisma/client';

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

  console.info({ grados, generosLiterarios });
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
