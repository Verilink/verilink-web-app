import create from 'zustand';
import URL from 'url-parse';

const nftStore = create((set) => ({

  contractAddress: null,
  tokenId: 0,
  chipId: 0,


  lookup: (chipId) => {

  },

  retrieve: (contractAddress, tokenId) => {
    
  }


}));

export default nftStore;