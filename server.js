const express = require("express")
const path = require("path")
const { writeFile, readFile } = require("fs")
const {v4 : uuidv4} = require("uuid") //generates unique ids
const notes = require("./db/db.json")

const PORT = process.env.PORT || 3001

const app = express()

//middleware 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

// html route return note

app.get("/notes", (req, res) =>
    res.sendFile(path.join(__dirname, "/public/notes.html"))
)

//API route to read db.json and return saved notes as JSON
app.get("/api/notes", (req, res) => {

    console.info(`${req.method} request received to get notes`)

    readFile("./db/db.json", "utf-8", (err, data) => {
        err? console.log(err) : res.json(JSON.parse(data))
    })

    console.log(notes)
})

// What happens when we get a new notes and we want to save it Brou note

//API route to read db.json and return saved notes as JSON
app.get("/api/notes", (req, res) => {

    console.info(`${req.method} request received to get notes`)

    readFile("./db/db.json", "utf-8", (err, data) => {
        err? console.log(err) : res.json(JSON.parse(data))
    })

    console.log(notes)
})
//API route to receive new note to save on request body, add it to db.json and return new note to client
app.post("/api/notes", (req, res) => {
    console.info(`${req.method} request received to add a note`)

    const { title, text } = req.body

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        }

        readFile(`./db/db.json`, "utf-8", (err, data) => {
            if (err) {
                throw err
            }

            const dataString = JSON.parse(data)
            dataString.push(newNote)

            writeFile(`./db/db.json`, JSON.stringify(dataString, null, 4), (err) =>
            err ? console.error(err) : console.log("Note has been written to JSON file🤓")
        )
        })

        const response = {
            status: "success",
            body: newNote,
        }

        console.log(response)
        res.status(201).json(response)
    } else {
        res.status(500).json("Error writing note")
    }

})

