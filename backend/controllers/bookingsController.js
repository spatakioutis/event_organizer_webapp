import Booking from "../models/Bookings.js"

const createBooking = async (req, res) => {
    try {

        const userID = req.user._id

        const {
            event,
            date, 
            numOfTickets
        } = req.body

        const newBooking = new Booking({
            user: userID,
            event,
            date,
            numOfTickets
        })

        const savedBooking = await newBooking.save()

        res.status(201).json({
            booking: savedBooking,
            message: "Booking registration successful"
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteBooking = async (req, res) => {
    try {
        const userID = req.user._id
        const { bookingID } = req.params

        const booking = await Booking.findById(bookingID)

        if ( !booking ) {
            return res.status(404).json({
                message: 'Booking not found'
            })
        }

        if ( userID !== booking.user.toString() ) {
            return res.status(400).json({
                message: 'Booking does not belong to the user'
            })
        }

        await booking.deleteOne()

        res.status(200).json({
            message: "Booking deleted successfully"
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


export { createBooking, deleteBooking }