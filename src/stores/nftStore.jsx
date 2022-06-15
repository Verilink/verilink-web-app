import create from 'zustand';

import { fetchNFTMetadata } from '../helpers/nftMetadata';

import deviceStore from './deviceStore';

const nftStore = create((set) => ({

  contractAddress: null,
  tokenId: 0,
  metadata: null,
  claimable: false,
  loading: false,
  error: '',

  init: () => {
    const { contractAddress: _contractAddress, tokenId: _tokenId } =
      deviceStore.getState();

    set({
      contractAddress: _contractAddress,
      tokenId: _tokenId
    });
  },

  reset: () => {
    set({
      contractAddress: null,
      tokenId: 0,
      metadata: null,
      claimable: false,
      loading: false,
      error: ''
    });
  },

  loadNFT: async (contractAddress, tokenId) => {
    set({ loading: true, error: '', metadata: null });

    try 
    {
      const result = await fetchNFTMetadata(contractAddress, tokenId);
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
        error: `We couldn't load the NFT with contract address: ${contractAddress}, tokenId: ${tokenId}`
      });
    }
  },

  isClaimable: async () => { 
    /* TODO */ 

  },

}));

export default nftStore;