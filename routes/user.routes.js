const { error } = require("console");
const { Router } = require("express");
const { check } = require("express-validator");
const { userGet, userPut, userPost, userDelete } = require("../controllers/user.controllers");
const { esRolValido, emailExiste, existeUsuarioPorId } = require("../helpers/db-validators");
const { validarCampos } = require("../middleware/validar-campos");


const router = Router();





router.get('/',userGet )

router.put('/:id',[
 check("id","No es in ID valido ").isMongoId(),
 check("id").custom(existeUsuarioPorId),
 check ("rol").custom(esRolValido),

validarCampos
],userPut)

router.post('/',[
check("nombre","El nombre es obligatorio ").not().isEmpty(),
check("password","El password debe de ser mas de 6 caracteres ").isLength({min:6}),
check("correo","El correo no es valido ").isEmail(),
check("correo").custom(emailExiste),
//check("rol","El rol no es valido ").isIn(["ADMIN_ROLE","USER_ROLE"]),Esto valida contro un string quiero validarno en DB
check ("rol").custom(esRolValido),
validarCampos

] ,userPost)

router.delete('/:id',[
check("id","No es un ID valido").isMongoId(),
check("id").custom(existeUsuarioPorId),


validarCampos
],userDelete)







module.exports = router;