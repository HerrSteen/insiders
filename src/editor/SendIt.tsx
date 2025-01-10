import { faHandsHolding, faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { toggleSendItIcon } from "./editorSlice"

const SendIt: React.FC = () => {
  const dispatch = useDispatch()
  console.log("SendIt render")
  useEffect(() => {
    const timer = setTimeout(() =>
      dispatch(toggleSendItIcon()), 3000)
    return () => clearTimeout(timer);
  }, [dispatch])

  return <div className="sendIt__wrapper">
    {/* <FontAwesomeIcon icon={faPaperPlane} size="2xl" />
     */}
    <FontAwesomeIcon className="sendIt__icon" icon={faHandsHolding} size="9x" color="#e9e617" />
  </div>
}

export default SendIt
