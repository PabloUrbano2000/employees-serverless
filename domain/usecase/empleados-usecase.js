const empleadoAdapter = require('../../application/model_adapters/empleado-adapter');

const getEmpleados = async () => {
    return empleadoAdapter.findEmpleados();
}
const createEmpleado = async (empleadoData) => {

}
const updateEmpleado = async (empleadoData, id) => {

}
const deleteEmpleado = async (id) => {

}
const getDetailEmpleado = async (id) => {

}

module.exports = {
    getEmpleados,
    createEmpleado,
    updateEmpleado,
    deleteEmpleado,
    getDetailEmpleado,
}