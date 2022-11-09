/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NETWORK: "localnet" | "testnet" | "mainnet"
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}