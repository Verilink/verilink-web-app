import create from 'zustand';
import URL from 'url-parse';
import {  
  parseKeys, 
  parsePublicKey, 
  parseChipId,
  bytesFromHexString 
} from "../helpers/parseKeys";
import { tagLookupURI } from '../config/endpoints';
import axios from 'axios';

const TAG_DOMAIN = process.env.REACT_APP_TAG_DOMAIN;

const deviceStore = create((set) => ({

  keys: null,
  publicKey: null,
  chipId: null,
  contractAddress: null,
  tokenId: null,
  poipEventId: null,

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
    if(keys && keys.primaryPublicKeyRaw)
    {
      set({ 
        keys, 
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
              id: bytesFromHexString(reqx),
              transports: ['nfc'],
              type: 'public-key',
            },
          ],
          challenge: new Uint8Array([
            113, 241, 176, 49, 249, 113, 39, 237, 135, 170, 177, 61, 15, 14, 105, 236, 120, 140, 4, 41, 65, 225, 107,
            63, 214, 129, 133, 223, 169, 200, 21, 88,
          ]),
          rpId: TAG_DOMAIN,
          timeout: 60000,
          userVerification: 'discouraged',
        },
      }

      var xdd = await navigator.credentials.get(req)

      return xdd?.response.signature
    } catch (err) {
      console.log('Error with scan', err)
    }
  },

  linkHalo: async () => {
    const { triggerScan, updateFromKeys } = deviceStore.getState()
    const sig = await triggerScan('02')

    if (typeof sig !== 'undefined') {
      const keys = parseKeys(sig);
      if(keys)
      {
        updateFromKeys(keys);
      }
    }
  },

  loadDevice: async () => {
    const publicKey = deviceStore.getState().publicKey;
    
    const internalFetchUrl = tagLookupURI(publicKey);
    try
    {
      const result = await axios(internalFetchUrl);
      const data = result.data;
      set({ 
        contractAddress: data.contractAddress,
        tokenId: data.tokenId,
        poipEventId: data.poipEventId
      });
    }
    catch(error)
    {
      console.log(`Error Loading the device details: ${error}`);
    }
  }
}));

export default deviceStore;