import { useState, ChangeEvent } from "react"
import styles from "./ResponseForm.module.css"

type ResponseFormProps = {
  submit: (reply: string) => Promise<void>
}

const ResponseForm = ({ submit }: ResponseFormProps) => {
  const [reply, setReply] = useState("")
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    let val = event.target.value.trim()
    setReply(val)
  }

  return (
    <div className={styles["response-container"]}>
      <label htmlFor="reply-input">Your Response</label>
      <input
        type="text"
        name=""
        id={styles["reply-input"]}
        placeholder="type a response..."
        onChange={handleChange}
      />
      <button
        className="button"
        disabled={reply.length <= 0}
        onClick={(e) => {
          e.preventDefault()
          submit(reply)
        }}
      >
        Post
      </button>
    </div>
  )
}

export default ResponseForm
