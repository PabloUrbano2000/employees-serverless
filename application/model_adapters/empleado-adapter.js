const empleadoQuery = require('../../infraestructure/repositories/empleados-query');
const empleadoDto = require('../helpers/empleado-dto');

const findEmpleados = async () => {
    const data = await empleadoQuery.findEmpleados();
    return empleadoDto.getEmpleadosFromDBArray(data);
}

const findOneEmpleado = async (id) => {

}

const createEmpleado = async ({
    primerNombre,
    segundoNombre,
    primerApellido,
    segundoApellido,
    fechaNacimiento,
    tipoIdentificacion,
    numeroIdentificacion,
    sueldo
}) => {

}

const updateEmpleado = async ({
    primerNombre,
    segundoNombre,
    primerApellido,
    segundoApellido,
    fechaNacimiento,
    tipoIdentificacion,
    numeroIdentificacion,
    sueldo
}, id) => {

}

const deleteEmpleado = async (id) => {

}

module.exports = {
    findEmpleados,
    findOneEmpleado,
    createEmpleado,
    updateEmpleado,
    deleteEmpleado,
}