const {
  resetRedis,
} = require('./redis.js');

const { getTruskerName } = require('./getTruskerName.js');
const { getCompanyName } = require('./getCompanyName.js');
const { getNumberOfEmployees } = require('./getNumberOfEmployees.js');
const { getEmployeesNames } = require('./getEmployeesNames.js');
const { getNumberOfTrucks } = require('./getNumberOfTrucks.js');
const { getTrucksDetails } = require('./getTrucksDetails.js');

const { checkIsValidData } = require('./checkIsValidData.js');

async function main() {
  let data = {};
  data.truskername = await getTruskerName();
  data.companyName = await getCompanyName();
  data.numberOfEmployees = await getNumberOfEmployees();
  data.employeeNames = await getEmployeesNames(data.numberOfEmployees);
  data.numberOfTrucks = await getNumberOfTrucks();
  data.trucks = await getTrucksDetails(data.numberOfTrucks);

  checkIsValidData(data)
    .then((confirmation) => {
      if (!confirmation) {
        console.log("Réinitialisation du formulaire.");
        return resetRedis().then(main());
      }
      return resetRedis();
    });
}

main();