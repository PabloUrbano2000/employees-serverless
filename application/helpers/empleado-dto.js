const getEmployeeFromDBDto = ({
  id,
  first_name,
  middle_name,
  last_name,
  second_last_name,
  birthday,
  document_type,
  document_number,
  salary,
}) => ({
  id: id,
  firstName: first_name,
  middleName: middle_name,
  lastName: last_name,
  secondLastName: second_last_name,
  birthday: birthday,
  documentType: document_type,
  documentNumber: document_number,
  salary: salary,
});

const getEmployeesFromDBArray = (employeesDB) =>
  employeesDB.map(getEmployeeFromDBDto);

const getDBFromEmployeeDto = ({
  firstName,
  middleName,
  lastName,
  secondLastName,
  birthday,
  documentType,
  documentNumber,
  salary,
}) => ({
  first_name: firstName,
  middle_name: middleName,
  last_name: lastName,
  second_last_name: secondLastName,
  birthday: birthday,
  document_type: documentType,
  document_number: documentNumber,
  salary: salary,
});

module.exports = {
  getEmployeeFromDBDto,
  getEmployeesFromDBArray,
  getDBFromEmployeeDto,
};
