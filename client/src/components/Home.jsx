import Modal from "../components/Create/Modal"
import useModal from "../hooks/useModal"
import Form from "./Create/Form"
import Table from "./Create/Table"
import { useState, useEffect } from "react"
import axios from "axios"

const initialFormData = {
  serialNumber: "",
  name: "",
  phone: "",
  email: "",
  hobbies: "",
  mode: "CREATE",
}

const Home = () => {
  const [ref, openModal, closeModal] = useModal()
  const [data, setData] = useState([])
  const [selectedRows, setSelectedRows] = useState({})
  const [formData, setFormData] = useState(initialFormData)

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/read`
      )
      console.log({ response })
      setData(response.data)
      setFormData((prevState) => {
        return {
          ...prevState,
          serialNumber: response.data.length + 1,
        }
      })
    }
    fetchData()
  }, [])

  const isAnyRowSelected = Object.values(selectedRows).some(
    (value) => value === true
  )

  const sendButtonColor = isAnyRowSelected ? "bg-blue-500" : "bg-gray-500"

  const handleAddNewItem = () => {
    const newSerialNumber = data.length + 1
    setFormData({ ...initialFormData, serialNumber: newSerialNumber })
    openModal()
  }

  const handleEmail = () => {
    const selectedRowsArray = Object.entries(selectedRows)

    const to = "keshav01juneja@gmail.com"
    const subject = "Data of selected rows"
    const body = selectedRowsArray.map((row) => {
      const { name, phone, email, hobbies } = data.find(
        (data) => data.serialNumber === row[0]
      )
      return `
      <td className="border-2 w-32 border-gray-500 px-6 py-2">
      ${name}
      </td>
      <td className="border-2 w-32 border-gray-500 px-6 py-2">
      ${phone}
      </td>
      <td className="border-2 w-32 border-gray-500 px-6 py-2">
      ${email}
      </td>
      <td className="border-2 w-32 border-gray-500 px-6 py-2">
      ${hobbies}
      </td>
      `
    })
    const mailtoUrl = `mailto:${to}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`
    window.location.href = mailtoUrl
    console.log({ mailtoUrl })
  }

  return (
    <>
      <div className="flex items-center justify-center gap-36 text-3xl my-10 text-white font-semibold">
        <button
          onClick={handleAddNewItem}
          className="bg-green-500 rounded-lg px-6 py-4"
        >
          Add new
        </button>
        <button
          disabled={!isAnyRowSelected}
          onClick={() => handleEmail()}
          className={`${sendButtonColor} rounded-lg px-6 py-4`}
        >
          Send data of selected rows
        </button>
      </div>
      <Table
        data={data}
        setSelectedRows={setSelectedRows}
        selectedRows={selectedRows}
        openModal={openModal}
        setFormData={setFormData}
        setData={setData}
      />
      <Modal ref={ref} closeModal={closeModal} header="Form">
        <Form
          setData={setData}
          formData={formData}
          setFormData={setFormData}
          closeModal={closeModal}
        />
      </Modal>
    </>
  )
}

export default Home
