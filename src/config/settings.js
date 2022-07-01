import { ethers } from "ethers";

export const MAX_VIEWPORT_WIDTH = 500;
export const MAIN_POIP_ADDRESS = '0x482AA12da3421c2c0ba25980437BcA5fc3570FF7';
export const TEST_POIP_ADDRESS = '0x020e95094df8a00C18b8a82b7cB8583F6C8A4235';
export const POIP_ADDRESS = TEST_POIP_ADDRESS;

const USE_TESTNET = false;
export const MATIC_RPC_URL = USE_TESTNET ? "https://rpc-mumbai.maticvigil.com" : 'https://polygon-rpc.com';
export const MATIC_PROVIDER = new ethers.providers.JsonRpcProvider(MATIC_RPC_URL);

export const ETHER_PROVIDER = USE_TESTNET ? 
  (new ethers.providers.InfuraProvider("ropsten" , process.env.REACT_APP_INFURA_PROJECT_ID)) :
  (new ethers.providers.InfuraProvider("homestead" , process.env.REACT_APP_INFURA_PROJECT_ID))