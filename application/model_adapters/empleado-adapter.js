const employeeQuery = require("../../infraestructure/repositories/empleados-query");
const employeeDto = require("../helpers/empleado-dto");

const findEmployees = async () => {
  const data = await employeeQuery.findEmployees();
  return employeeDto.getEmployeesFromDBArray(data);
};

const findOneEmployee = async (id) => {
  const data = await employeeQuery.findOneEmployee(id);
  if (data === null || data.length === 0) {
    return null;
  }
  return employeeDto.getEmployeeFromDBDto(data[0]);
};

const findEmployeeByDocument = async (documentType, documentNumber, id) => {
  const data =
    (await employeeQuery.findEmployeeByDocument(
      documentType,
      documentNumber,
      id
    )) || [];

  const employeesFromDto = data.map((val) =>
    employeeDto.getEmployeeFromDBDto(val)
  );

  return employeesFromDto;
};

const createEmployee = async ({
  firstName,
  middleName,
  lastName,
  secondLastName,
  birthday,
  documentType,
  documentNumber,
  salary,
}) => {
  await employeeQuery.createEmployee(
    employeeDto.getDBFromEmployeeDto({
      firstName,
      middleName,
      lastName,
      secondLastName,
      birthday,
      documentType,
      documentNumber,
      salary,
    })
  );
};

const updateEmployee = async (
  {
    firstName,
    middleName,
    lastName,
    secondLastName,
    birthday,
    documentType,
    documentNumber,
    salary,
  },
  id
) => {
  await employeeQuery.updateEmployee(
    employeeDto.getDBFromEmployeeDto({
      firstName,
      middleName,
      lastName,
      secondLastName,
      birthday,
      documentType,
      documentNumber,
      salary,
    }),
    id
  );
};

const deleteEmployee = async (id) => {
  await employeeQuery.deleteEmployee(id);
};

module.exports = {
  findEmployees,
  findOneEmployee,
  findEmployeeByDocument,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
