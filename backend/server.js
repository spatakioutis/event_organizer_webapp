import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import helmet from "helmet"
import morgan from "morgan"
import path from "path"
import { fileURLToPath } from "url"

import authRoute from "./routes/auth.js"
import { verifyToken } from "./middleware/authorization.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()

const app = express()

app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())
app.use("/assets", express.static(path.join(__dirname, "public/assets")))

app.use('/auth', authRoute)

// app.get("/test", verifyToken, (req, res) => {
// 	res.status(200).json({
// 		message: "Hello, you are authorized!"
// 	})
// })

const PORT = process.env.PORT || 6001

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
	console.log("Database connected successfully")

	app.listen(PORT, () => {
		console.log(`Server listening on port ${PORT}`)
	})
})
.catch(error => console.error("Error: ", error))