import { 
    Box,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useMediaQuery,
    TextField,
    Button
 } from "@mui/material"
import FlexBetween from "../../components/FlexBetween";
import Navbar from "../navbar";
import { Formik } from "formik"
import Dropzone from "react-dropzone"
import * as yup from "yup"
import axios from 'axios'
import { useState } from "react"
import { useSelector } from "react-redux"

const validationSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    duration: yup.number().required("Duration is required").min(0, "Duration must be positive"),
    image: yup.string().required("Image is required"),
    description: yup.string().required("Description is required"),
    ticketPrice: yup.number().required("Ticket price is required").min(0, "Ticket price must be positive"),
    type: yup.string().required('Type is required').notOneOf(['Type'], 'Type is required'),
    specificDateInfo: yup.array().of(
        yup.object().shape({
            date: yup.string().required('Date is required'),
            location: yup.string().required('Location is required'),
            totalSeats: yup.number().required('Number of seats is required').min(0, 'Total seats must be a non-negative number')
        })
    )
})

const initialValues = {
    title: "",
    duration: 0,
    image: "",
    description: "",
    ticketPrice: 0,
    type: ""
}

const UpdateEvent = () => {

    const token = useSelector((state) => state.token)
    const [selectedType, setSelectedType] = useState("Type")
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const isNonMobile = useMediaQuery("(min-width: 1000px)")

    const updateEvent = async (values, onSubmitProps) => {

        const formData = new FormData()
        for (let key in values) {
            if (key === "image" && values.image) {
                formData.append("image", values.image)
            }
            else {
                formData.append(key, values[key])
            }
        }        

        try {
            const response = await axios.post(
                "http://localhost:3001/events",
                formData,
                {
                    headers: { "Authorization": `Bearer ${token}`}
                }
            )
            console.log(response)
            onSubmitProps.resetForm()
            setSuccessMessage("Event updated successfully")
        }
        catch (error) {
            console.error("Error while trying to update event: ", error)
            setSuccessMessage("")
            setErrorMessage(error.response.data.error)
        }
    }

    const handleFormSubmit = async (values, onSubmitProps) => {
        await updateEvent(values, onSubmitProps)
    }

    return (<>
        <Navbar />
        <Box
            margin="100px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            gap="15px"
        >
            <Typography color="black" fontWeight="bold" fontSize="26pt" sx={{textIndent: "-180px"}}>
                Update event information
            </Typography>
            <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
            >
                    {
                        ({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            setFieldValue,
                            resetForm
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Box 
                                    display="grid"
                                    gap="20px"
                                    gridTemplateColumns="repeat(3, 1fr)"
                                    maxWidth="580px"
                                    sx = {{
                                        "& > div": {gridColumn: isNonMobile ? undefined : "span 4"}
                                    }}
                                >
                                    <Typography
                                        color="black"
                                        sx={{ gridColumn: "span 3" }}
                                    >
                                        General Event Information
                                    </Typography>
                                    <TextField 
                                        label="Title"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.title}
                                        name="title"
                                        error={Boolean(touched.title) && Boolean(errors.title)}
                                        helperText={touched.title && errors.title}
                                        sx={{ gridColumn: "span 3" }}
                                    />
                                    <FormControl 
                                        sx={{ gridColumn: "span 1" }}
                                        variant="standard" 
                                        value={selectedType}
                                        color="black"
                                    >
                                        <Select
                                            displayEmpty
                                            value={selectedType}
                                            onChange={(e) => {
                                                setFieldValue('type', e.target.value)
                                                setSelectedType(e.target.value)
                                            }}
                                            style={{
                                                minWidth: '150px',
                                                width: 'auto',
                                                height: '100%'
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
                                            <MenuItem value="Type" disabled>Type</MenuItem>
                                            <MenuItem value="Movies">Movies</MenuItem>
                                            <MenuItem value="Theater">Theater</MenuItem>
                                            <MenuItem value="Music">Music</MenuItem>
                                            <MenuItem value="Sports">Sports</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <TextField 
                                        label="Duration"
                                        type="number"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.duration}
                                        name="duration"
                                        error={Boolean(touched.duration) && Boolean(errors.duration)}
                                        helperText={touched.duration && errors.duration}
                                        sx={{ gridColumn: "span 1"}}
                                    />
                                    <TextField 
                                        label="Ticket Price"
                                        type="number"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.ticketPrice}
                                        name="ticketPrice"
                                        error={Boolean(touched.ticketPrice) && Boolean(errors.ticketPrice)}
                                        helperText={touched.ticketPrice && errors.ticketPrice}
                                        sx={{ gridColumn: "span 1" }}
                                    />
                                    <TextField 
                                        label="Description"
                                        multiline
                                        rows={6}
                                        fullWidth
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.description}
                                        name="description"
                                        error={Boolean(touched.description) && Boolean(errors.description)}
                                        helperText={touched.description && errors.description}
                                        sx={{ gridColumn: "span 3"}}
                                    />
                                    <Box
                                        gridColumn="span 3"
                                        border={"1px solid grey"}
                                        borderRadius="5px"
                                        p="1rem"
                                    >
                                        <Dropzone
                                            acceptedFiles=".jpg,.jpeg,.png"
                                            multiple={false}
                                            onDrop={(acceptedFiles) => {
                                                setFieldValue("image", acceptedFiles[0])
                                            }}
                                        >
                                            {
                                                ({getRootProps, getInputProps}) => (
                                                    <Box
                                                        color="black"
                                                        {...getRootProps()}
                                                        border={"2px dashed #9b59b6"}
                                                        p="1rem"
                                                        sx={{ 
                                                            "&:hover": { 
                                                                cursor: "pointer",
                                                                border: "2px dashed #BFA0C1"
                                                            } 
                                                        }}
                                                    >
                                                        <input {...getInputProps()} />
                                                        {!values.image ? (
                                                            <p style={{textAlign: "center"}}>
                                                                Add image here
                                                            </p>
                                                        ) : (
                                                            <FlexBetween>
                                                                <Typography>
                                                                    {values.image.name}
                                                                </Typography>
                                                            </FlexBetween>
                                                        )}
                                                    </Box>
                                                )
                                            }
                                        </Dropzone>
                                    </Box>
                                    {errorMessage && (
                                        <Typography
                                            color="red"
                                            fontWeight="bold"
                                            sx={{ gridColumn: "span 3" }}
                                            maxWidth="100%"
                                        >
                                            {errorMessage}
                                        </Typography>
                                    )}

                                    <Box sx={{ gridColumn: "span 3" }}>   
                                        <Button
                                            fullWidth
                                            type="submit"
                                            sx={{
                                                m: "0",
                                                p: "1rem",
                                                backgroundColor: "#800080",
                                                color: "white",
                                                "&:hover" : { 
                                                    color: "white",
                                                    border: "1px solid #ccc",
                                                    backgroundColor: "#9b59b6"
                                                },
                                                gridColumn: "span 3"
                                            }}
                                        >
                                            UPDATE EVENT
                                        </Button>
                                    </Box>
                                    {successMessage && (
                                        <Typography
                                            color="green"
                                            fontWeight="bold"
                                            sx={{ gridColumn: "span 3" }}
                                        >
                                            {successMessage}
                                        </Typography>
                                    )}
                                </Box>
                            </form>
                        )
                    }
            </Formik>
        </Box>
    </>)
}

export default UpdateEvent