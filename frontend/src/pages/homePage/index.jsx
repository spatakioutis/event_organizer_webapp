import { Box } from "@mui/material"
import Navbar from '../../pages/navbar'
import EventRow from "../../components/EventRow"

const HomePage = () => {
    return (<>
        <Navbar />
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            gap="20px"
            marginTop="25px"
        >
            <EventRow 
                category="Newest"
            />
            <EventRow 
                category="Music"
            />
            <EventRow 
                category="Theater"
            />
            <EventRow 
                category="Movies"
            />
            <EventRow 
                category="Sports"
            />
        </Box>
    </>)
}

export default HomePage