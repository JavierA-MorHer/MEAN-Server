
const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');



//Inicio de rutas

const router = Router();

//Crear nuevo usuario
router.post('/new', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('password','El password es obligatorio').isLength( min=6),
    validarCampos
] ,crearUsuario);

//Login de usuario
router.post('/', [
    check('email','El email es obligatorio').isEmail(),
    check('password','El password es obligatorio').isLength( min=6),
    validarCampos
],loginUsuario);

//Validar y revalidar token
router.get('/renew',validarJWT ,renewToken);

//Fin de rutas





//Para exportar en Node
module.exports = router;