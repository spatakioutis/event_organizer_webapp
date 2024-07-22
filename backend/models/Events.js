import mongoose from "mongoose"

const eventsSchema = mongoose.Schema({
	type: {
		type: String,
		required: true
   	},
	host: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	title: {
		type: String,
		required: true
   	},
	date: {
		type: Date,
		required: true
	},
	duration: {
		type: Number,
		required: true,
		min: [0, 'Duration must be a positive number']
	},
	location: {
		type: String, 
		required: true
	},
	image: {
		type: String, 
		required: true
	},
	description: {
		type: String, 
		required: true
	},
	seatsAvailable: {
		type: Number,
		required: true,
		min: [0, 'Seats available must be a non-negative number']
	},
	ticketPrice: {
		type: Number, 
		required: true,
		min: [0, 'Ticket price must be a positive number']
	},
	status: {
		type: String, 
		enum: ['upcoming', 'ongoing', 'past'],
    	default: 'upcoming'
	}
})

const Event = mongoose.model('Event', eventsSchema, 'events')

export default Event