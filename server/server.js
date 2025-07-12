const express = require("express")
require("dotenv").config()
const colors = require("colors")

const PORT = process.env.PORT || 5000

const app = express()
const cors = require("cors")
const connectDb = require("./config/db_config")

//db connection
connectDb()

//Middlewares
app.use(express.json())
app.use(express.urlencoded())


//Default Routes
app.get("/" , (req , res) => {

    res.json({
        msg : "Odoo Hackathon API is live"
    })

})

//AUTH ROUTES
app.use("/api/auth" , require("./Routes/authRoutes"))

//Question Routes
app.use("/api/question" , require("./Routes/questionRoutes"))

//Answer Routes
app.use("/api/answer" , require("./Routes/answerRoutes"))


//Like Routes
app.use("/api/like" , require("./Routes/likeRoutes"))

app.listen(PORT , () => {
    console.log(`Server is running at port : ${PORT}`.bgCyan)
})
