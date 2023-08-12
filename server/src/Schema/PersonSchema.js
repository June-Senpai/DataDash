const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PersonSchema = new Schema({
  serialNumber: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /\d{10}/.test(v)
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /\S+@\S+\.\S+/.test(v)
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  hobbies: {
    type: String,
    required: true,
  },
})

const Person = mongoose.model("Person", PersonSchema)
module.exports = Person
