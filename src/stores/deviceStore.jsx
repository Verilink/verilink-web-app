import create from 'zustand';
import URL from 'url-parse';
import {  
  parseKeys, 
  parsePublicKey, 
  parseChipId,
  bytesFromHexString 
} from "../helpers/parseKeys";

const TAG_DOMAIN = process.env.REACT_APP_TAG_DOMAIN;


const deviceStore = create((set) => ({

  keys: null,
  publicKey: null,
  chipId: null,

  init: () => {
    const { updateFromKeys } = deviceStore.getState()
    const url = URL(window.location.href, true);
    const keys = parseKeys(url.query.static);
    
    if(keys)
    {
      updateFromKeys(keys);
    }
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
}));

export default deviceStore;