const { StatusCodes } = require("http-status-codes");
const { responseFail, responseSuccess } = require("../helpers/responses");

const data = [
  {
    firstName: "José",
    middleName: "Felix",
    lastName: "Ribas",
    secondLastName: "Caldera",
    birthday: new Date("2000-01-20"),
    documentType: "cc",
    documentNumber: "3131588",
    salary: 2000.0,
  },
  {
    firstName: "Kelvin",
    middleName: "Rafael",
    lastName: "Mosquera",
    secondLastName: "Betancourt",
    birthday: new Date("197-06-20"),
    documentType: "nit",
    documentNumber: "66654847",
    salary: 3000.0,
  },
];

const getEmployees = async () => {
  let response = null;

  try {
    response = responseSuccess({ data });
  } catch (error) {
    response = responseFail({ message: "Error inesperado" });
  }

  return response;
};

const createEmployee = async (data) => {
  let response = null;

  try {
    console.log("Employee Data:", data);
    response = responseSuccess(
      { message: "Empleado creado" },
      StatusCodes.CREATED
    );
  } catch (error) {
    response = responseFail({ message: "Error inesperado" });
  }

  return response;
};

const getEmployeeById = async (id) => {
  let response = null;

  try {
    console.log("Employee Data:", id);
    response = responseSuccess({ data: data[id] || null }, StatusCodes.OK);
  } catch (error) {
    response = responseFail({ message: "Error inesperado" });
  }

  return response;
};

const updateEmployee = async (data, id) => {
  let response = null;

  try {
    console.log("Employee Data:", data, id);
    response = responseSuccess(
      { message: "Empleado actualizado" },
      StatusCodes.OK
    );
  } catch (error) {
    response = responseFail({ message: "Error inesperado" });
  }

  return response;
};

const deleteEmployee = async (id) => {
  let response = null;

  try {
    console.log("Employee Data:", id);
    response = responseSuccess(
      { message: "Empleado eliminado" },
      StatusCodes.OK
    );
  } catch (error) {
    response = responseFail({ message: "Error inesperado" });
  }

  return response;
};

module.exports = {
  getEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
