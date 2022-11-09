import { CosmWasmClient, SigningCosmWasmClient } from "cudosjs"
import { useEffect, useState } from "react"
import { setupKeplr } from "./lib/ledgers/Keplr"
import networks from "./lib/networks"

import Wallet from "./components/Wallet"
import "./App.css"
import ResponseList from "./components/ResponseList"
import ResponseForm from "./components/ResponseForm"
import Contract, { Reply } from "./lib/contract"

function App() {
  const [signingClient, setSigningClient] = useState<SigningCosmWasmClient>()
  const [greeting, setGreeting] = useState<string>()
  const [replies, setReplies] = useState<Reply[]>([])
  const [account, setAccount] = useState<string>()

  const network = networks(import.meta.env.VITE_NETWORK)
  const contract = new Contract(network)

  const getAndSetSigner = async () => {
    try {
      const clientResponse = await setupKeplr(network)
      setSigningClient(clientResponse)
    } catch (err) {
      console.log(err)
    }
  }

  const getAndSetAccount = async () => {
    if (signingClient) {
      const offlineSigner = window.keplr?.getOfflineSigner(network.chainId)
      const accounts = await offlineSigner?.getAccounts()
      if (accounts) {
        setAccount(accounts[0].address)
      }
    }
  }

  const getAndSetGreeting = async () => {
    const greetingResponse = await contract.getGreeting()
    setGreeting(greetingResponse)
  }

  const getAndSetReplies = async () => {
    const repliesResponse = await contract.getReplies()
    setReplies(repliesResponse)
  }

  const submit = async (reply: string) => {
    const key = await window.keplr?.getKey(network.chainId)
    let responseMsg = { respond: { response: reply } }
    await signingClient?.execute(
      key?.bech32Address as string,
      network.contracts.greetingContract as string,
      responseMsg,
      "auto"
    )
  }

  useEffect(() => {
    getAndSetGreeting()
  }, [])

  useEffect(() => {
    getAndSetAccount()
    getAndSetReplies()
  }, [signingClient])

  return (
    <main className="app">
      <header className="app-header">
        <h1>Messaging dApp</h1>
        <Wallet login={getAndSetSigner} account={account} />
      </header>
      <h2>{greeting ? `Cudos says ${greeting}` : "No greeting :("}</h2>
      {account && <ResponseForm submit={submit} />}
      <ResponseList replies={replies} />
    </main>
  )
}

export default App
