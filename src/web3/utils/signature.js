import { ethers } from "ethers";
import { parseChipId } from "../../helpers/parseKeys";
/*
    Decodes a DER encoded signature and returns { r, s, v}
*/
function decodeDERSignature(sig)
{
    let header0 = sig.slice(0, 2)
    if (parseInt('0x' + header0) !== 0x30) {
      throw Error('Invalid header.')
    }
  
    let header_r0 = sig.slice(4, 6)
    let header_r1 = sig.slice(6, 8)
  
    if (parseInt('0x' + header_r0) !== 0x02) {
      throw Error('Invalid header (2).')
    }
  
    let length_r = parseInt('0x' + header_r1) * 2
    let r = sig.slice(8, length_r + 8)
  
    let header_s0 = sig.slice(length_r + 8, length_r + 10)
    let header_s1 = sig.slice(length_r + 10, length_r + 12)
  
    if (parseInt('0x' + header_s0) !== 0x02) {
      throw Error('Invalid header (2).')
    }
  
    let s = sig.slice(length_r + 12, length_r + 12 + parseInt('0x' + header_s1) * 2)
  
    if (r.length == 66) {
      r = r.slice(2, 130)
    }
  
    if (s.length == 66) {
      s = s.slice(2, 130)
    }
  
    return {
        r: "0x" + r,
        s: "0x" + s,
    }
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
    console.log("etherSig:", etherSig);

    const recoveredPublicKey = ethers.utils.recoverPublicKey(hashBytes, etherSig)
    console.log(`RecoveredPublicKey: ${recoveredPublicKey}`);
    return chip == parseChipId(recoveredPublicKey);
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
