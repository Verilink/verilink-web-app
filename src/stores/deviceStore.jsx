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
import { recoverRSV, formatSignature } from '../web3/utils/signature';
import nftStore from './nftStore';
import poipStore from './poipStore';

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
  fake: false,

  init: (data) => {
    const { updateFromKeys } = deviceStore.getState()
    const keys = parseKeys(data);
    
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
        publicKey: parsePublicKey("0x" + keys.primaryPublicKeyRaw), 
        chipId: parseChipId("0x" + keys.primaryPublicKeyRaw)
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

  linkHalo: async () => {
    const { triggerScan, updateFromKeys } = deviceStore.getState()

    const sig = await triggerScan('02')

    if (typeof sig !== 'undefined') {
      const sss = hexStringFromUint8(sig)
      const keys = parseKeys(sss);
      
      if(keys)
      {
        updateFromKeys(keys);
      }
    }
  },

  verifyHalo: async () => {
    const { triggerScan, publicKey, chipId } = deviceStore.getState();

    const block = await MATIC_PROVIDER.getBlock();

    const sigMsg = block.hash;
    const sigCmd = generateCmd(1, 1, sigMsg, false);
    const sig = await triggerScan(sigCmd);
    const sigString = hexStringFromUint8(sig);
    const { r, s, v } = recoverRSV(sigMsg, sigString, chipId);
    let formattedSig = formatSignature(r, s, v);

    const pk = ethers.utils.recoverPublicKey(sigMsg, formattedSig);
    console.log(`Pk: ${pk}`);
    console.log(`Public: ${publicKey}`);

    if(pk === publicKey)
    {
      set({ 
        verified: true
      });
      return true;
    }
    else
    {
      set({
        fake: true
      });
      return false;
    }
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