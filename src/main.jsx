import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect
} from "@thirdweb-dev/react";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThirdwebProvider supportedWallets={[
      metamaskWallet({
        recommended: true
      }),
      coinbaseWallet(),
      walletConnect()
    ]} activeChain="sepolia">
      <App />
    </ThirdwebProvider>

  </React.StrictMode>,
)
