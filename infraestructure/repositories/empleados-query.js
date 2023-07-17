const db = require("./connections");
const TableName = "employees";

const findEmployees = async () => {
  return db.select().table(TableName);
};

const findOneEmployee = async (id) => {
  return db.select().where("id", id).table(TableName);
};
const createEmployee = async ({
  first_name,
  middle_name,
  last_name,
  second_last_name,
  birthday,
  document_type,
  document_number,
  salary,
}) => {
  await db(TableName).insert({
    first_name,
    middle_name,
    last_name,
    second_last_name,
    birthday,
    document_type,
    document_number,
    salary,
  });
};
const updateEmployee = async (
  {
    first_name,
    middle_name,
    last_name,
    second_last_name,
    birthday,
    document_type,
    document_number,
    salary,
  },
  id
) => {
  await db(TableName).where("id", "=", id).update({
    first_name,
    middle_name,
    last_name,
    second_last_name,
    birthday,
    document_type,
    document_number,
    salary,
  });
};

const findEmployeeByDocument = async (documentType, documentNumber, id) => {
  return db
    .select()
    .where({
      document_type: documentType || "",
      document_number: documentNumber || "",
    })
    .andWhereNot({ id })
    .table(TableName);
};

const deleteEmployee = async (id) => {
  await db.where("id", id).table(TableName).del();
};

module.exports = {
  findEmployees,
  findOneEmployee,
  findEmployeeByDocument,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
