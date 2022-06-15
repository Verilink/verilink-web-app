import { ethers } from "ethers";

import { IERC721_ABI, IERC721_API_NAMES } from "./ABI";
import { getInterfaceId } from "../utils/interfaceUtils";

import IERC165 from "../IERC165/IERC165";
import { TRANSACTION_ERROR_CODES } from "../../utils/transactionErrorCodes";

/* =====================================
            ERC721 Interface
   ===================================== */

const interfaceId = getInterfaceId(IERC721_ABI, 
                        IERC721_API_NAMES);

/***** READ OPERATIONS *****/
/**
 * @description Checks if interface is supported
 * @param {*} contractAddress 
 * @param {*} provider 
 * @returns whether ERC721 Interface is supported
 */
async function supportsInterface(provider, contractAddress)
{
    return await IERC165.supportsInterface(provider, contractAddress, interfaceId);
}

/**
 * @description gets the number of tokens owned by address
 * @param {*} contractAddress
 * @param {*} address 
 * @param {*} provider 
 */
async function balanceOf(provider, contractAddress, address)
{
    let contract = new ethers.Contract(contractAddress, IERC721_ABI, provider);
    let balanceOf = await contract.balanceOf(address);
    return balanceOf;
}

/**
 * @description gets the owner of the token id
 * @param {*} contractAddress 
 * @param {*} tokenId 
 * @param {*} provider 
 * @returns owner of tokenid
 */
async function ownerOf(provider, contractAddress, tokenId)
{
    let contract = new ethers.Contract(contractAddress, IERC721_ABI, provider);
    let owner = await contract.ownerOf(tokenId);
    return owner;
}

/**
 * @description gets the approved operator of the token id
 * @param {*} provider 
 * @param {*} contractAddress 
 * @param {*} tokenId 
 * @returns operator address
 */
async function getApproved(provider, contractAddress, tokenId)
{
    let contract = new ethers.Contract(contractAddress, IERC721_ABI, provider);
    let approved = await contract.getApproved(tokenId);
    return approved;
}

/**
 * @description gets if the operator address is approved for all by owner address
 * @param {*} provider 
 * @param {*} contractAddress 
 * @param {*} ownerAddress 
 * @param {*} operationAddress 
 * @returns bool
 */
async function isApprovedForAll(provider, contractAddress, ownerAddress, operationAddress)
{
    let contract = new ethers.Contract(contractAddress, IERC721_ABI, provider);
    let _isApprovedForAll = await contract.isApprovedForAll(ownerAddress, operationAddress);
    return _isApprovedForAll;
}

/***** GAS ESTIMATES *****/
/**
 * 
 * @param {*} provider
 * @param {*} contractAddress 
 * @param {*} fromAddress 
 * @param {*} toAddress 
 * @param {*} tokenId 
 */
async function safeTransferFromGasEstimate(provider, contractAddress, fromAddress, toAddress, tokenId)
{
    let contract = new ethers.Contract(contractAddress, IERC721_ABI, provider);
    return await contract.estimateGas.safeTransferFrom(fromAddress, toAddress, tokenId);
}

 /**
 * 
 * @param {*} provider 
 * @param {*} contractAddress 
 * @param {*} fromAddress 
 * @param {*} toAddress 
 * @param {*} tokenId 
 * @returns 
 */
async function transferFromGasEstimate(provider, contractAddress, fromAddress, toAddress, tokenId)
{  
    let contract = new ethers.Contract(contractAddress, IERC721_ABI, provider);
    return await contract.estimateGas.transferFrom(fromAddress, toAddress, tokenId);
}

async function approveGasEstimate(provider, contractAddress, toAddress, tokenId)
{
    let contract = new ethers.Contract(contractAddress, IERC721_ABI, signer);
    return await contract.estimateGas.approve(toAddress, tokenId);
}

/***** WRITE OPERATIONS *****/
/**
 * @description safe transfers tokenId from fromAddress to toAddress
 * @param {*} signer 
 * @param {*} contractAddress 
 * @param {*} fromAddress 
 * @param {*} toAddress 
 * @param {*} tokenId 
 * @returns receipt / response
 */
async function safeTransferFrom(signer, contractAddress, fromAddress, toAddress, tokenId, receipt=false)
{
    let contract = new ethers.Contract(contractAddress, IERC721_ABI, signer);
    const txnOpts = {
        nonce: await signer.getTransactionCount(),
        gasPrice: await signer.getGasPrice(),
        gasLimit: await contract.estimateGas.safeTransferFrom(fromAddress, toAddress, tokenId)
    };
    let response = await contract["safeTransferFrom(address,address,uint256)"](fromAddress, toAddress, tokenId, txnOpts);

    if(receipt)
    {
        await response.wait();
    }
    
    return response;
}

/**
 * @description transfers tokenId from fromAddress to toAddress
 * @param {*} signer 
 * @param {*} contractAddress 
 * @param {*} fromAddress 
 * @param {*} toAddress 
 * @param {*} tokenId 
 * @param {*} receipt 
 * @returns 
 */
async function transferFrom(signer, contractAddress, fromAddress, toAddress, tokenId, receipt=false)
{
    let contract = new ethers.Contract(contractAddress, IERC721_ABI, signer);
    const txnOpts = {
        nonce: await signer.getTransactionCount(),
        gasPrice: await signer.getGasPrice(),
        gasLimit: await contract.estimateGas.transferFrom(fromAddress, toAddress, tokenId)
    };

    let response = await contract.transferFrom(fromAddress, toAddress, tokenId, txnOpts);

    if(receipt)
    {
        await response.wait();
    }

    return response;
}

/**
 * Approves an operator for the owner
 * @param {*} signer 
 * @param {*} contractAddress 
 * @param {*} toAddress 
 * @param {*} tokenId 
 * @param {*} receipt 
 * @returns 
 */
async function approve(signer, contractAddress, toAddress, tokenId, receipt=false)
{
    let contract = new ethers.Contract(contractAddress, IERC721_ABI, signer);
    const txnOpts = {
        nonce: await signer.getTransactionCount(),
        gasPrice: await signer.getGasPrice(),
        gasLimit: await contract.estimateGas.approve(toAddress, tokenId)
    };

    let response = await contract.approve(toAddress, tokenId, txnOpts);

    if(receipt)
    {
        await response.wait();
    }

    return response;
}

/***** UNSIGNED WRITE OPERATIONS *****/
async function populateTransferFromTransaction(provider, contractAddress, fromAddress, toAddress, tokenId)
{
    let contract = new ethers.Contract(contractAddress, IERC721_ABI, provider);
    let unsignedTransaction = await contract.populateTransaction.transferFrom(fromAddress, toAddress, tokenId);
    return unsignedTransaction;
}

/***** USEFUL APIs *****/

/**
 * returns whether address is owner or approved
 * @param {*} provider 
 * @param {*} address 
 * @param {*} contractAddress 
 * @param {*} tokenId 
 * @returns whether address is owner or approved
 */
async function isOwnerOrApproved(provider, address, contractAddress, tokenId) 
{
    const owner = await ownerOf(provider, contractAddress, tokenId);
    const approved = await getApproved(provider, contractAddress, tokenId);

    return (address == owner) || (address == approved);
}

/**
 * requires owner or approved otherwise throws error
 * @param {*} provider 
 * @param {*} address 
 * @param {*} contractAddress 
 * @param {*} tokenId 
 */
async function requireOwnerOrApproved(provider, address, contractAddress, tokenId)
{
    const owner = await ownerOf(provider, contractAddress, tokenId);
    const approved = await getApproved(provider, contractAddress, tokenId);

    if((address != owner) && (address != approved))
    {
        TRANSACTION_ERROR_CODES.throwError(
            TRANSACTION_ERROR_CODES.NOT_OWNER_OR_APPROVED.code,
            TRANSACTION_ERROR_CODES.NOT_OWNER_OR_APPROVED.createMessage(address, 
                owner, approved, contractAddress, tokenId)
        );
    }
}

const IERC721 = {
    interfaceId,
    /** READ OPERATIONS **/
    supportsInterface,
    balanceOf,
    ownerOf,
    getApproved,
    isApprovedForAll,

    /** GAS ESTIMATES **/
    safeTransferFromGasEstimate,
    transferFromGasEstimate,
    approveGasEstimate,

    /** WRITE OPERATIONS **/
    safeTransferFrom,
    transferFrom,
    approve,

    /** UNSIGNED TRANSACTIONS **/
    populateTransferFromTransaction,

    /** USEFUL APIs **/
    isOwnerOrApproved,
    requireOwnerOrApproved
};

export default IERC721;