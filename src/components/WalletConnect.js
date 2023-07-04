import React from 'react'
import { useState } from 'react'
import useWallectConnect from "../hooks/useWalletConnect"
import useSignature from "../hooks/useSignature"
import styles from "./main.module.css"
function WalletConnect() {
    const { onClick, address, isConnected } = useWallectConnect()
    const { generateSignature } = useSignature()
    const [signature, setSignature] = useState()
    const createSignatureWithWalletConnect = async () => {
        const sig = await generateSignature()
        if (sig.isCreate) {
            setSignature(sig.signature)
        }
    }
    return <>
        <div className={styles.content}>
            {isConnected && <>
                {signature && <p>Signature: {signature.length > 10 ? `${signature.substr(0, 5)}.....${signature.substr(signature.length - 5)}` : signature}</p>}
                {address && <p>Address: {address.length > 10 ? `${address.substr(0, 5)}.....${address.substr(address.length - 5)}` : address}</p>}
            </>}
            {!isConnected ? <button className={styles.button} onClick={onClick}>Sign in walletConnect</button> : <>
                <button className={styles.button} onClick={onClick}>Disconnect</button>
                <button className={styles.button} onClick={createSignatureWithWalletConnect}>Create Signature</button>
            </>}
        </div>
    </>
}

export default WalletConnect