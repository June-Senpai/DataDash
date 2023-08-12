const express = require("express")
const dotenv = require("dotenv").config()
const cors = require("cors")
const connectToDatabase = require("./config/mongo")
const app = express()
const Person = require("./Schema/PersonSchema")

app.use(cors())

app.use(express.json())

connectToDatabase()

app.post("/create", async (req, res) => {
  try {
    const data = new Person(req.body)
    await data.save()
    res.status(201).json(data)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.get("/read", async (req, res) => {
  try {
    const data = await Person.find()
    res.status(200).json(data)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.post("/update", async (req, res) => {
  try {
    const { serialNumber, ...rest } = req.body
    const data = await Person.findOneAndUpdate({ serialNumber }, rest)
    console.log({ data, body: req.body, rest })
    await data.save()
    res.status(201).json(data)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.delete("/delete/:serialNumber", async (req, res) => {
  try {
    const { serialNumber } = req.params
    const data = await Person.findOneAndDelete({ serialNumber })
    res.status(201).json(data)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.listen(process.env.PORT, () =>
  console.log(`Listening on port http://localhost:${process.env.PORT}`)
)
