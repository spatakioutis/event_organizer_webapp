import { Box } from "@mui/material"

const UserImage = ({ image, size = "60px" }) => {

    const imagePath = image.replace('public\\', '')

    return (
        <Box width={size} height={size}>
            <img
                style={{ objectFit: "cover" , borderRadius: "50%" }}
                width={size}
                height={size}
                alt="user"
                src={`http://localhost:3001/${imagePath}`}
            />
        </Box>
  )
}

export default UserImage