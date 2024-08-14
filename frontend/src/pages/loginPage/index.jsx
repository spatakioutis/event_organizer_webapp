import { 
    Box,
    Typography,
    useMediaQuery
} from "@mui/material"
import Form from "./Form"

const LoginPage = () => {
    
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")

    return (
        <Box>

            {/* title box */}
            <Box 
                width="100%" 
                backgroundColor="white"
                p="1rem 6%"
                textAlign="center"
                sx={{
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
                }}
            >
                <Typography
                    fontWeight="bold"
                    fontSize="32px"
                    color="#800080"
                >
                    more.com
                </Typography>
            </Box>

            {/* form box */}
            <Box
                width={isNonMobileScreens ? "50%" : "93%"}
                p="2rem"
                m="2rem auto"
                borderRadius="1.5rem"
                backgroundColor="white"
                sx={{
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
                }}
            >
                <Typography
                    fontWeight="500"
                    variant="h5"
                    color="black"
                    sx={{ mb: "1.5rem", textAlign: "center" }}
                >
                    Welcome to more.com, the Social Media to manage and book events!
                </Typography>

                <Form />
            </Box>
        </Box>
    )
}

export default LoginPage