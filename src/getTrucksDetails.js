var inquirer = require('inquirer');
const {
  setStringInRedis,
  getStringFromRedis,
} = require('./redis.js');
const {
  isValidNumber,
  isValidString,
} = require('./validation.js');

function inquireTruckType() {
  return inquirer.prompt([
    {
      type: 'input',
      name: `truckType`,
      message: 'Type du camion?',
    },
  ]).then((answers) => {
    if (!isValidString(answers.truckType)) {
      console.log("Erreur, le type ne peut être vide.");
      // Start over.
      return inquireTruckType();
    } else {
      return answers.truckType;
    }
  });
}

function inquireTruckVolume() {
  return inquirer.prompt([
    {
      type: 'number',
      name: `truckVolume`,
      message: 'Volume du camion en m³?',
    },
  ]).then((answers) => {
    if (!isValidNumber(answers.truckVolume)) {
      console.log("Erreur, volume invalide.");
      // Start over.
      return inquireTruckVolume();
    } else {
      return answers.truckVolume;
    }
  });
}

function displayTrucksDetails(trucks) {
  console.log('Détail des camions:');
  trucks.forEach((truck, index) => {
    console.log(`Camion n°${index + 1}:`);
    console.log(`  Type: ${truck.type}`);
    console.log(`  Volume: ${truck.volume}\n`);
  });
}

async function getTrucksDetails(numberOfTrucks) {
  let trucksJSON = await getStringFromRedis('trucksJSON');
  let trucks = [];

  if (trucksJSON !== null) {
    trucks = JSON.parse(trucksJSON);
    displayTrucksDetails(trucks);

    let numberOfRegisteredTrucks = trucks.length;
    if (numberOfRegisteredTrucks === numberOfTrucks) {
      return trucks;
    } else {
      for (let i = numberOfRegisteredTrucks ; i < numberOfTrucks ; i += 1) {
        const truck = {};
        console.log(`Camion n°${i + 1}:`);
        truck.type = await inquireTruckType();
        truck.volume = await inquireTruckVolume();
        trucks.push(truck);
        await setStringInRedis('trucksJSON', JSON.stringify(trucks));
      }

      return trucks;
    }
  }

  for (let i = 0 ; i < numberOfTrucks ; i += 1) {
    const truck = {};
    console.log(`Camion n°${i + 1}:`);
    truck.type = await inquireTruckType();
    truck.volume = await inquireTruckVolume();
    trucks.push(truck);
    await setStringInRedis('trucksJSON', JSON.stringify(trucks));
  }

  return trucks;
}

module.exports = {
  getTrucksDetails,
  displayTrucksDetails,
};
