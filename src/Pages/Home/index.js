import React from 'react'
import MetaMask from '../../components/MetaMask'
import WalletConnect from "../../components/WalletConnect"
import styles from "./Home.module.css"
function Index() {
    return <>
        <div className={styles.secondaryDiv}>
            <h2 style={{ textAlign: "center" }}>Web 3 Authentication system with MetaMask and WalletConnect</h2>

        </div>
        <div className={styles.mainContainer}>
            <MetaMask />
            <WalletConnect />
        </div>
    </>
}

export default Index