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

  init: (_contractAddress, _tokenId) => {

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

  loadNFT: async () => {
    set({ loading: true, error: '', metadata: null });
    const { contractAddress, tokenId } = nftStore.getState();

    try 
    {
      const result = await fetchNFTMetadata(contractAddress, tokenId);
      console.log(`Result: ${JSON.stringify(result)}`);
      
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