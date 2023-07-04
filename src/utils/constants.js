import {
    ReciptBridgeAvax,
    ReciptBridgeBsc,
    ReciptBridgeEth,
    ReciptBridgePolygon,
} from "./config";

export const NETWORKS_SHORT_NAMES = {
    ETH: "ETH",
    BSC: "BSC",
    POLYGON: "POLYGON",
    AVAX: "AVAX",
};



export const RECEIPT_BRIDGE_CONTRACTS = {
    [NETWORKS_SHORT_NAMES.ETH]: `${ReciptBridgeEth}`,
    [NETWORKS_SHORT_NAMES.BSC]: `${ReciptBridgeBsc}`,
    [NETWORKS_SHORT_NAMES.POLYGON]: `${ReciptBridgePolygon}`,
    [NETWORKS_SHORT_NAMES.AVAX]: `${ReciptBridgeAvax}`,
};

export const NETWORKS_MAINNET = {
    [NETWORKS_SHORT_NAMES.ETH]: 1,
    [NETWORKS_SHORT_NAMES.BSC]: 56,
    [NETWORKS_SHORT_NAMES.POLYGON]: 137,
    [NETWORKS_SHORT_NAMES.AVAX]: 43114,
    1: NETWORKS_SHORT_NAMES.ETH,
    56: NETWORKS_SHORT_NAMES.BSC,
    137: NETWORKS_SHORT_NAMES.POLYGON,
    43114: NETWORKS_SHORT_NAMES.AVAX,
};

export const NETWORKS_TESTNET = {
    [NETWORKS_SHORT_NAMES.ETH]: 5,
    [NETWORKS_SHORT_NAMES.BSC]: 97,
    [NETWORKS_SHORT_NAMES.POLYGON]: 80001,
    [NETWORKS_SHORT_NAMES.AVAX]: 43113,
    5: NETWORKS_SHORT_NAMES.ETH,
    97: NETWORKS_SHORT_NAMES.BSC,
    80001: NETWORKS_SHORT_NAMES.POLYGON,
    43113: NETWORKS_SHORT_NAMES.AVAX,
};

export const chainId =
    process.env.REACT_APP_IS_MAINNET === "false"
        ? NETWORKS_TESTNET.ETH
        : NETWORKS_MAINNET.ETH;

export const networkName =
    process.env.REACT_APP_IS_MAINNET === "true"
        ? NETWORKS_MAINNET[chainId]
        : NETWORKS_TESTNET[chainId];



export const domain = {
    name: "AuthDemo",
    version: "1",
    chainId: 1, // Replace with actual chainId
    verifyingContract: process.env.REACT_APP_VERIFY_CONTRACT_ADDR,

};

export const walletConnectDomain = {
    name: "AuthDemo",
    version: "1",
    chainId: 1, // Replace with actual chainId
    verifyingContract: RECEIPT_BRIDGE_CONTRACTS[networkName],
};

export const walletParams = {
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
    primaryType: "Auth",
    domain: walletConnectDomain,
};
