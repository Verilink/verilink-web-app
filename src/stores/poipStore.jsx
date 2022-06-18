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
      const tokenLimit = (await eventTokenLimit(MATIC_PROVIDER, eventId)).toNumber();
      const tokensMinted = (await eventTokensMinted(MATIC_PROVIDER, eventId)).toNumber();
      const startTime = (await eventStart(MATIC_PROVIDER, eventId)).toNumber();
      const finishTime = (await eventFinish(MATIC_PROVIDER, eventId)).toNumber();
      const creator = (await eventCreator(MATIC_PROVIDER, eventId));

      console.log(`Start Time: ${JSON.stringify(startTime)}`);
      console.log(`Finish Time: ${JSON.stringify(finishTime)}`)
      set({
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