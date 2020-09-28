/* 
	Rutas de usuario
	host + /user + nuevas rutas
*/
const router = require('express').Router()
const { check } = require('express-validator')
const {
	SignIn,
	SignUp,
	UpdateProfile,
	RevalidateToken
} = require('../controllers/user.controllers')
const { validateInputs } = require('../middlewares/validateInputs')
const validateJWT = require('../middlewares/validateJWT')


router.post( 
	'/signup',
	[
		//middlewares
		check( 'name', 'El nombre es obligatorio.' ).not().isEmpty(),
		check( 'email', 'El email es obligatorio.' ).isEmail(),
		check( 'password', 'La constraseña es obligatoria.' ).not().isEmpty(),
		validateInputs
	], 
	SignUp 
)

router.post(
	'/signin',
	[
		check( 'email', 'El email no es valido' ).isEmail(),
		check( 'password', 'La contraseña es obligatoria.' ).not().isEmpty(),
		validateInputs
	], 
	SignIn 
)

router.put( 
	'/update-profile', 
	UpdateProfile 
)

router.post( 
	'/revalidate-token', 
	validateJWT,
	RevalidateToken 
)

module.exports = router
