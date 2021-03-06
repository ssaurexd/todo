const { request, response } = require('express')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const validateJWT = ( req = request, res = response, next ) => {

	const token = req.cookies.token

	if( !token ) {
		
		return res.status(401).json({
			ok: false,
			msg: 'No hay token en la petición'
		})
	}

	try {
		
		const { uid, name } = jwt.verify( token, process.env.SEED_JWT )
	} 
	catch ( error ) {
		
		return res.status(501).json({
			ok: false,
			msg: 'Token no valido.'
		})
	}

	next()
}

module.exports = validateJWT