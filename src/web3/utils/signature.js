import { ethers } from "ethers";

/*
    Decodes a DER encoded signature and returns { r, s, v}
*/
function decodeDERSignature(sig)
{
    /* 
        This helped immensely for obscure rules (0 padding)
        https://bitcoin.stackexchange.com/questions/92680/what-are-the-der-signature-and-sec-format
    */

    let header = sig.slice(0, 2);
    sig = sig.slice(2);
    if(header != "30")
    {
        throw "Invalid DER Header";
    }
    
    let length = parseInt(sig.slice(0, 2), 16) * 2;
    sig = sig.slice(2);
    if(length != sig.length)
    {
        throw `Invalid Signature Length, length: ${length}, sig length: ${sig.length}`;
    }

    header = sig.slice(0, 2);
    sig = sig.slice(2);
    if(header != "02")
    {
        throw `R invalid DER header, ${header}`;
    }

    length = parseInt(sig.slice(0, 2), 16) * 2;
    sig = sig.slice(2);

    if(length > sig.length)
    {
        throw `R invalid length, ${length}`;
    }
    let r = sig.slice(0, length);
    sig = sig.slice(length);

    header = sig.slice(0, 2);
    sig = sig.slice(2);
    if(header != "02")
    {
        throw `S invalid DER header, ${header}`;
    }
   
    length = parseInt(sig.slice(0, 2), 16) * 2;
    sig = sig.slice(2);

    if(length > sig.length)
    {
        throw `S invalid length, ${length}`;
    }

    let s = sig.slice(0, length);
    sig = sig.slice(length);

    /* remove padding if first byte > 0x74 */
    r = "0x" + r.slice(r.length - 32*2);
    s = "0x" + s.slice(s.length - 32*2);

    // let v = 27 + (parseInt(r.slice(-2), 16) % 2 != 0);

    return { r, s };
}

/*
    converts unsigned transaction (utx) to signed transaction (stx)
    from derSignature
*/
function convertDerSignatureToSignedTransaction(unsignedTransaction, derSignature, publicKey) {
    let { r, s } = decodeDERSignature(derSignature);
    console.log('OG s:', s);
    s = ethers.BigNumber.from(s);
    let secp256k1n = ethers.BigNumber.from('0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141');
    if (s.gte(secp256k1n.div(2).add(1))) {
        s = secp256k1n.sub(s);
    }
    s = s.toHexString();
    console.log('NEW s', s);

    // let etherSig = ethers.utils.concat([r, s, v]);
    var { recoveredPubKey, etherSig } = _tryRecoveryId(unsignedTransaction, r, s, 27);
    if (recoveredPubKey !== publicKey) {
        var { recoveredPubKey, etherSig } = _tryRecoveryId(unsignedTransaction, r, s, 28);
        if (recoveredPubKey !== publicKey) {
            throw new Error("Could not find v that recovers public key");
        }
        console.log('Deduced signature v to be 28');
    } else {
        console.log('Deduced signature v to be 27');
    }
    console.log('recovered pubkey:', recoveredPubKey);
    console.log('actual pubkey:', publicKey);

    return ethers.utils.serializeTransaction(unsignedTransaction, etherSig);
}

function _tryRecoveryId(unsignedTransaction, r, s, v) {
    let etherSig = ethers.utils.joinSignature({ r, s, v });

    const raw = ethers.utils.serializeTransaction(unsignedTransaction) // returns RLP encoded tx
    const msgHash = ethers.utils.keccak256(raw) // as specified by ECDSA
    const msgBytes = ethers.utils.arrayify(msgHash) // create binary hash
    const recoveredPubKey = ethers.utils.recoverPublicKey(msgBytes, etherSig)
    const recoveredAddress = ethers.utils.recoverAddress(msgBytes, etherSig)
    // console.log('recovered:', recoveredAddress, recoveredPubKey);
    return { recoveredPubKey, recoveredAddress, etherSig };
}

/*
    digest - data that the device signed. 0x string or BytesLike object
    derSignature - signature from the device
    chip - chip object from HAL
*/
function recoverRSV(digest, derSignature, chip) {
    let { r, s } = decodeDERSignature(derSignature);
    console.log('OG s:', s);
    s = ethers.BigNumber.from(s);
    let secp256k1n = ethers.BigNumber.from('0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141');
    if (s.gte(secp256k1n.div(2).add(1))) {
        s = secp256k1n.sub(s);
    }
    s = s.toHexString();
    console.log('NEW s', s);

    let v = 27;
    if (!_tryRecoveryId2(digest, chip, r, s, 27)) {
        if (!_tryRecoveryId2(digest, chip, r, s, 28)) {
            throw new Error("Could not find v that recovers chip");
        }
        v = 28;
        console.log('Deduced signature v to be 28');
    } else {
        console.log('Deduced signature v to be 27');
    }
    return { r, s, v }
}

function _tryRecoveryId2(hashBytes, chip, r, s, v) {
    let etherSig = ethers.utils.joinSignature({ r, s, v });
    const recoveredPublicKey = ethers.utils.recoverPublicKey(hashBytes, etherSig)
    return chip.comparePublicKeyWithChipId(recoveredPublicKey);
}

/*
    returns byte array of transaction to be signed
*/
function hashUnsignedTransaction(unsignedTransaction)
{
    try
    {
        let serialized = ethers.utils.serializeTransaction(unsignedTransaction);
        let hashed = ethers.utils.keccak256(serialized);
        return ethers.utils.arrayify(hashed);
    }
    catch (error)
    {
        console.log(`Error: ${error}`)
        throw "Most likely this is due to from: delete the field pls"
    }
}

/*
    Derives the blockchain address
    from the uncompressed public key
*/
function addressFromUCPublicKey(publicKey)
{
    return ethers.utils.computeAddress(ethers.utils.computePublicKey(publicKey));
}

function formatSignature(r, s, v)
{
  return ethers.utils.concat([
    ethers.utils.arrayify(r),
    ethers.utils.arrayify(s),
    ethers.utils.arrayify(v)
  ]);
}

export {
    decodeDERSignature,
    convertDerSignatureToSignedTransaction,
    hashUnsignedTransaction,
    addressFromUCPublicKey,
    recoverRSV,
    formatSignature
};
