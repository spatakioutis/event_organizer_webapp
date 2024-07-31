import Event from "../models/Events.js"
import User from "../models/Users.js"

const createEvent = async (req, res) => {
    try {

        // get event data
        const host = req.user.id

        const {
            type,
            title,
            duration,
            //image,
            description,
            ticketPrice,
            specificDateInfo
        } = req.body

        // create new event
        const newEvent = new Event({
            type,
            title,
            host,
            duration,
            //image,
            description,
            ticketPrice,
            specificDateInfo
        })


        // save new event
        const savedEvent = newEvent.save()

        res.status(200).json({
            event: savedEvent,
            message: "Event registration successful"
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


export { createEvent }