import { useWeb3Modal } from "@web3modal/react";
import { useState } from "react";
import { useAccount, useDisconnect, useNetwork } from "wagmi";

export default function useWalletConnect() {
    const [loading, setLoading] = useState(false);
    const { open } = useWeb3Modal();
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();
    const { chain } = useNetwork();
    async function onOpen() {
        setLoading(true);
        await open();
        setLoading(false);
    }
    function onClick() {
        if (isConnected) {
            disconnect();
        } else {
            onOpen();
        }
    }
    return { isConnected, loading, onClick, address, chain };
}