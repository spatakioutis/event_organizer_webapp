import Event from "../models/Events.js"
import User from "../models/Users.js"
import fs from "fs"
import path from "path"

const createEvent = async (req, res) => {
    try {

        // get event data
        const host = req.user.id
        const imagePath = req.file.path.replace('public/', '')

        const {
            type,
            title,
            duration,
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
            image: imagePath,
            description,
            ticketPrice,
            specificDateInfo : JSON.parse(specificDateInfo)
        })

        // save new event
        const savedEvent = await newEvent.save()

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

const deleteEvent = async (req, res) => {
    try {

        // get event
        const userID = req.user.id
        const { eventID } = req.query
        const event = await Event.findById(eventID)

        // check
        if (!event) {
            return res.status(404).json({
                message: 'Event not found'
            })
        }

        if (userID !== event.host.toString()) {
            return res.status(400).json({
                message: 'Event does not belong to the user'
            })
        }

        // delete event
        if (event.image) {
            const filePath = path.join(__dirname, 'public/assets', event.image)
            
            if (fs.existsSync(filePath)) {
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error('Error deleting file:', err)
                        return res.status(500).json({ message: 'Error deleting file' })
                    }
                    console.log('File deleted successfully')
                })
            }
        }

        await Event.deleteOne({ _id: eventID })

        res.status(200).json({
            message: "Event deleted successfully"
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const updateEvent = async (req, res) => {
    try {

        // get data
        const updatesString = req.body.updates
        const updates = JSON.parse(updatesString)

        if (req.file) {
            const imagePath = req.file.path.replace('public/', '')
            updates.image = imagePath
        }

        const userID = req.user.id
        const { eventID } = req.query
        const event = await Event.findById(eventID)

        // check
        if (!event) {
            return res.status(404).json({
                message: 'Event not found'
            })
        }

        if (userID !== event.host.toString()) {
            return res.status(400).json({
                message: 'Event does not belong to the user'
            })
        }

        // update event
        const updatedEvent = await Event.findOneAndUpdate(
            { _id: eventID },
            { $set: updates },
            { new: true, runValidators: true }
        )

        res.status(200).json({
            message: "Event updated successfully",
            event: updatedEvent
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getSingleEvent = async (req, res) => {
    try {

        // get data
        const { eventID } = req.params
        
        // get event
        const event = await Event.findById(eventID)
        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            })
        }

        res.status(200).json({
            message: "Event found successfully",
            event
        })

    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getEventsByType = async (req, res) => {
    try {

        // get data
        const { type, fetchAll } = req.query

        // get events
        const today = new Date()
        let events = await Event.find({ type, 'specificDateInfo.date': { $gte: today } })
                                .sort({ createdAt: -1 })

        if (!fetchAll) {
            events = events.limit(4)
        }

        // get only essential
        const eventData = events.map(event => {

            const dates = event.specificDateInfo.map(info => info.date)
            const locations = event.specificDateInfo.map(info => info.location)

            return {
                title: event.title,
                image: event.image,
                dates,
                locations
            }
        })

        res.status(200).json({
            message: "Events found by type successfully",
            events: eventData
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export { createEvent, deleteEvent, updateEvent, getSingleEvent, getEventsByType }