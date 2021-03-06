require('dotenv').config();

const {
  inquirerMenu,
  pausa,
  leerInput,
  listarLugares,
} = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

const main = async () => {
  const busquedas = new Busquedas();
  let opt = '';

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        // Mostrar mensaje
        const termino = await leerInput('Ciudad: ');

        // Buscar los lugares
        const lugares = await busquedas.ciudad(termino);

        // Selecciona el lugar
        const id = await listarLugares(lugares);

        const lugarSel = lugares.find((l) => l.id === id);

        const { nombre, lat, lng, center } = lugarSel;

        // Clima

        // Mostrar resultados
        console.log('\nInformación de la ciudad\n'.green);
        console.log('Ciudad: ', lugarSel.nombre);
        console.log('Lat', lugarSel.lat);
        console.log('Lng', lugarSel.lng);
        console.log('Temperatura mínima');
        console.log('Temperatura máxima');

        break;

      case 2:
        console.log(busquedas.historial);

        break;
    }

    if (opt !== 0) await pausa();
  } while (opt !== 0);
};

main();
