import { useState, useEffect } from "react";
// import { addUser, logoutUser } from "../components/ducks/user/action";
// import { useDispatch } from "react-redux";
// import { useRouter } from "next/router";

function useMetaMask() {
  const [isInstalled, setIsInstalled] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(null);

  // const dispatch = useDispatch();
  // const router = useRouter();

  useEffect(() => {
    const checkMetaMaskInstalled = async () => {
      if (typeof window.ethereum !== "undefined") {
        setIsInstalled(true);

        // Add event listener for accountsChanged event
        window.ethereum.on("accountsChanged", handleAccountsChanged);
      }
    };

    const handleAccountsChanged = async (accounts) => {
      if (accounts.length === 0) {
        setIsConnected(false);
        setAccount(null);
        // dispatch(logoutUser());
        // router.push({ pathname: "/" });
      } else {
        setIsConnected(true);
        setAccount(accounts[0]);
        // let res = await dispatch(addUser({ walletAddress: accounts[0] }));

        // if (res?.sucess) {
        //     router.push({ pathname: "/" });
        // }
      }
    };

    checkMetaMaskInstalled();

    // Cleanup event listener on unmount
    return () => {
      if (typeof window.ethereum !== "undefined") {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, []);

  const isMetaConnected = async () => {
    // Check if MetaMask is already connected
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    if (accounts.length > 0) {
      setIsConnected(true);
      setAccount(accounts[0]);
      // let res = await dispatch(addUser({ walletAddress: accounts[0] }));
      // return res.sucess;
    }
  };
  const connectWallet = async () => {
    if (isInstalled) {
      try {
        const res = await isMetaConnected();
        if (res) return;
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setIsConnected(true);
        setAccount(accounts[0]);
        return accounts[0];
      } catch (error) {
        console.error(error);
        return false;
      }
    } else {
      alert("MetaMask is not installed");
    }
  };

  const getChainId = async () => {
    if (isInstalled) {
      try {
        const res = await isMetaConnected();
        if (res) return;
        const id = await window.ethereum.request({
          method: "eth_chainId",
        });
        return id;
      } catch (error) {
        console.error(error);
        return false;
      }
    } else {
      alert("MetaMask is not installed");
    }
  };

  return { isInstalled, isConnected, account, connectWallet, getChainId };
}

export default useMetaMask;
