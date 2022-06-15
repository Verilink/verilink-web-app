import { ethers } from "ethers";

import {
    LEGACY_ABI,
    LEGACY_API_NAMES
} from "./ABI";
import { getInterfaceId } from "../utils/interfaceUtils";

/* =====================================
        Verilink Legacy Interface
   ===================================== */

/**
 * @description get the device public key
 * @param {*} provider 
 * @param {*} contractAddress 
 * @param {*} tokenId 
 * @returns device public key
 */
async function devicePublicKey(provider, contractAddress, tokenId)
{
    let contract = new ethers.Contract(contractAddress, LEGACY_ABI, provider);
    let _devicePublicKey = await contract.devicePublicKey(tokenId);
    return _devicePublicKey;
}

const VerilinkLegacy = {
    devicePublicKey
};

export default VerilinkLegacy;