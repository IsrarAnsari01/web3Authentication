import { useCallback } from "react";
import { useSignTypedData } from "wagmi";
import { walletParams } from "../utils/constants";
import useWalletConnect from "./useWalletConnect";

function useSignature() {
    const { address, chain, isConnected } = useWalletConnect();
    const { isError, signTypedDataAsync } = useSignTypedData();

    const generateSignature = useCallback(async () => {
        const signData = {
            address: address,
            nonce: +String(Date.now()),
        };

        walletParams.message = signData;
        walletParams.domain.chainId = chain?.id;

        try {
            if (!!address) {
                const sig = await signTypedDataAsync(walletParams);
                console.log(sig);
                // We can direct set it on store direct from here
                return { signature: sig, isCreate: true };
            }
        } catch (error) {
            console.log(error);
            return { signature: "", isCreate: false };
        }
    }, [address]);

    return {
        generateSignature,
        isError,
        isConnected,
    };
}

export default useSignature;