import { 
    Box,
    Typography 
 } from "@mui/material"
import Navbar from '../../pages/navbar'
import EventRow from "../../components/EventRow"

const HomePage = () => {
    return (<>
        <Navbar />
        {/* <Box
            flex="1"
            sx={{
                position: 'absolute',
                left: 0, 
                top: '-100%',
                bottom: 0,
                width: '100vw',
                backgroundColor: 'lightblue', 
                clipPath: 'ellipse(70% 30% at 50% 50%)', 
                zIndex: 0,
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)"
            }}
        >
        </Box> */}
        <Box
            marginTop="80px"
            padding="100px 150px"
            sx={{
                zIndex: 1,
                backgroundColor: 'rgb(100, 20, 100)',
                borderRadius: "40% 0 40% 0",
                boxShadow: "6px 6px 3px 3px rgba(0, 0, 0, 0.3)"
            }}
        >
            <Typography color="white" variant="h4" fontWeight="bold" gutterBottom>
                Welcome to Eventory, the best place to <br /> manage and book events!
            </Typography>
            <Typography color="white" variant="body1" paragraph>
                Book your next tickets and enjoy your favorite events in just a few steps! 
            </Typography>
            <Typography color="white" variant="body1" paragraph>
                Want to create your own event? No problem! We got you covered!
            </Typography>
        </Box>
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            gap="140px"
            marginTop="90px"
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