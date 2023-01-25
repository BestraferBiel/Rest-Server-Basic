const Role = require("../models/role");
const Usuario = require("../models/usuario");

const esRolValido = async (rol = "") => {

  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta en la BD`)
  }


}

const emailExiste = async (correo) => {

  //verificar si existe el correo
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`Ese correo: ${correo} ya esta registrado `);

  }
}

const existeUsuarioPorId = async (id) => {

  //verificar si existe usuario 
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id : ${id} no existe`);

  }
}



module.exports = {

  esRolValido,
  emailExiste,
  existeUsuarioPorId

}


