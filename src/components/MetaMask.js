import React from "react";
import { useState } from "react";
import useMetaMask from "../hooks/useMetaMask";
import { generateSignature } from "../utils/generateMetaMaskSignature";
import styles from "./main.module.css";
function MetaMask() {
  const { isInstalled, isConnected, account, connectWallet, getChainId } =
    useMetaMask();
  const [metamaskInfo, setMetamaskInfo] = useState({
    address: account ? account : "",
    signature: "",
  });

  const signInWithMetaMask = async () => {
    const acc = await connectWallet();
    setMetamaskInfo({ ...metamaskInfo, address: acc });
  };

  const createSignatureWithMetaMask = async () => {
    const signData = {
      address: account,
      nonce: String(Date.now()),
    };
    const chainId = await getChainId();
    const sig = await generateSignature(account, signData, chainId);
    setMetamaskInfo({ ...metamaskInfo, signature: sig });
  };
  return (
    <>
      {isInstalled ? (
        <div className={styles.content}>
          {metamaskInfo.signature && (
            <p>
              Signature:{" "}
              {metamaskInfo.signature.length > 10
                ? `${metamaskInfo.signature.substr(
                    0,
                    5
                  )}.....${metamaskInfo.signature.substr(
                    metamaskInfo.signature.length - 5
                  )}`
                : metamaskInfo.signature}
            </p>
          )}
          {metamaskInfo.address && (
            <p>
              Address:{" "}
              {metamaskInfo.address.length > 10
                ? `${metamaskInfo.address.substr(
                    0,
                    5
                  )}.....${metamaskInfo.address.substr(
                    metamaskInfo.address.length - 5
                  )}`
                : metamaskInfo.address}
            </p>
          )}
          {!isConnected ? (
            <button className={styles.button} onClick={signInWithMetaMask}>
              Sign in metamask
            </button>
          ) : (
            <button
              className={styles.button}
              onClick={createSignatureWithMetaMask}
            >
              Create Signature
            </button>
          )}
        </div>
      ) : (
        <div>Metamask not found</div>
      )}
    </>
  );
}

export default MetaMask;
