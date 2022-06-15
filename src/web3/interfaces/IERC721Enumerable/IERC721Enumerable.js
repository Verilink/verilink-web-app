import { ethers } from "ethers";

import { 
    IERC721ENUMERABLE_ABI, 
    IERC721ENUMERABLE_API_NAMES } from "./ABI";
import { getInterfaceId } from "../utils/interfaceUtils";

import IERC165 from "../IERC165/IERC165";
/* =====================================
        ERC721 ENUMERABLE Interface
   ===================================== */

const interfaceId = getInterfaceId(IERC721ENUMERABLE_ABI, 
                        IERC721ENUMERABLE_API_NAMES);

/***** READ OPERATIONS *****/
/**
 * @description Checks if interface is supported
 * @param {*} provider 
 * @param {*} contractAddress 
 * @returns whether ERC721ENUMERABLE Interface is supported
 */
async function supportsInterface(provider, contractAddress)
{
   return await IERC165.supportsInterface(provider, contractAddress, interfaceId);
}

/**
 * 
 * @param {*} provider 
 * @param {*} contractAddress 
 * @returns 
 */
async function totalSupply(provider, contractAddress)
{
    let contract = new ethers.Contract(contractAddress, IERC721ENUMERABLE_ABI, provider);
    let _totalSupply = await contract.totalSupply();
    return _totalSupply;
}

/**
 * 
 * @param {*} provider 
 * @param {*} contractAddress 
 * @param {*} owner 
 * @param {*} index 
 * @returns 
 */
async function tokenOfOwnerByIndex(provider, contractAddress, owner, index)
{
    let contract = new ethers.Contract(contractAddress, IERC721ENUMERABLE_ABI, provider);
    let tokenId = await contract.tokenOfOwnerByIndex(owner, index);
    return tokenId;
}

/**
 * 
 * @param {*} provider 
 * @param {*} contractAddress 
 * @param {*} index 
 * @returns 
 */
async function tokenByIndex(provider, contractAddress, index) 
{
    let contract = new ethers.Contract(contractAddress, IERC721ENUMERABLE_ABI, provider);
    let tokenId = await contract.tokenByIndex(index);
    return tokenId;
}

const IERC721Enumerable = {
    interfaceId,
    /** READ OPERATIONS **/
    supportsInterface,
    totalSupply,
    tokenOfOwnerByIndex,
    tokenByIndex
};

export default IERC721Enumerable;