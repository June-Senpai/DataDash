import { useState } from "react"
import axios from "axios"
import Button from "../button"
const Form = ({
  closeModal,
  setData,
  setFormData,
  formData: { name, phone, email, hobbies, serialNumber, mode },
}) => {
  const [errors, setErrors] = useState({})

  const isUpdateMode = mode === "UPDATE"

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (validate()) {
      try {
        const dataToAdd = {
          serialNumber,
          name,
          phone,
          email,
          hobbies,
        }
        setData((prevState) => {
          let indexToUpdate = prevState.findIndex(
            (item) => item.serialNumber === serialNumber
          )
          indexToUpdate =
            indexToUpdate === -1 ? prevState.length : indexToUpdate
          const newState = [...prevState]
          newState[indexToUpdate] = dataToAdd
          return newState
        })
        closeModal()
        const routeFragment = isUpdateMode ? "update" : "create"
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/${routeFragment}`,
          dataToAdd
        )
        console.log(response.data)
      } catch (error) {
        console.error(error.response.data)
      }
    }
  }

  const validate = () => {
    let errors = {}
    let isValid = true

    if (!name || name.length < 2) {
      errors.name = "Name must be at least 2 characters long"
      isValid = false
    }

    if (!phone || phone.length !== 10) {
      errors.phone = "Phone number must be exactly 10 digits long"
      isValid = false
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email must be a valid email address"
      isValid = false
    }

    if (!hobbies || hobbies.length === 0) {
      errors.hobbies = "Hobbies can not be empty"
      isValid = false
    }

    setErrors(errors)
    return isValid
  }

  return (
    <div className="flex place-content-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 w-[600px] rounded-md text-lg font-semibold "
      >
        <label className="flex flex-col">
          Name
          <input
            type="text"
            value={name}
            onChange={(event) =>
              setFormData((prevState) => ({
                ...prevState,
                name: event.target.value,
              }))
            }
            className="border rounded p-2"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name}</span>
          )}
        </label>
        <label className="flex flex-col">
          Phone number
          <input
            type="tel"
            pattern="[0-9]{10}"
            value={phone}
            onChange={(event) =>
              setFormData((prevState) => ({
                ...prevState,
                phone: event.target.value,
              }))
            }
            className="border rounded p-2"
          />
          {errors.phone && (
            <span className="text-red-500 text-sm">{errors.phone}</span>
          )}
        </label>
        <label className="flex flex-col">
          Email
          <input
            type="email"
            value={email}
            onChange={(event) =>
              setFormData((prevState) => ({
                ...prevState,
                email: event.target.value,
              }))
            }
            className="border rounded p-2"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email}</span>
          )}
        </label>
        <label className="flex flex-col">
          Hobbies
          <textarea
            value={hobbies}
            onChange={(event) =>
              setFormData((prevState) => ({
                ...prevState,
                hobbies: event.target.value,
              }))
            }
            className="border rounded p-2"
          />
          {errors.hobbies && (
            <span className="text-red-500 text-sm">{errors.hobbies}</span>
          )}
        </label>
        <div className="flex justify-center">
          <Button onClick={handleSubmit}>
            {isUpdateMode ? "Update" : "Add new"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Form
