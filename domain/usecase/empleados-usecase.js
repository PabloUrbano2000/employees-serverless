const empleadoAdapter = require("../../application/model_adapters/empleado-adapter");
const { HttpError } = require("../../application/exceptions/http-error");
const { StatusCodes } = require("http-status-codes");

const axios = require("axios");

const headers = {
  "x-api-key": process.env.SERVICE_HISTORY_KEY,
};

const getEmployees = async () => {
  return empleadoAdapter.findEmployees();
};
const createEmployee = async (employeeData) => {
  await validateToday(employeeData.birthday);
  await validateEmployeeByDocumentExist(
    employeeData?.documentType || "",
    employeeData?.documentNumber || "",
    9999999
  );
  await empleadoAdapter.createEmployee(employeeData);

  const empleadoCreado = await empleadoAdapter.findEmployeeByDocument(
    employeeData.documentType,
    employeeData.documentNumber
  );

  await saveEmployeeHistory(employeeData.salary, 0, empleadoCreado[0].id);

  console.log("empleadoCreado", empleadoCreado);
};

const updateEmployee = async (employeeData, id) => {
  // usar await para controlar el error
  await validateToday(employeeData.birthday);
  await validateEmployeeExist(id);
  await validateEmployeeByDocumentExist(
    employeeData?.documentType || "",
    employeeData?.documentNumber || "",
    id
  );

  const empleadoAnterior = await empleadoAdapter.findOneEmployee(id);
  console.log("employee Anterior", empleadoAnterior);

  await empleadoAdapter.updateEmployee(employeeData, id);

  if (empleadoAnterior.salary != employeeData.salary) {
    await saveEmployeeHistory(employeeData.salary, empleadoAnterior.salary, id);
  }
};

const deleteEmployee = async (id) => {
  await validateEmployeeExist(id);
  await empleadoAdapter.deleteEmployee(id);
};

const getDetailEmployee = async (id) => {
  const empleado = await empleadoAdapter.findOneEmployee(id);
  if (empleado === null) {
    throw new HttpError("Empleado no existe", StatusCodes.NOT_FOUND);
  }
  empleado.history = await getEmployeeHistory(id);

  return empleado;
};

const validateToday = async (date) => {
  const dateFromDate = new Date(date);
  const today = new Date();
  if (dateFromDate > today) {
    throw new HttpError("La fecha es incorrecta", StatusCodes.BAD_REQUEST);
  }
};

const validateEmployeeExist = async (id) => {
  const empleado = await empleadoAdapter.findOneEmployee(id);
  if (empleado === null) {
    throw new HttpError("Empleado no existe", StatusCodes.NOT_FOUND);
  }
};

const validateEmployeeByDocumentExist = async (
  documentType,
  documentNumber,
  id
) => {
  const employees = await empleadoAdapter.findEmployeeByDocument(
    documentType?.toLowerCase() || "",
    documentNumber,
    id
  );
  if (employees.length > 0) {
    throw new HttpError(
      "Ya existe un empleado con el mismo número de documento",
      StatusCodes.BAD_REQUEST
    );
  }
};

// Migrar
const getEmployeeHistory = async (id) => {
  try {
    // rest client
    const result = await axios.get(
      `${process.env.SERVICE_HISTORY}/history/${id}`,
      {
        headers,
      }
    );
    // fin rest client
    // conversión
    return result.data.data;
  } catch (error) {
    console.log("getHistoryEmployee@error", error);
    return [];
    // fin conversion
  }
};

// Migrar
const saveEmployeeHistory = async (newSalary, previousSalary, id) => {
  try {
    // adapter
    const body = {
      newSalary,
      previousSalary,
    };

    const result = await axios.post(
      `${process.env.SERVICE_HISTORY}/history/${id}`,
      body,
      { headers }
    );
    console.log(result);
  } catch (error) {
    console.log("saveEmployeeHistory@error", error);
  }
};

module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getDetailEmployee,
};
