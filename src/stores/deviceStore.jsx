import create from 'zustand';
import URL from 'url-parse';
import parseKeys from "../helpers/parseKeys";


const deviceStore = create((set) => ({


  keys: null,
  publicKey: null,
  chipId: null,

  init: () => {
    const url = URL(window.location.href, true);
    const keys = parseKeys(url.query.static);

    if(keys) {

      

      set({ keys });

    }
  },

  triggerScan: async (reqx) => {
    try {
      var req = {
        publicKey: {
          allowCredentials: [
            {
              id: fromHexString(reqx),
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




}));

export default deviceStore;