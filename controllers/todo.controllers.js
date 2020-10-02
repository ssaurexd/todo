const { request, response } = require("express")
const Todo = require('../models/Todo')


const GetTodos = async( req = request, res = response ) => {

	const { uid } = req

	try {

		const todos = await Todo.find({ user: uid }).sort({ createdAt:'desc' })

		res.json({
			ok: true,
			todos
		})
	} 
	catch ( error ) {
		
		console.log( error )
		res.status(500).json({
			ok: false,
			msg: 'Ops! Algo salio mal.'
		})
	}
}

const NewTodo = async( req = request, res = response ) => {

	const { uid } = req
	const { title, description } = req.body

	try {
		
		const todo = new Todo({ title, description })

		todo.user = uid
		await todo.save()

		res.json({
			ok: true,
			msg: 'Tarea creada correctamente.',
			todo
		})
	} catch ( error ) {
		
		console.log( error )
		res.status(500).json({
			ok: false,
			msg: 'Ops! Algo salio mal.'
		})
	}
}

const UpdateTodo = async( req = request, res = response ) => {

	const { uid } = req
	const todoId = req.params.id
	const { title, description } = req.body

	try {
		
		const todo = await Todo.findById( todoId )

		if( !todo ) {

			return res.status(404).json({
				ok: false,
				msg: 'La tarea no existe.'
			})
		}

		if( uid !== todo.user.toString() ) {

			return res.status(400).json({
				ok: false,
				msg: 'No tienes permiso para editar este contenido.'
			})
		}
		
		const newTodo = await Todo.findByIdAndUpdate( todoId, { title, description } , { new: true } )
		

		res.json({
			ok: true,
			msg: 'Actualizado con exito.',
			todo: newTodo
		})
	} 
	catch ( error ) {
		
		console.log( error )
		res.status(500).json({
			ok: false,
			msg: 'Ops! Algo salio mal.'
		})
	}
}

const DeleteTodo = async( req = request, res = response ) => {

	const { uid } = req
	const todoId = req.params.id

	try {
		
		const todo = await Todo.findById( todoId )

		if( !todo ) {

			return res.status(404).json({
				ok: false,
				msg: 'La tarea no existe.'
			})
		}

		if( uid !== todo.user.toString() ) {

			return res.status(400).json({
				ok: false,
				msg: 'No tienes permiso para editar este contenido.'
			})
		}
		
		await Todo.findByIdAndDelete( todoId )
		
		res.json({
			ok: true,
			msg: 'Tarea eliminada con exito.'
		})
	} 
	catch ( error ) {
		
		console.log( error )
		res.status(500).json({
			ok: false,
			msg: 'Ops! Algo salio mal.'
		})
	}
}

const CompleteTodo = async( req = request, res = response ) => {

	const { uid } = req
	const todoId = req.params.id
	const { complete } = req.body

	try {
		
		const todo = await Todo.findById( todoId )

		if( !todo ) {

			return res.status(404).json({
				ok: false,
				msg: 'La tarea no existe.'
			})
		}

		if( uid !== todo.user.toString() ) {

			return res.status(400).json({
				ok: false,
				msg: 'No tienes permiso para editar este contenido.'
			})
		}
		
		await Todo.findByIdAndUpdate( todoId, { complete }, { useFindAndModify: false } )

		res.json({
			ok: true
		})
	} 
	catch ( error ) {
		
		console.log( error )
		res.status(500).json({
			ok: false,
			msg: 'Ops! Algo salio mal.'
		})
	}	
}

module.exports = {
	GetTodos,
	UpdateTodo,
	DeleteTodo,
	NewTodo,
	CompleteTodo
}