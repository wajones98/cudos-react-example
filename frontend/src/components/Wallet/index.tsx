import styles from "./Wallet.module.css"

type WalletProps = {
  login: () => void
  account?: string
}

const Wallet = ({ login, account }: WalletProps) => {
  let disabled = false
  let message = "Connect"

  if (account) {
    disabled = true
    message = `${account.substring(0, 6)}....${account.substring(account.length-4, account.length)}`
  }

  return (
    <div className={styles["wallet"]}>
      <button
        className={styles["wallet-button"] + " button"}
        onClick={login}
        disabled={disabled}
      >
        {message}
      </button>
    </div>
  )
}

export default Wallet
