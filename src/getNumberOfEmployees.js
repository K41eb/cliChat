var inquirer = require('inquirer');
const {
  setStringInRedis,
  getStringFromRedis,
} = require('./redis.js');
const { isValidNumber } = require('./validation.js');

function inquireNumberOfEmployees() {
  return inquirer.prompt([
    {
      type: 'number',
      name: 'numberOfEmployees',
      message: "Nombre d'employés?",
    },
  ]).then((answers) => {
    if (!isValidNumber(answers.numberOfEmployees)) {
      console.log("Erreur, nombre invalide.");
      // Start over.
      return inquireNumberOfEmployees();
    } else {
      return answers.numberOfEmployees;
    }
  });
}

function displayNumberOfEmployees(numberOfEmployees) {
  console.log(`Nombre d'employés: ${numberOfEmployees}`);
}

async function getNumberOfEmployees() {
  let numberOfEmployees = await getStringFromRedis('numberOfEmployees');

  if (numberOfEmployees !== null) {
    displayNumberOfEmployees(numberOfEmployees);
    return numberOfEmployees;
  }

  numberOfEmployees = await inquireNumberOfEmployees();

  await setStringInRedis('numberOfEmployees', numberOfEmployees);

  return numberOfEmployees;
}

module.exports = {
  getNumberOfEmployees,
  displayNumberOfEmployees,
};
