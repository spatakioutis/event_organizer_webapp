import Event from './models/Events.js'

const updateEventStatus = async () => {
    const now = new Date()

    try {
        // Find events where at least one date is in the past and its status is not 'past'
        const events = await Event.find({})

        // Iterate over each event and update specificDateInfo if necessary
        for (let event of events) {
            let isUpdated = false

            for (let specificDateInfo of event.specificDateInfo) {
                if (specificDateInfo.date < now && specificDateInfo.status !== 'past') {
                    specificDateInfo.status = 'past'
                    isUpdated = true
                }
            }

            if (isUpdated) {
                await event.save()
            }
        }

        console.log('[Scheduled Task Manager] Events\' status updated successfully')
    } catch (error) {
        console.error('[Scheduled Task Manager] Error updating Events\' status: ', error)
    }
}

export { updateEventStatus }