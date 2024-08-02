import mongoose from "mongoose"

const bookingsSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
    event: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Event',
		required: true
	},
	date: {
		type: Date,
		required: true
	},
	numOfTickets: {
		type: Number,
		required: true,
		min: [1, 'Number of tickets must be an integer greater than 1 ']
	}
}, { timestamps: true })

const Booking = mongoose.model('Booking', bookingsSchema, 'bookings')

export default Booking