import { forwardRef } from "react"
import Button from "../button"

const Modal = forwardRef(({ closeModal, children, header }, ref) => {
  return (
    <dialog
      ref={ref}
      className="border-2 rounded-xl w-fit border-gray-300 backdrop:bg-gray-50 backdrop:opacity-70 "
    >
      <div className="flex justify-between items-center border-b-2 p-8">
        <h1 className="text-3xl"> {header}</h1>
        <Button onClick={closeModal}>Cancel</Button>
      </div>
      <div className="p-8">{children}</div>
    </dialog>
  )
})

Modal.displayName = "Modal"

export default Modal
