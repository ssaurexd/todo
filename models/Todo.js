const { Schema, model } = require('mongoose')


const TodoSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	complete: {
		type: Boolean,
		default: false
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}
}, 
{
	timestamps: true
})

//para quitar atributos que no necesito
TodoSchema.method( 'toJSON', function() {
	
	const { __v, _id, createdAt, updatedAt, ...object } = this.toObject()

	object.id = _id

	return object
})

module.exports = model( 'Todo', TodoSchema )