import create from 'zustand';
import URL from 'url-parse';
import {  
  parseKeys, 
  parsePublicKey, 
  parseChipId,
  bytesFromHexString, 
  uint8FromHexString,
  hexStringFromUint8
} from "../helpers/parseKeys";
import { tagLookupURI } from '../config/endpoints';
import axios from 'axios';
import { MATIC_PROVIDER } from '../config/settings';
import generateCmd from '../helpers/generateCMD';
import { ethers } from 'ethers';

const TAG_DOMAIN = process.env.REACT_APP_TAG_DOMAIN;

const deviceStore = create((set) => ({

  keys: null,
  publicKey: null,
  chipId: null,
  contractAddress: null,
  loadingDevice: false,
  deviceLookupError: { isSet: false, message: "" },
  tokenId: null,
  poipEventId: null,
  verified: false,

  keyLoad: () => {
    const { updateFromKeys } = deviceStore.getState();
    const url = URL(window.location.href, true);
    console.log(`URL: ${JSON.stringify(url.query.static)}`);
    //const keys = { primaryPublicKeyRaw: url.}
  },

  init: () => {
    const { updateFromKeys } = deviceStore.getState()
    const url = URL(window.location.href, true);
    const keys = parseKeys(url.query.static);
    
    if(keys)
    {
      updateFromKeys(keys);
    }
  },

  reset: () => {
    set({
      keys: null,
      publicKey: null,
      chipId: null,
      contractAddress: null,
      tokenId: null,
      poipEventId: null
    });
  },

  updateFromKeys: (keys) => {
    const state = deviceStore.getState();
    console.log(`Keys: ${JSON.stringify(keys)}`)
    if(keys && keys.primaryPublicKeyRaw)
    {
      set({ 
        keys: {...state.keys, ...keys }, 
        publicKey: parsePublicKey(keys.primaryPublicKeyRaw), 
        chipId: parseChipId(keys.primaryPublicKeyRaw)
      });
    }
  },

  triggerScan: async (reqx) => {
    try {
      var req = {
        publicKey: {
          allowCredentials: [
            {
              id: uint8FromHexString(reqx),
              transports: ['nfc'],
              type: 'public-key',
            },
          ],
          challenge: new Uint8Array([
            113, 241, 176, 49, 249, 113, 39, 237, 135, 170, 177, 61, 15, 14, 105, 236, 120, 140, 4, 41, 65, 225, 107,
            63, 214, 129, 133, 223, 169, 200, 21, 88,
          ]),
          //rpId: TAG_DOMAIN,
          timeout: 60000,
          userVerification: 'discouraged',
        },
      }

      var xdd = await navigator.credentials.get(req) 
      return xdd?.response.signature
    } catch (err) {
      console.log('Error with scan', err)
      throw `Scan Failed! ${JSON.stringify(err)}`;
    }
  },

  linkHalo: async (addLog) => {
    const { triggerScan, updateFromKeys } = deviceStore.getState()

    const sig = await triggerScan('02')

    if (typeof sig !== 'undefined') {
      const sss = hexStringFromUint8(sig)
      const keys = parseKeys(sss);
      
      if(keys)
      {
        addLog("Updating Keys");
        updateFromKeys(keys, addLog);
      }
    }
  },

  verifyHalo: async (addLog) => {
    const { triggerScan, updateFromKeys } = deviceStore.getState();

    const block = await MATIC_PROVIDER.getBlock();

    const sigMsg = block.hash;
    const sigCmd = generateCmd(1, 1, sigMsg)
    console.log(`SigCmd: ${JSON.stringify(sigCmd)}`)
    const sig = await triggerScan(sigCmd)
    const sigString = hexStringFromUint8(sig)

    addLog(`SigString: ${JSON.stringify(sigString)}`);
    const pk = ethers.utils.recoverPublicKey(ethers.utils.hashMessage(sigMsg), "0x" + sigString);
    addLog(`PK: ${JSON.stringify(pk)}`);

    updateFromKeys({ primaryPublicKeyRaw: pk })
  },

  loadDevice: async () => {
    const { publicKey } = deviceStore.getState();

    set({
      loadingDevice: true,
      deviceLookupError: { isSet: false, message: "" }
    });

    const internalFetchUrl = tagLookupURI(publicKey);
    try
    {
      const result = await axios(internalFetchUrl);
      const data = result.data;
      console.log(`Data: ${JSON.stringify(data)}`);

      set({ 
        contractAddress: data.contractAddress,
        tokenId: data.tokenId,
        poipEventId: data.poipEventId,
        loadingDevice: false
      });
    }
    catch(error)
    {
      console.log(`Error Loading the device details: ${error}`);
      set({
        loadingDevice: true,
        deviceLookupError: { isSet: true, message: "Chip is not minted" }
      });

      throw "Device load failed!";
    }
  }
}));

export default deviceStore;