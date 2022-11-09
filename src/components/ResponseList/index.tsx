import styles from "./ResponseList.module.css"
import { Reply } from "../../lib/contract"


type ResponseListProps = {
  replies: Reply[]
}

const ResponseList = ({ replies }: ResponseListProps) => {
  return (
    <div className={styles["response-list"]}>
      {replies && (
        <table className={styles["styled-table"]}>
          <thead>
            <tr>
              <th>Address</th>
              <th>Response</th>
            </tr>
          </thead>
          <tbody>
            {replies.map((reply, index) => (
              <tr key={index}>
                <td>{reply.addr}</td>
                <td>{reply.reply.text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default ResponseList