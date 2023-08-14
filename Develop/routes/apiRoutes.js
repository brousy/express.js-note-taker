// Making the page work, api is the middleware
const router = require("express").Router()

router.get("/api/notes", (req, res) => {

    console.info(`${req.method} request received to get notes`)

    readFile("./db/db.json", "utf-8", (err, data) => {
        err? console.log(err) : res.json(JSON.parse(data))
    })

    console.log(notes)
})
//API route to receive new note to save on request body, add it to db.json and return new note to client
router.post("/api/notes", (req, res) => {
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

module.exports = router;
