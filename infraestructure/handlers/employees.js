"use strict";
const responseHttp = require("../helpers/response");
const {
  getEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} = require("../../application/controllers/employees");

module.exports.getAll = async (event) => {
  const response = await getEmployees();
  return responseHttp(
    response.success,
    response.data,
    response.message,
    response.statusCode
  );
};

module.exports.create = async (event) => {
  const { success, data, message, statusCode } = await createEmployee(
    JSON.parse(event.body)
  );
  return responseHttp(success, data, message, statusCode);
};

module.exports.getById = async (event) => {
  const { id } = event?.pathParameters || {};
  const { success, data, message, statusCode } = await getEmployeeById(id);
  return responseHttp(success, data, message, statusCode);
};

module.exports.update = async (event) => {
  const { id } = event?.pathParameters || {};
  const { success, data, message, statusCode } = await updateEmployee(
    JSON.parse(event.body),
    id
  );
  return responseHttp(success, data, message, statusCode);
};

module.exports.delete = async (event) => {
  const { id } = event?.pathParameters || {};
  const { success, data, message, statusCode } = await deleteEmployee(id);
  return responseHttp(success, data, message, statusCode);
};
