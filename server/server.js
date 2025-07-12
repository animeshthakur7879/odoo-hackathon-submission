const express = require("express")
require("dotenv").config()
const colors = require("colors")

const PORT = process.env.PORT || 5000

const app = express()
const cors = require("cors")
const connectDb = require("./config/db_config")

//db connection
connectDb()

//Default Routes
app.get("/" , (req , res) => {

    res.json({
        msg : "Odoo Hackathon API is live"
    })

})

app.listen(PORT , () => {
    console.log(`Server is running at port : ${PORT}`.bgCyan)
})
