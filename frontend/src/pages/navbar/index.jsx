import { useState } from "react"
import { 
    Box,
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useMediaQuery
 } from "@mui/material"
import {
    Search,
    Message,
    Notifications,
    Help,
    Menu,
    Close
} from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { setLogout } from "../../state"
import { useNavigate } from "react-router-dom"
import FlexBetween from "../../components/FlexBetween"

const Navbar = () => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")

    //const fullName = `${user.firstName} ${user.lastName}`
    const fullName = user ? `${user.firstName} ${user.lastName}` : "Guest";
    
    return (
        <FlexBetween padding="1rem 6%" backgroundColor="white">
            <FlexBetween gap="1.75rem">
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
                    more.com
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
            </FlexBetween>

            {/*desktop nav*/}
            {isNonMobileScreens ? (
                <FlexBetween gap="2rem">

                    <Message sx={{fontSize: "25px", color: "black", ":hover": {cursor: "pointer"}}} />
                    <Notifications sx={{fontSize: "25px", color: "black", ":hover": {cursor: "pointer"}}} />
                    <Help sx={{fontSize: "25px", color: "black", ":hover": {cursor: "pointer"}}} />
                    
                    <FormControl variant="standard" value={fullName}>
                        <Select
                            value={fullName}
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
                            <MenuItem value={fullName}>
                                <Typography>{fullName}</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => dispatch(setLogout())}>
                                Log Out
                            </MenuItem>
                        </Select>
                    </FormControl>
                </FlexBetween> 
            ) : (
                <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                    <Menu />
                </IconButton>
            )}

            {/* Mobile nav*/}
            {!isNonMobileScreens && isMobileMenuToggled && (
                <Box
                    position="fixed"
                    right="0"
                    bottom="0"
                    height="100%"
                    zIndex="10"
                    maxWidth="500px"
                    minWidth="300px"
                    backgroundColor="red"
                >
                    {/* close icon */}
                    <Box 
                        display="flex" 
                        justifyContent="flex-end"
                        p="1rem"
                    >
                        <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                            <Close />
                        </IconButton>
                    </Box>

                    {/* menu items */}
                    <FlexBetween 
                        display="flex" 
                        flexDirection="column"  
                        justifyContent="center"
                        alignItems="center"
                        gap="3rem"
                    >
                        <Message sx={{fontSize: "25px", color: "black"}} />
                        <Notifications sx={{fontSize: "25px", color: "black"}} />
                        <Help sx={{fontSize: "25px", color: "black"}} />

                        <FormControl variant="standard">
                            <Select
                                sx={{
                                    backgroundColor: "white",
                                    width: "150px",
                                    borderRadius: "0.25rem",
                                    p: "0.25rem 1rem",
                                    ".MuiSvgIcon-root": {
                                        pr: "0.25rem",
                                        width: "3rem"
                                    },
                                    ".MuiSelect-select:focus": {
                                        backgroundColor: "yellow"
                                    }
                                }}
                                input={<InputBase />}
                            >
                                <MenuItem >
                                    <Typography>{fullName}</Typography>
                                </MenuItem>
                                <MenuItem onClick={() => dispatch(setLogout())}>
                                    Log Out
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </FlexBetween> 
                </Box>
            )}
        </FlexBetween>
    )
}

export default Navbar