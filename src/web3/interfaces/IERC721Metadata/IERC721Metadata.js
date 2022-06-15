import { ethers } from "ethers";

import { 
    IERC721METADATA_ABI, 
    IERC721METADATA_API_NAMES } from "./ABI";
import { getInterfaceId } from "../utils/interfaceUtils";

import IERC165 from "../IERC165/IERC165";
/* =====================================
        ERC721 METADATA Interface
   ===================================== */

const interfaceId = getInterfaceId(IERC721METADATA_ABI,
                        IERC721METADATA_API_NAMES);

/***** READ OPERATIONS *****/

/**
 * 
 * @param {*} provider 
 * @param {*} contractAddress 
 * @returns 
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
async function name(provider, contractAddress) 
{
    let contract = new ethers.Contract(contractAddress, IERC721METADATA_ABI, provider);
    let _name = await contract.name();
    return _name;
}

/**
 * 
 * @param {*} provider 
 * @param {*} contractAddress 
 * @returns 
 */
async function symbol(provider, contractAddress)
{
    let contract = new ethers.Contract(contractAddress, IERC721METADATA_ABI, provider);
    let _symbol = await contract.symbol();
    return _symbol;
}

/**
 * 
 * @param {*} provider 
 * @param {*} contractAddress 
 * @param {*} tokenid 
 * @returns 
 */
async function tokenURI(provider, contractAddress, tokenId)
{
    let contract = new ethers.Contract(contractAddress, IERC721METADATA_ABI, provider);
    let _tokenURI = await contract.tokenURI(tokenId);
    return _tokenURI;
}

const IERC721Metadata = {
    interfaceId,
    /** READ OPERATIONS **/
    supportsInterface, 
    name,
    symbol,
    tokenURI
};

export default IERC721Metadata;