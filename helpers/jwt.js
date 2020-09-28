const jwt = require('jsonwebtoken')
require('dotenv').config()


const setJWT = ( uid, name ) => {

	return new Promise(( resolve, reject ) => {

		const payload = { uid, name }

		jwt.sign( payload, process.env.SEED_JWT, { 
			expiresIn: '2h'
		}, ( error, token ) => {

			if( error ) {

				console.log( error )
				reject( 'No se pudo generar el token' )
			}

			resolve( token )
		})
	})
}

module.exports = setJWT

