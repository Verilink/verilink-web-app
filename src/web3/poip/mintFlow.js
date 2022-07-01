import { ethers } from "ethers";
import { isDev, MATIC_PROVIDER } from "../../config/settings";

/* Required Interfaces */
import { recoverRSV, formatSignature } from "../utils/signature";
import { decodeSignatureWithChipId } from "../../helpers/verifySignature";
import axios from 'axios';
import { getMintRequestURI } from "../../config/endpoints";

/**********************************************************
    The Backend will be charged the gas fees

    The Web App Claim Flow is as follows
    1.) Assert the necessary requirements
    2.) Build a message to be signed by the chip
    3.) Sign the message with the chip
    4.) Send the chip signature to the backend
    5.) Backend submits the transaction and provides a receipt
**********************************************************/

/**
 * Returns the message for chip claim
 * @param {*} eventId 
 * @param {*} chipId 
 * @param {*} to 
 * @param {*} blockHash 
 * @returns message for poip chip claim
 */
function claimMessage(eventId, chipId, blockHash) {

    const prefix = "\x19Ethereum Signed Message:\n32";
    /* pack the data and hash */
    let hash = ethers.utils.keccak256(
        ethers.utils.arrayify(
            ethers.utils.solidityPack(
                ["uint256", "bytes32", "bytes32"],
                [eventId, chipId, blockHash]
            ))
    );

    hash = ethers.utils.arrayify(hash);

    let message = ethers.utils.keccak256(
        ethers.utils.arrayify(
            ethers.utils.solidityPack(
                ["string", "bytes32"],
                [prefix, hash]
            ))
    );

    return ethers.utils.hexlify(message);
}

/**
 * builds the claim message to be signed by external chip
 * @param {*} wallet
 * @param {*} eventId 
 * @param {*} chipId 
 * @returns { message, block }
 */
export async function buildPoipMintChipMessage(eventId, chipId) {

    let blockNumber = (await MATIC_PROVIDER.getBlockNumber()) - 1;
    let block = await MATIC_PROVIDER.getBlock(blockNumber);
    let blockHash = block.hash;

    let message = claimMessage(eventId, chipId, blockHash);

    return {
        message,
        block
    }
}

export async function backendPoipMintRequest(email, eventId, blockhash, chipId, signature, message, metadata) {
    const { r, s, v } = recoverRSV(message, signature, chipId);

    let sig = formatSignature(r, s, v);
    console.log('tryna mint', sig)

    const post = {
        email, eventId, blockhash, chipId, signature: ethers.utils.hexlify(sig),
        name: metadata.name, creator: metadata.creator
    };

    console.log(`Post: ${JSON.stringify(post)}`);
    
    const result = await axios.post(getMintRequestURI(), {
        email, eventId, blockhash, chipId, signature: ethers.utils.hexlify(sig), test: isDev()
    });
   
    return result.data;
}