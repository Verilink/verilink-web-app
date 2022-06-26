import create from 'zustand';
import { fetchPOIPMetadata } from '../helpers/poipMetadata';
import { MATIC_PROVIDER } from '../config/settings';
import moment from 'moment';
import { 
  claimMessage, 
  buildPoipMintChipMessage, 
  backendPoipMintRequest
  } from "../web3/poip/mintFlow";
import generateCmd from '../helpers/generateCMD';
import { hexStringFromUint8 } from "../helpers/parseKeys";
import { 
  eventTokenLimit, 
  eventTokensMinted,
  eventStart,
  eventFinish,
  eventCreator
 } from '../web3/interfaces/IPOIP/IPOIP';
import deviceStore from './deviceStore';
import { ethers } from 'ethers';

const contractAddress = process.env.OFFICIAL_POIP_ADDRESS;

const safeBigNumber = (bn, maxBits=-1) => {
  try
  {
    const number = bn.toNumber();
    return number;
  }
  catch(error)
  {
    if(maxBits == -1) {
      return Number.MAX_SAFE_INTEGER;
    }
    else {
      return Math.pow(2, maxBits);
    }
  }
}

/* Todo, throw error up top */

const poipStore = create((set) => ({

  eventId: -1,
  metadata: null,
  loading: false,
  error: '',
  tokenLimit: null,
  tokensMinted: null,
  startTime: null,
  finishTime: null,
  loaded: false,
  minting: false,
  errorMinting: false,
  transactionHash: null,

  init: (poipEventId) => {
    console.log(`Poip Intialized!: ${poipEventId}`)
    set({ eventId: poipEventId });
  },

  /* add the poll to the all */
  reset: () => {
    set({
      eventId: -1,
      metadata: null,
      loading: false,
      loaded: false,
      error: '',
      tokenLimit: null,
      tokensMinted: null,
      startTime: null,
      finishTime: null,
      minting: false,
      errorMinting: false,
      transactionHash: null
    });
  },

  pollTokensMinted: async () => {
    const { eventId, loaded } = poipStore.getState();
    if(loaded)
    {
      const tokensMinted = safeBigNumber(await eventTokensMinted(MATIC_PROVIDER, eventId));
      set({ tokensMinted });
    }
  },

  loadPOIP: async () => {
    set({ loading: true, error: '', metadata: null });
    const { eventId } = poipStore.getState();
    try
    {
      if(eventId == -1) throw `Invalid eventId: ${eventId}`;

      const result = await fetchPOIPMetadata(eventId);
      const tokenLimit = safeBigNumber(await eventTokenLimit(MATIC_PROVIDER, eventId));
      const tokensMinted = safeBigNumber(await eventTokensMinted(MATIC_PROVIDER, eventId));
      const startTime = safeBigNumber(await eventStart(MATIC_PROVIDER, eventId), 32);
      const finishTime = safeBigNumber(await eventFinish(MATIC_PROVIDER, eventId), 32);
      const creator = (await eventCreator(MATIC_PROVIDER, eventId));

      set({
        loaded: true,
        loading: false,
        metadata: result,
        error: '',
        tokenLimit,
        tokensMinted,
        startTime,
        finishTime,
        creator
      });
    }
    catch(error)
    {
      console.log(`Error Getting Metadata: ${error}`)
      set({
        loading: false,
        metadata: null,
        error: `We couldn't load the POIP with contract address: ${contractAddress}, eventId: ${eventId}`
      });
      throw `Error Loading POIP: ${error}`
    }
  },

  tokensLeft: () => {
    const { eventId, loaded, tokensMinted, tokenLimit } = poipStore.getState();
    if(eventId == -1 || loaded == false) return 0;
    return tokenLimit - tokensMinted;
  },

  isEventLive: () => {
    const { eventId, loaded, startTime, finishTime } = poipStore.getState();

    if(eventId == -1 || loaded == false) return false;
    else
    {
      let now = moment();
      let startMoment = moment.unix(startTime);
      let finishMoment = moment.unix(finishTime);

      if(now >= startMoment && now <= finishMoment)
      {
        return true;
      }
      else
      {
        return false;
      }
    }
  },

  isClaimable: () => {
    const { isEventLive, tokensLeft } = poipStore.getState();
    return (isEventLive() == true) && (tokensLeft() > 0);
  },

  mintPOIP: async (address) => {

    const { chipId, triggerScan } = deviceStore.getState();
    const { eventId, isClaimable, metadata } = poipStore.getState();
    
    if(isClaimable())
    {
      set({ minting: true, errorMinting: false, transactionHash: null });
      try
      {
        const { message, block } = await buildPoipMintChipMessage(eventId, chipId);
        const sigCmd = generateCmd(1, 1, message, false);
        const sig = await triggerScan(sigCmd);
        const signature = hexStringFromUint8(sig);
        const response = await backendPoipMintRequest(address, eventId, block.hash, chipId, signature, message, metadata);
        console.log(`Request: ${JSON.stringify(response)}`);

        const receipt = await MATIC_PROVIDER.waitForTransaction(response.hash);
        if(receipt.status == 1)
        {
          set({ minting: false, errorMinting: false, transactionHash: response.hash })
        }
        else
        {
          set({ minting: false, errorMinting: true, transactionHash: response.hash });
        }
      }
      catch(error) 
      {
        console.log(`Error minting POIP: ${error}`);
        set({ minting: false, errorMinting: true, transactionHash: null });
        throw `Error minting POIP: ${error}`
      }
    }
  }

}));

export default poipStore;