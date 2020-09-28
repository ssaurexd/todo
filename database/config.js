const mongoose = require('mongoose')
require('dotenv').config()


const db = async() => {

	try {
		
		await mongoose.connect( process.env.MONGO_URL, { 
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		})
		console.log( 'DB online' )
	} 
	catch ( error ) {
		
		console.log( error )
		throw new Error( 'Error al conectar a la DB' )
	}
}

module.exports = db