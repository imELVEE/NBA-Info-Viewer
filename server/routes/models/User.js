const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		lowercase: true,
		immutable: true
	},
	teams: [Number],
	players: [Number]
})

module.exports = mongoose.model('User', userSchema, 'Users')