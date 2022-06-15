import { ethers } from "ethers";

import {
    IERC721PHYSICALTAP2CLAIM_ABI,
    IERC721PHYSICALTAP2CLAIM_API_NAMES
} from "./ABI";
import { getInterfaceId } from "../interfaceUtils";
import IERC165 from "../IERC165/IERC165";

/* =====================================
        ERC721 PHYSICAL T2C Interface
   ===================================== */

const interfaceId = getInterfaceId(IERC721PHYSICALTAP2CLAIM_ABI, 
                        IERC721PHYSICALTAP2CLAIM_API_NAMES);
/***** READ OPERATIONS *****/
/**
 * @description checks if interface is supported
 * @param {*} provider 
 * @param {*} contractAddress 
 * @returns whether ERC721PhysicalT2C is supported
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
async function isUnlocked(provider, contractAddress, tokenId)
{
    let contract = new ethers.Contract(contractAddress, IERC721PHYSICALTAP2CLAIM_ABI, provider);
    let _isUnlocked = await contract.isUnlocked(tokenId);
    return _isUnlocked;
}

/***** GAS ESTIMATES *****/
async function claimGasEstimate(provider, contractAddress, 
    fromAddress, toAddress, tokenId, blockHash, signature) 
{
    let contract = new ethers.Contract(contractAddress, IERC721PHYSICALTAP2CLAIM_ABI, provider);
    return await contract.estimateGas.claim(fromAddress, toAddress,
        tokenId, blockHash, signature);
}

async function unlockGasEstimate(provider, contractAddress, tokenId)
{
    let contract = new ethers.Contract(contractAddress, IERC721PHYSICALTAP2CLAIM_ABI, provider);
    return await contract.estimateGas.unlock(tokenId);
}

/***** WRITE OPERATIONS *****/

async function unlock(signer, contractAddress, tokenId, receipt=false)
{
    let contract = new ethers.Contract(contractAddress, IERC721PHYSICALTAP2CLAIM_ABI, signer);

    const txnOpts = {
        nonce: await signer.getTransactionCount(),
        gasPrice: await signer.getGasPrice(),
        gasLimit: await contract.estimateGas.unlock(tokenId)
    };

    const gasCostWei = txnOpts.gasPrice.mul(txnOpts.gasLimit);

    let response = await contract.unlock(tokenId, txnOpts);

    console.log(`Response: ${JSON.stringify(response)}`);

    if(receipt)
    {
        await response.wait();
    }

    return response;
}


async function claim(signer, contractAddress, 
    fromAddress, toAddress, tokenId, blockHash, signature, receipt=false)
{
    let contract = new ethers.Contract(contractAddress, IERC721PHYSICALTAP2CLAIM_ABI, signer);

    // console.log('wat:', await signer.getTransactionCount(),await signer.getGasPrice(), (await contract.estimateGas.claim(fromAddress,
    //     toAddress, tokenId, blockHash, signature)).mul(2));
    const txnOpts = {
        nonce: await signer.getTransactionCount(),
        gasPrice: await signer.getGasPrice(),
        gasLimit: (await contract.estimateGas.claim(fromAddress,
            toAddress, tokenId, blockHash, signature)).mul(2)
    };
   
    let response = await contract.claim(fromAddress, toAddress, 
        tokenId, blockHash, signature, txnOpts);

    console.log(`Response: ${JSON.stringify(response)}`);

    if(receipt)
    {
        await response.wait();
    }

    return response;
}

/***** UNSIGNED WRITE OPERATIONS *****/

/***** USEFUL APIs *****/

/**
 * requires `tokenId` is unlocked
 * @param {*} provider 
 * @param {*} contractAddress 
 * @param {*} tokenId 
 */
async function requireUnlocked(provider, contractAddress, tokenId)
{
    let _isUnlocked = await isUnlocked(provider, contractAddress, tokenId);
    if(!_isUnlocked)
    {
        TRANSACTION_ERROR_CODES.throwError(
            TRANSACTION_ERROR_CODES.INVALID_OPERATION_IN_LOCKED_STATE.code,
            TRANSACTION_ERROR_CODES.INVALID_OPERATION_IN_LOCKED_STATE.createMessage(contractAddress, tokenId)
        );
    }
}

/**
 * requires `tokenId` is locked
 * @param {*} provider 
 * @param {*} contractAddress 
 * @param {*} tokenId 
 */
async function requireLocked(provider, contractAddress, tokenId)
{
    let _isUnlocked = await isUnlocked(provider, contractAddress, tokenId);

    if(_isUnlocked)
    {
        TRANSACTION_ERROR_CODES.throwError(
            TRANSACTION_ERROR_CODES.INVALID_OPERATION_IN_UNLOCK_STATE.code,
            TRANSACTION_ERROR_CODES.INVALID_OPERATION_IN_UNLOCK_STATE.createMessage(contractAddress, tokenId)
        );
    }
}

/**
 * requires interface is supported
 * @param {*} provider 
 * @param {*} contractAddress 
 */
async function requireInterface(provider, contractAddress)
{
    let _supportsInterface = await supportsInterface(provider, contractAddress);
    
    if(!_supportsInterface)
    {
        TRANSACTION_ERROR_CODES.throwError(
            TRANSACTION_ERROR_CODES.INTERFACE_NOT_SUPPORTED.code,
            TRANSACTION_ERROR_CODES.INTERFACE_NOT_SUPPORTED.createMessage(
                "IERC721PhysicalTap2Claim", contractAddress)
        );
    }
}   

const IERC721PhysicalTap2Claim = {
    interfaceId,

    /** READ OPERATIONS **/
    supportsInterface,
    isUnlocked,

    /***** GAS ESTIMATES *****/
    claimGasEstimate,
    unlockGasEstimate,

    /** WRITE OPERATIONS **/
    claim,
    unlock,

    /** UNSIGNED TRANSACTIONS **/

     /** USEFUL APIs **/
     requireUnlocked,
     requireLocked,
     requireInterface
};

export default IERC721PhysicalTap2Claim;