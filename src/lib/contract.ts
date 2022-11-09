import { CosmWasmClient } from "cudosjs"
import { NetworkConfig } from "./networks"
export type Reply = {
  addr: string
  reply: {
    text: string
  }
}

class Contract {
  network: NetworkConfig
  address: string
  constructor(network: NetworkConfig) {
    if (!network.contracts.greetingContract) {
      throw new Error("Contract address not set in network config")
    }
    this.network = network
    this.address = network.contracts.greetingContract
  }

  async getReplies(): Promise<Reply[]> {
    const client = await CosmWasmClient.connect(this.network.urls.rpc)
    const repliesResponse = await client.queryContractSmart(this.address, {
      get_replies: {},
    })
    return repliesResponse["replies"]
  }

  async getGreeting(): Promise<string> {
    const client = await CosmWasmClient.connect(this.network.urls.rpc)
    const greetingResponse = await client.queryContractSmart(
      this.address,
      {
        get_greeting: {},
      }
    )
    return greetingResponse
  }
}

export default Contract
