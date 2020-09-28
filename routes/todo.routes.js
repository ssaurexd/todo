/*
	Rutas de los todos 
	host + /todo + /nueva_ruta
*/
const router = require('express').Router()
const { check } = require('express-validator')
const { 
	GetTodos, 
	UpdateTodo, 
	NewTodo, 
	DeleteTodo,
	CompleteTodo 
} = require('../controllers/todo.controllers')
const validateJWT = require('../middlewares/validateJWT')
const { validateInputs } = require('../middlewares/validateInputs')


//validar JWT de todas estas rutas
router.use( validateJWT )

router.get( 
	'/list',
	GetTodos  
)

router.post(
	'/new-todo',
	[
		check( 'title', 'El titulo es requerido.' ).not().isEmpty(),
		check( 'description', 'La descripción es requerida.' ).not().isEmpty(),
		validateInputs
	],
	NewTodo
)

router.put(
	'/update/:id',
	[
		check( 'title', 'El titulo es requerido.' ).not().isEmpty(),
		check( 'description', 'La descripción es requerida.' ).not().isEmpty(),
		validateInputs
	],
	UpdateTodo
)

router.delete(
	'/delete/:id',
	DeleteTodo
)

router.put(
	'/complete/:id',
	[
		check( 'complete', 'La valor es requerido' ).not().isEmpty(),
		check( 'complete', 'La valor debe ser booleano' ).isBoolean(),
		validateInputs
	],
	CompleteTodo
)

module.exports = router