import { useState } from "react"
import { 
    Box,
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useMediaQuery,
    Tabs, 
    Tab,
    styled
 } from "@mui/material"
import {
    Search,
    Message,
    Notifications,
    Help
} from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { setLogout } from "../../state"
import { useNavigate, Link } from "react-router-dom"
import FlexBetween from "../../components/FlexBetween"
import UserImage from "../../components/UserImage"

const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")

    const fullName = `${user.firstName} ${user.lastName}`

    const StyledTab = styled(Tab)(({ theme }) => ({
        '&:hover': {
            backgroundColor: "#f0f0f0",
        },
    }))

    return (
        <Box 
            display="flex"
            justifyContent="space-evenly"
            alignItems="center"
            padding="1rem" 
            backgroundColor="white"
            gap="100px"
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "50px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                zIndex: 10
            }}
        >
            <Box 
                gap="1.75rem" 
                display="flex"

            >
                <Typography
                    fontWeight="bold"
                    fontSize="clamp(1rem, 2rem, 2.25rem)"
                    color="#800080"
                    onClick={() => navigate("/home")}
                    sx={{
                        ":hover": {
                            color: "#9370DB",
                            cursor: "pointer"
                        }
                    }}
                    marginLeft="-20px"
                    backgroundColor="white"
                >
                    Eventory
                </Typography>
                {isNonMobileScreens && (
                    <FlexBetween 
                        backgroundColor="white"
                        border="1px solid #ccc" 
                        borderRadius="9px" 
                        gap="3rem"
                        padding="0.1rem 1.5rem"
                    >
                        <InputBase placeholder="Search..."/>
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                )}
            </Box>

            {/* Desktop nav */}
            {isNonMobileScreens && (
                <FlexBetween gap="2rem">
                    <Tabs value={false} aria-label="Navigation Tabs">
                        <StyledTab
                            label="Newest"
                            component={Link}
                            to="/events/category/Newest"
                        />
                        <StyledTab
                            label="Movies"
                            component={Link}
                            to="/events/category/Movies"
                        />
                        <StyledTab
                            label="Theater"
                            component={Link}
                            to="/events/category/Theater"
                        />
                        <StyledTab
                            label="Music"
                            component={Link}
                            to="/events/category/Music"
                        />
                        <StyledTab
                            label="Sports"
                            component={Link}
                            to="/events/category/Sports"
                        />
                    </Tabs>

                    <FormControl 
                        variant="standard" 
                        value={fullName}
                    >
                        <Select
                            value={fullName}
                            style={{
                                minWidth: '150px',
                                width: 'auto'
                            }}
                            sx={{
                                border: "1px solid #ccc",
                                backgroundColor: "#f0f0f0",
                                width: "150px",
                                borderRadius: "0.25rem",
                                p: "0.25rem 1rem",
                                "& .MuiSvgIcon-root": {
                                    pr: "0.25rem",
                                    width: "3rem"
                                },
                                "& .MuiSelect-select:focus": {
                                    backgroundColor: "#f0f0f0"
                                }
                            }}
                            input={<InputBase />}
                        >
                            <MenuItem
                                onClick={() => navigate(`/profile/${user._id}`)}
                                value={fullName}
                                style={{
                                    minWidth: '150px',
                                    width: 'auto'
                                }}
                            >
                                <Typography>{fullName}</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => {
                                dispatch(setLogout())
                                navigate('/login')
                            }}>
                                Log Out
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <UserImage 
                        image={user.profilePic} 
                    />
                </FlexBetween>
            )}
        </Box>
    )
}

export default Navbar
