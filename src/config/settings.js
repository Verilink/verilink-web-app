import { ethers } from "ethers";

export const MAX_VIEWPORT_WIDTH = 500;
export const POIP_ADDRESS = '0x482AA12da3421c2c0ba25980437BcA5fc3570FF7';

const USE_TESTNET = false;
export const MATIC_RPC_URL = USE_TESTNET ? "https://rpc-mumbai.maticvigil.com" : 'https://polygon-rpc.com';
export const MATIC_PROVIDER = new ethers.providers.JsonRpcProvider(MATIC_RPC_URL);

export const ETHER_PROVIDER = USE_TESTNET ? 
  (new ethers.providers.InfuraProvider("ropsten" , process.env.REACT_APP_INFURA_PROJECT_ID)) :
  (new ethers.providers.InfuraProvider("homestead" , process.env.REACT_APP_INFURA_PROJECT_ID))