var inquirer = require('inquirer');
const {
  setStringInRedis,
  getStringFromRedis,
} = require('./redis.js');
const { isValidNumber } = require('./validation.js');

function inquireNumberOfTrucks() {
  return inquirer.prompt([
    {
      type: 'number',
      name: 'numberOfTrucks',
      message: "Nombre de camions?",
    },
  ]).then((answers) => {
    if (!isValidNumber(answers.numberOfTrucks)) {
      console.log("Erreur, nombre invalide.");
      // Start over.
      return inquireNumberOfTrucks();
    } else {
      return answers.numberOfTrucks;
    }
  });
}

function displayNumberOfTrucks(numberOfTrucks) {
  console.log(`Nombre de camions: ${numberOfTrucks}`);
}

async function getNumberOfTrucks() {
  let numberOfTrucks = await getStringFromRedis('numberOfTrucks');

  if (numberOfTrucks !== null) {
    displayNumberOfTrucks(numberOfTrucks);
    return numberOfTrucks;
  }

  numberOfTrucks = await inquireNumberOfTrucks();

  await setStringInRedis('numberOfTrucks', numberOfTrucks);

  return numberOfTrucks;
}

module.exports = {
  getNumberOfTrucks,
  displayNumberOfTrucks,
};
