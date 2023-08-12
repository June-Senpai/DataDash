import { useRef } from "react"
const useModal = () => {
  const ref = useRef()
  const open = () => ref.current.showModal()
  const close = () => ref.current.close()
  return [ref, open, close]
}

export default useModal
