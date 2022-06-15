import { ethers } from "ethers";

import {
    IERC721PHYSICAL_ABI,
    IERC721PHYSICAL_API_NAMES
} from "./ABI";
import { getInterfaceId } from "../utils/interfaceUtils";

import IERC165 from "../IERC165/IERC165";
import { TRANSACTION_ERROR_CODES } from "../../utils/transactionErrorCodes";
/* =====================================
        ERC721 PHYSICAL Interface
   ===================================== */

const interfaceId = getInterfaceId(IERC721PHYSICAL_ABI,
                        IERC721PHYSICAL_API_NAMES);
/***** READ OPERATIONS *****/
/**
 * 
 * @param {*} provider 
 * @param {*} contractAddress 
 */
async function supportsInterface(provider, contractAddress)
{
    return await IERC165.supportsInterface(provider, contractAddress, interfaceId);
}

/**
 * 
 * @param {*} provider 
 * @param {*} contractAddress 
 * @param {*} tokenId 
 * @returns 
 */
async function chipId(provider, contractAddress, tokenId)
{
    let contract = new ethers.Contract(contractAddress, IERC721PHYSICAL_ABI, provider);
    let _chipId = await contract.chipId(tokenId);
    /* chipId should always be formatted to 32 bytes */
    _chipId = ethers.utils.hexZeroPad(_chipId, 32)
    return _chipId;
}

/**
 * 
 * @param {*} provider 
 * @param {*} contractAddress 
 * @param {*} tokenId 
 * @returns 
 */
async function isPhysical(provider, contractAddress, tokenId)
{
    let contract = new ethers.Contract(contractAddress, IERC721PHYSICAL_ABI, provider);
    let _isPhysical = await contract.isPhysical(tokenId);
    return _isPhysical;
}

/**
 * 
 * @param {*} provider 
 * @param {*} tokenId 
 * @param {*} hash 
 * @param {*} signature 
 * @returns 
 */
async function isValidChipSignature(provider, contractAddress, tokenId, hash, signature)
{
    let contract = new ethers.Contract(contractAddress, IERC721PHYSICAL_ABI, provider);
    let _isValid = await contract.isValidChipSignature(provider, tokenId, hash, signature);
    return _isValid;
}

/***** USEFUL APIs *****/

/**
 * requires that the token is physical
 * @param {*} provider 
 * @param {*} contractAddress 
 * @param {*} tokenId 
 */
async function requirePhysical(provider, contractAddress, tokenId)
{
    let _isPhysical = await isPhysical(provider, contractAddress, tokenId);

    if(!_isPhysical)
    {
        TRANSACTION_ERROR_CODES.throwError(
            TRANSACTION_ERROR_CODES.NFT_IS_NOT_PHYSICAL.code,
            TRANSACTION_ERROR_CODES.NFT_IS_NOT_PHYSICAL.createMessage(contractAddress, tokenId)
        );
    }
}

async function requireValidChipSignature(provider, contractAddress, tokenId, hash, signature)
{
    let _isValid = await isValidChipSignature(provider, contractAddress, tokenId, hash, signature);

    if(!_isValid)
    {
        TRANSACTION_ERROR_CODES.throwError(
            TRANSACTION_ERROR_CODES.INVALID_CHIP_SIGNATURE.code,
            TRANSACTION_ERROR_CODES.INVALID_CHIP_SIGNATURE.createMessage(`invalid signature`)
        )
    }
}

const IERC721Physical = {
    interfaceId,
    /** READ OPERATIONS **/
    supportsInterface,
    chipId,
    isPhysical,
    isValidChipSignature,
    
    /** USEFUL APIs **/
    requirePhysical,
    requireValidChipSignature
};

export default IERC721Physical;