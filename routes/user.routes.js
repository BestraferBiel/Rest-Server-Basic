const { Router } = require("express");
const { userGet, userPut, userPost, userDelete } = require("../controllers/user.controllers");

const router = Router();





router.get('/',userGet )

router.put('/:id',userPut)

router.post('/', userPost)

router.delete('/',userDelete)







module.exports = router;