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

const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")

    const fullName = user ? `${user.firstName} ${user.lastName}` : "Guest";
    
    const handleAuthAction = () => {
        if (fullName === "Guest") {
            navigate("/login");
        } else {
            dispatch(setLogout());
        }
    };

    const StyledTab = styled(Tab)(({ theme }) => ({
        '&:hover': {
            backgroundColor: "#f0f0f0",
        },
    }));

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

            {/* Desktop nav */}
            {isNonMobileScreens && (
                <FlexBetween gap="2rem">
                    <Tabs value={false} aria-label="Navigation Tabs">
                        <StyledTab
                            label="Movies"
                            component={Link}
                            to="/movies"
                        />
                        <StyledTab
                            label="Theater"
                            component={Link}
                            to="/theater"
                        />
                        <StyledTab
                            label="Music"
                            component={Link}
                            to="/music"
                        />
                        <StyledTab
                            label="Sports"
                            component={Link}
                            to="/sports"
                        />
                    </Tabs>

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
                            <MenuItem onClick={handleAuthAction}>
                                {fullName === "Guest" ? "Log In" : "Log Out"}
                            </MenuItem>
                        </Select>
                    </FormControl>
                </FlexBetween>
            )}
        </FlexBetween>
    )
}

export default Navbar
