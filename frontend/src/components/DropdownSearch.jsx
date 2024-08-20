import * as React from 'react'
import { 
    Box,
    MenuList, 
    MenuItem,
    Typography
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

const DropdownSearch = (props) => {

    const navigate = useNavigate()

    const handleClick = (query) => {
        navigate(`/events/${query.event.eventID}`)
    }

    const dropdownItems = props.events.map(event => {
        return (
            <MenuItem 
                onClick={() => handleClick({event})} 
                key={event.eventID}
                sx={{ paddingBottom: "10px"}}
            >
                <Typography 
                    color="black"
                    sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                    }}
                >
                    {event.title}
                </Typography>
            </MenuItem>
        )
    })
    
    return (
        <Box 
            sx={{
                backgroundColor: 'white',
                color: 'white',
                position: "absolute",
                top: "67px",
                left: "12.4%", 
                width: "19%", 
                padding: "5px 1rem",
                boxShadow: "0px 3px 20px rgba(0, 0, 0, 0.3)",
                zIndex: 11
            }}
        >
            <MenuList
                sx={{width: "100%"}}
            >
                {dropdownItems.length > 0 ? dropdownItems : (
                    <Typography color="black">
                        No search results found...
                    </Typography>
                )}
            </MenuList>
        </Box> 
    )
}

export default DropdownSearch