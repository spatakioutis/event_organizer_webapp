import { 
    Box, 
    Typography
} from "@mui/material"
import Navbar from "../navbar"
import EventCard from "../../components/EventCard"
import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import axios from "axios"

const EventTypePage = () => {

    const token = useSelector((state) => state.token)
    const navigate = useNavigate()
    const {type} = useParams()
    const [events, setEvents] = useState([])

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                if (type === "Newest") {
                    const {data: response} = await axios.get(
                        `http://localhost:3001/events/newest?fetchAll=true`,
                        {
                            headers: { "Authorization": `Bearer ${token}`}
                        }
                    )
                    setEvents(response.events)
                }
                else {
                    const {data: response} = await axios.get(
                        `http://localhost:3001/events/type?type=${type}&fetchAll=${true}`,
                        {
                            headers: { "Authorization": `Bearer ${token}`}
                        }
                    )
                    setEvents(response.events)
                } 
            }
            catch (error) {
                console.error("Erro fetching events of type: " + type , error)
            }
        }
        fetchEvents()
    }, [type])

    const eventCards = events.map(event => <EventCard key={event._id} event={event} />)

    return (<>
        <Navbar />
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <Typography 
                color="black"
                fontWeight="bold"
                fontSize="2.5rem"
                margin="10px 0"
            >
                {type}
            </Typography>
            {eventCards.length > 0 ? (
                <Box
                    padding="0 20px"
                    display="grid"
                    gap="15px"
                    gridTemplateColumns="repeat(5, 1fr)" 
                >
                    {eventCards}
                </Box>
            ) : (
                <Typography 
                    color="black"
                    fontSize="1.3rem"
                >
                    {`No ${type} events exist at the moment!`}
                </Typography>                
            )
            }
        </Box>
    </>)
}

export default EventTypePage