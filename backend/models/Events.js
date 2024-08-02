import mongoose from "mongoose"

const eventsSchema = mongoose.Schema({
	type: {
		type: String,
		required: true,
		enum: ['Movies', 'Theater', 'Music', 'Sports']
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
	duration: {
		type: Number,
		required: true,
		min: [0, 'Duration must be a positive number']
	},
	image: {
		type: String, 
		required: true
	},
	specificDateInfo: [{
		date: {
			type: Date,
			required: true
		},
		location: {
			type: String, 
			required: true
		},
		seatsAvailable: {
			type: Number,
			required: true,
			min: [0, 'Seats available must be a non-negative number']
		},
		status: {
			type: String, 
			enum: ['upcoming', 'ongoing', 'past'],
			default: 'upcoming'
		}
	}],
	description: {
		type: String, 
		required: true
	},
	ticketPrice: {
		type: Number, 
		required: true,
		min: [0, 'Ticket price must be a positive number']
	}
}, { timestamps: true })

const Event = mongoose.model('Event', eventsSchema, 'events')

export default Event