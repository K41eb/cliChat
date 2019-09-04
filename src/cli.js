var inquirer = require('inquirer');

function isInvalidString(str) {
  return typeof str !== 'string' || str.length === 0;
}

function isInvalidNumber(number) {
  return isNaN(number) || typeof number !== 'number' || number <= 0;
}

function enquireEmployeeName() {
  return inquirer.prompt([
    {
      type: 'input',
      name: `employeeName`,
      message: `Nom de l'employé?`,
    },
  ])
  .then((answers) => {
    if (isInvalidString(answers.employeeName)) {
      console.log("Erreur, le nom ne peut être vide.");
      // Start over.
      return enquireEmployeeName();
    } else {
      return answers.employeeName;
    }
  });
}

async function enquireEmployeeNames(number) {
  let employees = [];
  for (let i = 0 ; i < number ; i += 1) {
    let employee = {
      id: i,
    };

    console.log(`Employé n°${i + 1}:`);
    employee.employeeName = await enquireEmployeeName();
    employees.push(employee);
  }

  return employees;
}

function enquireNumberOfEmployees() {
  return inquirer.prompt([
    {
      type: 'number',
      name: 'numberOfEmployees',
      message: "Nombre d'employés?",
    },
  ]).then((answers) => {
    if (isInvalidNumber(answers.numberOfEmployees)) {
      console.log("Erreur, nombre invalide.");
      // Start over.
      return enquireNumberOfEmployees();
    } else {
      return answers.numberOfEmployees;
    }
  });
}

function enquireTruckType() {
  return inquirer.prompt([
    {
      type: 'input',
      name: `truckType`,
      message: 'Type du camion?',
    },
  ]).then((answers) => {
    if (isInvalidString(answers.truckType)) {
      console.log("Erreur, le type ne peut être vide.");
      // Start over.
      return enquireTruckType();
    } else {
      return answers.truckType;
    }
  });
}

function enquireTruckVolume() {
  return inquirer.prompt([
      {
        type: 'number',
        name: `truckVolume`,
        message: 'Volume du camion en m³?',
      },
    ]).then((answers) => {
      if (isInvalidNumber(answers.truckVolume)) {
        console.log("Erreur, volume invalide.");
        // Start over.
        return enquireTruckVolume();
      } else {
        return answers.truckVolume;
      }
    });
}

async function enquireTrucksDetails(number) {
  let trucks = [];
  for (let i = 0 ; i < number ; i += 1) {
    const truck = {
      id: i,
    };

    console.log(`Truck n°${i + 1}:`);
    truck.truckType = await enquireTruckType();
    truck.truckVolume = await enquireTruckVolume();

    trucks.push(truck);
  }

  return trucks;
}

function enquireNumberOfTrucks() {
  return inquirer.prompt([
    {
      type: 'number',
      name: 'numberOfTrucks',
      message: "Nombre de camions?",
    },
  ]).then((answers) => {
    if (isInvalidNumber(answers.numberOfTrucks)) {
      console.log("Erreur, nombre invalide.");
      // Start over.
      return enquireNumberOfTrucks();
    } else {
      return answers.numberOfTrucks;
    }
  });
}

function enquireTruskerName() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'truskerName',
      message: 'Nom du Trusker?',
    },
  ]).then((answers) => {
    if (answers.truskerName.length === 0) {
      console.log("Erreur, le nom ne peut être vide.");
      // Start over.
      return enquireTruskerName();
    } else {
      return answers.truskerName;
    }
  });
}

function enquireCompanyName() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'companyName',
      message: 'Nom de la société?',
    },
  ]).then((answers) => {
    if (answers.companyName.length === 0) {
      console.log("Erreur, le nom ne peut être vide.");
      // Start over.
      return enquireCompanyName();
    } else {
      return answers.companyName;
    }
  });
}

async function enquireAllDetails() {
  const data = {
    truskerName: await enquireTruskerName(),
    companyName: await enquireCompanyName(),
  };

  const numberOfEmployees = await enquireNumberOfEmployees();

  data.employees = await enquireEmployeeNames(numberOfEmployees);

  const numberOfTrucks = await enquireNumberOfTrucks();

  data.trucks = await enquireTrucksDetails(numberOfTrucks);

  return data;
}

function enquireIsValidData(data) {
  console.log("Données saisies:");
  console.dir(data, { colors: true });

  return inquirer.prompt([
    {
      type: 'confirm',
      name: 'isValid',
      message: 'Les informations sont-elles correctes?',
    },
  ]).then((answers) => {
    return answers.isValid;
  });
}

async function cli() {
  const data = await enquireAllDetails();
  const isValid = await enquireIsValidData(data);

  if (!isValid) {
    return cli();
  } else {
    return data;
  }
}

cli();
