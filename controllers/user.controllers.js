const { response, query } = require("express")
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs")
const { validationResult } = require("express-validator")


const userGet = async (req, res = response) => {

    //const { q, nombre = "No Name", apikey } = req.query;
    const { limit = 5, desde = 0 } = req.query;
    const query = {estado:true};

    // const usuarios = await Usuario.find(query)
    //     .skip(desde)
    //     .limit(limit);

    // para saber la cantidad de elemntos que hay en la base de datos
    // const total = await Usuario.countDocuments(query);
     
    const [total,usuarios] = await Promise.all([
        // usuarios y total
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(desde)
        .limit(limit),

    ]);

    res.json({

       
          total,
          usuarios
    });

}




const userPut = async (req, res) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;
    //Validar contra la base de datos
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({

        msg: "put API controller",
        usuario
    })

}

const userPost = async (req, res = response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }


    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol })

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en la BD
    await usuario.save()


    res.json(usuario)
}

const userDelete = async(req, res) => {
     const {id}= req.params;
     // borrar fisicamente
     //const usuario =await Usuario.findByIdAndDelete(id)

     const usuario = await Usuario.findByIdAndUpdate(id,{estado: false})
     res.json({

      msg:`El usuario con ID: ${id} ha sido eliminado de la DB` 
      
       
    })
}



module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete


}