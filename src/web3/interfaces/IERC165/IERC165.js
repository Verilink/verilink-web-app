import { ethers } from "ethers";

import {
    IERC165_ABI,
    IERC165_API_NAMES
} from "./ABI";

async function supportsInterface(provider, contractAddress, ifaceId) 
{
    console.log(`Supports Interface: ${JSON.stringify(provider)}`);
    let contract = new ethers.Contract(contractAddress, IERC165_ABI, provider);
    let isSupported = await contract.supportsInterface(ifaceId);
    return isSupported;
}

const IERC165 = {
    supportsInterface
};

export default IERC165;