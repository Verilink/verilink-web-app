import { ethers } from "ethers";
import { POIP_ADDRESS } from "../../../config/settings";
import { IPOIP_ABI } from './ABI';

export const uri = async (provider, id) => (await (new ethers.Contract(POIP_ADDRESS, IPOIP_ABI, provider).uri(id)));
export const balanceOf = async (provider, owner, id) => (await (new ethers.Contract(POIP_ADDRESS, IPOIP_ABI, provider).balanceOf(owner, id)));
export const eventTokenLimit = async (provider, id) => (await (new ethers.Contract(POIP_ADDRESS, IPOIP_ABI, provider).eventTokenLimit(id)));
export const eventTokensMinted = async (provider, id) => (await (new ethers.Contract(POIP_ADDRESS, IPOIP_ABI, provider).eventTokensMinted(id)));
export const eventStart = async (provider, id) => (await (new ethers.Contract(POIP_ADDRESS, IPOIP_ABI, provider).eventStart(id)));
export const eventFinish = async (provider, id) => (await (new ethers.Contract(POIP_ADDRESS, IPOIP_ABI, provider).eventFinish(id)));
export const eventCreator = async (provider, id) => (await (new ethers.Contract(POIP_ADDRESS, IPOIP_ABI, provider).eventCreator(id)));

// TODO: maybe factor out txnOps code from other places that use it like IERC72IPhysicalTap2Claim claim()
export const mint = async (signer, eventId, chipId, to, blockHash, signature, receipt = false) => {
    let contract = new ethers.Contract(POIP_ADDRESS, IPOIP_ABI, signer)

    // console.log('wat:', await signer.getTransactionCount(),await signer.getGasPrice(), (await contract.estimateGas.claim(fromAddress,
    //     toAddress, tokenId, blockHash, signature)).mul(2));
    console.log(eventId, chipId, to, blockHash, signature)
    const txnOpts = {
        nonce: await signer.getTransactionCount(),
        gasPrice: await signer.getGasPrice(),
        gasLimit: (await contract.estimateGas.mint(eventId, chipId, to, blockHash, signature)).mul(2)
    };

    let response = await contract.mint(eventId, chipId, to, blockHash, signature, txnOpts);

    console.log(`Response: ${JSON.stringify(response)}`);

    if (receipt) {
        await response.wait();
    }

    return response;
}