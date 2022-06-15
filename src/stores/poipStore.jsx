import create from 'zustand';

import { fetchPOIPMetadata } from '../helpers/poipMetadata';
import deviceStore from './deviceStore';

const contractAddress = process.env.OFFICIAL_POIP_ADDRESS;

const poipStore = create((set) => ({

  eventId: -1,
  metadata: null,
  claimable: false,
  loading: false,
  error: '',

  init: () => {
    const { poipEventId } = deviceStore.getState();
    set({ eventId: poipEventId });
  },

  reset: () => {
    set({
      eventId: -1,
      metadata: null,
      claimable: false,
      loading: false,
      error: ''
    });
  },

  loadPOIP: async () => {
    set({ loading: true, error: '', metadata: null });
    const { eventId } = poipStore.getState();
    try
    {
      if(eventId == -1) throw `Invalid eventId: ${eventId}`;

      const result = await fetchPOIPMetadata(eventId);
      set({
        loading: false,
        metadata: result,
        error: ''
      });
    }
    catch(error)
    {
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