var inquirer = require('inquirer');
const {
  setStringInRedis,
  getStringFromRedis,
} = require('./redis.js');
const { isValidString } = require('./validation.js');

function inquireEmployeeName() {
  return inquirer.prompt([
    {
      type: 'input',
      name: `employeeName`,
      message: `Nom de l'employé?`,
    },
  ])
  .then((answers) => {
    if (!isValidString(answers.employeeName)) {
      console.log("Erreur, le nom ne peut être vide.");
      // Start over.
      return inquireEmployeeName();
    } else {
      return answers.employeeName;
    }
  });
}

function displayEmployeesNames(employeesNames) {
  console.log('Noms des employés:');
  employeesNames.forEach((employeeName, index) => {
    console.log(`Employé n°${index + 1}:`);
    console.log(`  Nom: ${employeeName}\n`);
  });
}

async function getEmployeesNames(numberOfEmployees) {
  let employeesNamesJSON = await getStringFromRedis('employeesNamesJSON');
  let employeesNames = [];

  if (employeesNamesJSON !== null) {
    employeesNames = JSON.parse(employeesNamesJSON);
    displayEmployeesNames(employeesNames);

    let numberOfRegisteredEmployeeNames = employeesNames.length;
    if (numberOfRegisteredEmployeeNames === numberOfEmployees) {
      return employeesNames;
    } else {
      for (let i = numberOfRegisteredEmployeeNames ; i < numberOfEmployees ; i += 1) {
        console.log(`Employé n°${i + 1}:`);
        employeesNames.push(await inquireEmployeeName());
        await setStringInRedis('employeesNamesJSON', JSON.stringify(employeesNames));
      }

      return employeesNames;
    }
  }

  for (let i = 0 ; i < numberOfEmployees ; i += 1) {
    console.log(`Employé n°${i + 1}:`);
    employeesNames.push(await inquireEmployeeName());
    await setStringInRedis('employeesNamesJSON', JSON.stringify(employeesNames));
  }

  return employeesNames;
}

module.exports = {
  getEmployeesNames,
  displayEmployeesNames,
};
