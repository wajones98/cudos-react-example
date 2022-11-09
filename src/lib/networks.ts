import { GasPrice } from "cudosjs"

export type Network = "localnet" | "testnet" |  "mainnet"

export type NetworkConfig = {
  name: Network
  chainId: string
  gasPrice: GasPrice
  addressPrefix: string
  urls: {
    rpc: string
    ws: string
    rest: string
  }
  contracts: {
    greetingContract?: string
  }
}

const networks = (network: Network): NetworkConfig => {
  switch(network) {
    case "localnet":
      return {
        name: "localnet",
        chainId: "cudos-localnet",
        gasPrice: GasPrice.fromString("5000000000000acudos"),
        urls: {
          rpc: "http://127.0.0.1:26657",
          rest: "http://127.0.0.1:1317",
          ws: "ws://127.0.0.1:26657/websocket",
        },
        addressPrefix: "cudos",
        contracts: {},
      }
    case "testnet":
      return {
        name: "testnet",
        chainId: "cudos-testnet-public-3",
        gasPrice: GasPrice.fromString("5000000000000acudos"),
        urls: {
          rpc: "https://sentry1.gcp-uscentral1.cudos.org:36657",
          rest: "https://sentry1.gcp-uscentral1.cudos.org:31317",
          ws: "wss://sentry1.gcp-uscentral1.cudos.org:36657/websocket",
        },
        addressPrefix: "cudos",
        contracts: {
          greetingContract:
            "cudos1zz89vvmdwxuww63034jhdvtu449w7hxyd4zt3rwylryd2nm3rkuqm37cut",
        },
      }
    case "mainnet":
      return {
        name: "mainnet",
        chainId: "cudos-1",
        gasPrice: GasPrice.fromString("5000000000000acudos"),
        urls: {
          rpc: "https://rpc.cudos.org/",
          rest: "https://rest.cudos.org/",
          ws: "wss://mainnet-full-node-02.hosts.cudos.org:36657/websocket",
        },
        addressPrefix: "cudos",
        contracts: {},
      }
    default:
      throw new Error(`${network} not supported`)
  }
}
 

export default networks