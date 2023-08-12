import axios from "axios"

const Table = ({
  data,
  selectedRows,
  setSelectedRows,
  openModal,
  setFormData,
  setData,
}) => {
  console.log({ data })

  console.log({ selectedRows })

  const handleUpdate = (params) => {
    setFormData(params)
    openModal()
  }

  const handleDelete = async (serialNumber) => {
    setData((prevState) =>
      prevState.filter((item) => item.serialNumber !== serialNumber)
    )
    await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/delete/${serialNumber}`
    )
  }

  const isDataEmpty = data.length === 0

  return isDataEmpty ? (
    <div className="text-3xl flex justify-center items-center">
      No data found...
    </div>
  ) : (
    <div className="flex justify-center items-center">
      <table className="border-collapse">
        <thead>
          <tr className="text-2xl bg-blue-300 text-indigo-700">
            <th className="border-2 w-32 border-gray-500 px-6 py-2">ID</th>
            <th className="border-2 w-32 border-gray-500 px-6 py-2">Name</th>
            <th className="border-2 w-32 border-gray-500 px-6 py-2">Phone</th>
            <th className="border-2 w-32 border-gray-500 px-6 py-2">Email</th>
            <th className="border-2 w-32 border-gray-500 px-6 py-2">Hobbies</th>
            <th className="border-2 w-32 border-gray-500 px-6 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ serialNumber, name, phone, email, hobbies }) => (
            <tr key={serialNumber} className="bg-blue-100 text-2xl">
              <td className="border-2 w-32 border-gray-500 px-6 py-2 ">
                <div className="flex justify-between items-center">
                  <input
                    type="checkbox"
                    checked={selectedRows[serialNumber] || false}
                    onChange={(e) =>
                      setSelectedRows((prevState) => ({
                        ...prevState,
                        [serialNumber]: e.target.checked,
                      }))
                    }
                  />
                  {serialNumber}
                </div>
              </td>
              <td className="border-2 w-32 border-gray-500 px-6 py-2">
                {name}
              </td>
              <td className="border-2 w-32 border-gray-500 px-6 py-2">
                {phone}
              </td>
              <td className="border-2 w-32 border-gray-500 px-6 py-2">
                {email}
              </td>
              <td className="border-2 w-32 border-gray-500 px-6 py-2">
                {hobbies}
              </td>
              <td className="border-2 w-32 border-gray-500 px-6 py-2">
                <div className="flex justify-between items-center gap-4 text-white text-xl font-semibold">
                  <button
                    onClick={() =>
                      handleUpdate({
                        name,
                        phone,
                        email,
                        hobbies,
                        serialNumber,
                        mode: "UPDATE",
                      })
                    }
                    className="bg-teal-500 rounded-md p-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(serialNumber)}
                    className="bg-red-500 rounded-md p-2 "
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
