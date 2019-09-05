var inquirer = require('inquirer');
const {
  setStringInRedis,
  getStringFromRedis,
} = require('./redis.js');
const { isValidString } = require('./validation.js');

async function inquireTruskerName() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'truskerName',
      message: 'Nom du Trusker?',
    },
  ]).then((answers) => {
    if (!isValidString(answers.truskerName)) {
      console.log("Erreur, le nom ne peut être vide.");
      // Start over.
      return inquireTruskerName();
    } else {
      return answers.truskerName;
    }
  });
}

function displayTruskerName(truskerName) {
  console.log(`Nom du Trusker: ${truskerName}`);
}

async function getTruskerName() {
  let truskerName = await getStringFromRedis('truskerName');

  if (truskerName !== null) {
    displayTruskerName(truskerName);
    return truskerName;
  }

  truskerName = await inquireTruskerName();

  await setStringInRedis('truskerName', truskerName);

  return truskerName;
}

module.exports = {
  getTruskerName,
  displayTruskerName,
};