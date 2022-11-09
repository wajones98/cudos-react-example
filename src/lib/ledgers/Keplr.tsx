import { SigningCosmWasmClient } from "cudosjs"
import { NetworkConfig } from "../networks"

export const setupKeplr = async (
  networkConfig: NetworkConfig
): Promise<SigningCosmWasmClient> => {
  if (!window.keplr || !window.keplr.getOfflineSignerAuto) {
    throw new Error("Keplr extension not installed")
  }

  await window.keplr.enable(networkConfig.chainId).catch((err) => {
    console.log(err)
    throw new Error("Keplr can't connect to this chainId!")
  })

  const { addressPrefix, gasPrice } = networkConfig
  // Setup signer
  const offlineSigner = await window.keplr.getOfflineSignerAuto(
    networkConfig.chainId
  )
  // Init SigningCosmWasmClient client
  const signingClient = await SigningCosmWasmClient.connectWithSigner(
    networkConfig.urls.rpc,
    offlineSigner,
    {
      prefix: addressPrefix,
      gasPrice,
    }
  )
  return signingClient
}

export default setupKeplr
