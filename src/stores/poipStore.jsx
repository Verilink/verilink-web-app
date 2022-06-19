import create from 'zustand';

import { fetchPOIPMetadata } from '../helpers/poipMetadata';
import { ethers } from 'ethers';
import { MATIC_PROVIDER } from '../config/settings';
import { 
  eventTokenLimit, 
  eventTokensMinted,
  eventStart,
  eventFinish,
  eventCreator
 } from '../web3/interfaces/IPOIP/IPOIP';

const contractAddress = process.env.OFFICIAL_POIP_ADDRESS;

const safeBigNumber = (bn, maxBits=-1) => {
  try
  {
    const number = bn.toNumber();
    return number;
  }
  catch(error)
  {
    console.log("max safe");
    if(maxBits == -1) {
      return Number.MAX_SAFE_INTEGER;
    }
    else {
      return Math.pow(2, maxBits);
    }
  }
}

const poipStore = create((set) => ({

  eventId: -1,
  metadata: null,
  claimable: false,
  loading: false,
  error: '',
  tokenLimit: null,
  tokensMinted: null,
  startTime: null,
  finishTime: null,
  loaded: false,

  init: (poipEventId) => {
    set({ eventId: poipEventId });
  },

  /* add the poll to the all */

  reset: () => {
    set({
      eventId: -1,
      metadata: null,
      claimable: false,
      loading: false,
      loaded: false,
      error: ''
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
    }
  },

  isClaimable: async () => {
    /* TODO */
  }
}));

export default poipStore;