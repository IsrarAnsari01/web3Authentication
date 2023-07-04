import Web3 from "web3";
import { domain } from "./constants";

const web3 = new Web3(window.ethereum);

const SIGNATURE_MAP = {
  Auth: {
    primaryType: "Auth",
    types: {
      Auth: [
        { name: "address", type: "address" },
        { name: "nonce", type: "uint256" },
      ],
    },
  },
};

const signDataByWallet = async (account, signData, domain, type) => {
  const msgParams = {
    domain: {
      name: domain.name,
      version: domain.version,
      chainId: domain.chainId,
      verifyingContract: domain.verifyingContract,
    },
    types: {
      EIP712Domain: [
        {
          name: "name",
          type: "string",
        },
        {
          name: "version",
          type: "string",
        },
        {
          name: "chainId",
          type: "uint256",
        },
        {
          name: "verifyingContract",
          type: "address",
        },
      ],
      Auth: [
        {
          name: "address",
          type: "address",
        },
        {
          name: "nonce",
          type: "uint256",
        },
      ],
    },
    primaryType: SIGNATURE_MAP[type].primaryType,
    message: signData,
  };

  return new Promise((resolve, reject) => {
    web3.currentProvider.send(
      {
        method: "eth_signTypedData_v4",
        params: [account, JSON.stringify(msgParams)],
        from: account,
      },
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.result);
        }
      }
    );
  });
};

export const generateSignature = async (account, signData, chainId) => {
  try {
    const type = "Auth";
    domain.chainId = chainId;
    const signature = await signDataByWallet(account, signData, domain, type);
    return signature;
  } catch (err) {
    console.error(err);
  }
};
