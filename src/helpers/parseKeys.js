import { ethers } from 'ethers'

function parseKeys(payload) {

  payload = ethers.utils.arrayify(payload);

  try {
    const primaryPublicKeyLength = parseInt('0x' + payload.slice(0, 2)) * 2
    const primaryPublicKeyRaw = payload.slice(2, primaryPublicKeyLength + 2)
    const primaryPublicKeyHash = ethers.utils.sha256('0x' + primaryPublicKeyRaw.slice(2))

    const secondaryPublicKeyLength =
      parseInt('0x' + payload.slice(primaryPublicKeyLength + 2, primaryPublicKeyLength + 4)) * 2

    const secondaryPublicKeyRaw = payload.slice(
      primaryPublicKeyLength + 4,
      primaryPublicKeyLength + secondaryPublicKeyLength + 4
    )

    const secondaryPublicKeyHash = ethers.utils.sha256('0x' + secondaryPublicKeyRaw.slice(2))

    const tertiaryPublicKeyLength =
      parseInt(
        '0x' +
          payload.slice(
            primaryPublicKeyLength + secondaryPublicKeyLength + 4,
            primaryPublicKeyLength + secondaryPublicKeyLength + 6
          )
      ) * 2

    let tertiaryPublicKeyRaw = null
    let tertiaryPublicKeyHash = null

    if (tertiaryPublicKeyLength > 0) {
      tertiaryPublicKeyRaw = payload.slice(
        primaryPublicKeyLength + secondaryPublicKeyLength + 6,
        primaryPublicKeyLength + secondaryPublicKeyLength + tertiaryPublicKeyLength + 6
      )

      tertiaryPublicKeyHash = ethers.utils.sha256('0x' + tertiaryPublicKeyRaw.slice(2))
    }

    const keys = {
      primaryPublicKeyHash: primaryPublicKeyHash,
      primaryPublicKeyRaw: primaryPublicKeyRaw,
      secondaryPublicKeyHash: secondaryPublicKeyHash,
      secondaryPublicKeyRaw: secondaryPublicKeyRaw,
      tertiaryPublicKeyHash: tertiaryPublicKeyHash,
      tertiaryPublicKeyRaw: tertiaryPublicKeyRaw,
    }

    return keys
  } catch (err) {
    return false
  }
}

function parsePublicKey (publicKey) {
  return ethers.utils.computePublicKey(publicKey);
}

function parseChipId (publicKey) {
  return ethers.utils.keccak256(
    '0x' + parsePublicKey(publicKey).slice(4));
}

function bytesFromHexString (hexString) 
{
  if(hexString.slice(0, 2) != "0x")
  {
    hexString = "0x" + hexString;
  }

  return ethers.utils.arrayify(hexString);
}

export {
  parseKeys,
  parsePublicKey,
  parseChipId,
  bytesFromHexString
};