import create from 'zustand';

import { fetchPOIPMetadata } from '../helpers/poipMetadata';
import { ethers } from 'ethers';
import { MATIC_PROVIDER } from '../config/settings';
import { 
  eventTokenLimit, 
  eventTokensMinted,
  eventStart,
  eventFinish
 } from '../web3/interfaces/IPOIP/IPOIP';

const contractAddress = process.env.OFFICIAL_POIP_ADDRESS;

const poipStore = create((set) => ({

  eventId: -1,
  metadata: null,
  claimable: false,
  loading: false,
  error: '',
  tokenLimit: null,
  tokensMinted: null,
  startTime: null,
  endTime: null,

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
      error: ''
    });
  },

  pollTokensMinted: async () => {
    const { eventId } = poipStore.getState();
    const tokensMinted = await eventTokenLimit(MATIC_PROVIDER, eventId);
    set({ tokensMinted });
  },

  loadPOIP: async () => {
    set({ loading: true, error: '', metadata: null });
    const { eventId } = poipStore.getState();
    try
    {
      if(eventId == -1) throw `Invalid eventId: ${eventId}`;

      const result = await fetchPOIPMetadata(eventId);
      const tokenLimit = await eventTokenLimit(MATIC_PROVIDER, eventId);
      const tokensMinted = await eventTokensMinted(MATIC_PROVIDER, eventId);
      const startTime = await eventStart(MATIC_PROVIDER, eventId);
      const endTime = await eventFinish(MATIC_PROVIDER, eventId);
      
      set({
        loading: false,
        metadata: result,
        error: '',
        tokenLimit,
        tokensMinted,
        startTime,
        endTime
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