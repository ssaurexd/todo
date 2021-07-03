const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
require('dotenv').config()
const db = require('./database/config')
const cors = require('cors')


//base de datos
db()

//cors
app.use( cors({
	origin: 'http://localhost:3000',
  	optionsSuccessStatus: 200,
	credentials: true
}) )

//cookies
app.use( cookieParser() )

//dir publico
app.use( express.static('public') )

//aceptar form-format
app.use( express.json() )

//rutas
app.use( '/user', require('./routes/user.routes') )
app.use( '/todo', require('./routes/todo.routes') )

app.listen( process.env.PORT, () => {
	console.log( `-> http://localhost:${ process.env.PORT }` )
})