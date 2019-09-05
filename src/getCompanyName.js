var inquirer = require('inquirer');
const {
  setStringInRedis,
  getStringFromRedis,
} = require('./redis.js');
const { isValidString } = require('./validation.js');

async function inquireCompanyName() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'companyName',
      message: 'Nom de la société?',
    },
  ]).then((answers) => {
    if (!isValidString(answers.companyName)) {
      console.log("Erreur, le nom ne peut être vide.");
      // Start over.
      return inquireCompanyName();
    } else {
      return answers.companyName;
    }
  });
}

function displayCompanyName(companyName) {
  console.log(`Nom de la société: ${companyName}`);
}

async function getCompanyName() {
  let companyName = await getStringFromRedis('companyName');

  if (companyName !== null) {
    displayCompanyName(companyName);
    return companyName;
  }

  companyName = await inquireCompanyName();

  await setStringInRedis('companyName', companyName);

  return companyName;
}

module.exports = {
  getCompanyName,
  displayCompanyName,
};
