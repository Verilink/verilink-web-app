import { ethers } from 'ethers'
import { hexStringFromUint8 } from './parseKeys'

export default function generateCmd(cmd, keyslot, message = null, prefix=true) {
  // EIP-191 signed data for local verification.
  let messageBytes = message;

  if(prefix)
  {
    messageBytes = ethers.utils.hashMessage(message);
  }

  // Remove prepended 0x.
  messageBytes = messageBytes.slice(2)

  // Structure command bytes.
  let cmdBytes = new Uint8Array(2)
  cmdBytes[0] = cmd
  cmdBytes[1] = keyslot
  cmdBytes = hexStringFromUint8(cmdBytes)

  // Prepend the message with the command.
  const inputBytes = cmdBytes + messageBytes
  return inputBytes
}