const { response, request } = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const setJWT = require('../helpers/jwt')


const SignUp = async( req = request, res = response ) => {
	
	const { email, password } = req.body

	try {

		let user = await User.findOne({ email })

		if( user ) {

			return res.status(400).json({
				ok: false,
				msg: 'Ya hay un usuario con ese correo.'
			})
		}
		
		user = new User( req.body )
		
		//encriptar contraseña
		const salt = bcrypt.genSaltSync()

		user.password = bcrypt.hashSync( password, salt )
		await user.save()

		//generar JWT
		const token = await setJWT( user.id, user.name )
	
		res.json({
			ok: true,
			msg: 'Usuario registrado con exito.',
			uid: user.id,
			name: user.name,
			token
		})
	} 
	catch ( error ) {
		
		console.log( error )

		res.status(500).json({
			ok: false,
			msg: 'Ops ocurrio un error!!'
		})
	}
}

const SignIn = async( req = request, res = response ) => {

	const { email, password } = req.body

	try {

		const user = await User.findOne({ email })
		
		if( !user ) {

			return res.status(400).json({
				ok: false,
				msg: 'El correo no esta registrado.'
			})
		}

		//confirmar passwords
		const validPassword = bcrypt.compareSync( password, user.password )

		if( !validPassword ) {

			return res.status(400).json({
				ok: false,
				msg: 'Contraseña incorrecta.'
			})
		}
		
		//generar JWT
		const token = await setJWT( user.id, user.name )

		res.json({
			ok: true,
			uid: user.id,
			name: user.name,
			token
		})
	} 
	catch ( error ) {
		
		console.log( error )

		res.status(500).json({
			ok: false,
			msg: 'Ops ocurrio un error!!'
		})
	}

}

const UpdateProfile = ( req = request, res = response ) => {
	
}

const RevalidateToken = async( req = request, res = response ) => {

	const { uid, name } = req
	//generar JWT
	const token = await setJWT( uid, name )

	res.json({
		ok: true,
		token
	})
}
module.exports = {
	SignUp,
	SignIn,
	UpdateProfile,
	RevalidateToken
}