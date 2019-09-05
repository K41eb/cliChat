var inquirer = require('inquirer');

const { displayTruskerName } = require('./getTruskerName.js');
const { displayCompanyName } = require('./getCompanyName.js');
const { displayNumberOfEmployees } = require('./getNumberOfEmployees.js');
const { displayEmployeesNames } = require('./getEmployeesNames.js');
const { displayNumberOfTrucks } = require('./getNumberOfTrucks.js');
const { displayTrucksDetails } = require('./getTrucksDetails.js');

function displayAllData(data) {
  console.log("Informations saisies:\n");
  displayTruskerName(data.truskerName);
  displayCompanyName(data.companyName);
  displayNumberOfEmployees(data.numberOfEmployees);
  displayEmployeesNames(data.employeeNames);
  displayNumberOfTrucks(data.numberOfTrucks);
  displayTrucksDetails(data.trucks);
}

function checkIsValidData(data) {
  displayAllData(data);

  return inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirmation',
      message: 'Les données sont elles valides?',
    },
  ]).then((data) => data.confirmation);
}

module.exports = {
  checkIsValidData,
};