import { ethers } from "ethers"

// This shit is nasty.
const unpackDERSig = (sig) => {
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
    r: r,
    s: s,
  }
}

const getPublicKeyFromSignature = (message, signature) => {

  const sigRaw = unpackDERSig(signature);

  let vByte = 

}

export function verifySignature(message, signature, publicKey) {
  console.log(`digest: ${message}`);
  console.log(`signature: ${signature}`);
  console.log(`publicKey: ${publicKey}`);

  // Compute the Ethereum address from the publicKey.
  const computedAddress = ethers.utils.computeAddress('0x' + publicKey)
  console.log(`computed address: ${computedAddress}`);

  // Strip out DER formatting to get r and s.
  const sigRaw = unpackDERSignature(signature);
  console.log(`sig r: ${sigRaw.r}`);
  console.log(`sig s: ${sigRaw.s}`)

  // We generate DER signatures, not RLP. As such we do not have the v parameter and must ascertain it.
  let vByte = new Uint8Array(1);
  vByte[0] = 27;
  const vByte0 = buf2hex(vByte);
  vByte[0] = 28;
  const vByte1 = buf2hex(vByte);

  // Test which byte was used in the message.
  switch(computedAddress) {
    case ethers.utils.verifyMessage(message, '0x' + sigRaw.r + sigRaw.s + vByte0):
      return true;
    case ethers.utils.verifyMessage(message, '0x' + sigRaw.r + sigRaw.s + vByte1):
      return true;
    default:
    return false;
  }