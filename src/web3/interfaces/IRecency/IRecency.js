import { ethers } from "ethers";

import {
    IRECENCY_ABI, 
    IRECENCY_API_NAMES
} from "./ABI";
import { getInterfaceId } from "../utils/interfaceUtils";

import IERC165 from "../IERC165/IERC165";
import { TRANSACTION_ERROR_CODES } from "../../utils/transactionErrorCodes";

/* =====================================
       IRecency Interface
   ===================================== */
const interfaceId = getInterfaceId(IRECENCY_ABI, IRECENCY_API_NAMES);

/***** READ OPERATIONS *****/

/**
 * @description checks if interface is supported
 * @param {*} provider 
 * @param {*} contractAddress 
 * @returns whether IRecency is supported
 */
async function supportsInterface(provider, contractAddress)
{
    return IERC165.supportsInterface(provider, contractAddress, interfaceId);
}

/**
 * @description returns if blockhash falls within recency window
 * @param {*} provider 
 * @param {*} contractAddress 
 * @param {*} blockHash 
 * @returns if blockhash falls within recency window
 */
async function isRecentBlockHash(provider, contractAddress, blockHash)
{
    let contract = new ethers.Contract(contractAddress, IRECENCY_ABI, provider);
    let _isRecentBlockHash = await contract.isRecentBlockHash(blockHash);
    return _isRecentBlockHash;
}

/**
 * @description returns the number of blocks in the recency window
 * @param {*} provider 
 * @param {*} contractAddress 
 * @returns the number of blocks in the recency window
 */
async function blockRecencyWindow(provider, contractAddress)
{
    let contract = new ethers.Contract(contractAddress, IRECENCY_ABI, provider);
    let _blockRecencyWindow = await contract.blockRecencyWindow();
    return _blockRecencyWindow;
}

/***** USEFUL APIs *****/

async function requireRecentBlockHash(provider, contractAddress, blockHash)
{
    let _isRecent = await isRecentBlockHash(provider, contractAddress, blockHash);
    
    if(!_isRecent)
    {
        TRANSACTION_ERROR_CODES.throwError(
            TRANSACTION_ERROR_CODES.SIGNATURE_IS_NOT_RECENT.code,
            TRANSACTION_ERROR_CODES.SIGNATURE_IS_NOT_RECENT.createMessage(blockHash)
        );
    }
}

const IRecency = {
    interfaceId,
    /** READ OPERATIONS **/
    supportsInterface,
    isRecentBlockHash,
    blockRecencyWindow,

    /** USEFUL APIs **/
    requireRecentBlockHash
};

export default IRecency;