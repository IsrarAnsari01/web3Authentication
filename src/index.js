import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Web3Modal } from "@web3modal/react";
import { WagmiConfig } from "wagmi";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { configureChains, createConfig } from "wagmi";
import {
  arbitrum,
  mainnet,
  polygon,
  avalanche,
  bsc,
  goerli,
} from "wagmi/chains";
const projectId = process.env.REACT_APP_PROJECT_ID;

const chains = [arbitrum, mainnet, polygon, avalanche, bsc, goerli];

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <WagmiConfig config={wagmiConfig}>
    <Web3Modal
      projectId={process.env.REACT_APP_PROJECT_ID}
      ethereumClient={ethereumClient}
    />
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </WagmiConfig>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
