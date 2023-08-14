const express = require("express")
const path = require("path")
const { writeFile, readFile } = require("fs")
const {v4 : uuidv4} = require("uuid") //generates unique ids
const notes = require("./Develop/db/db.json")
const apiRoutes = require("./Develop/routes/apiRoutes")
const htmlRoutes = require("./Develop/routes/htmlRoutes")

const PORT = process.env.PORT || 3000

const app = express()

//middleware 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use("/api", apiRoutes)
app.use("/", htmlRoutes)

// start the server on this port 3000
app.listen(PORT, function() {
    console.log(`Now listening to port ${PORT}. Enjoy your stay!`);
})
