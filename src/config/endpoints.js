const API_ENDPOINT = process.env.REACT_APP_BUILD_ENV === 'prod' ?
	'https://api.verilink.technology' : 'https://dev-api.verilink.technology';

const OPENSEA_MATIC_BASE = "https://opensea.io/assets/matic/";
const SCANNER_MATIC_BASE = "https://polygonscan.com/tokens-nft?q=";


export const getNFTMetadataURI = (contractAddress, tokenId) => {
	return `${API_ENDPOINT}/nft/contract/${contractAddress}/token/${tokenId}`;
}

export const getPOIPMetadataURI = (contractAddress, eventId) => {
	return `${API_ENDPOINT}/nft/contract/${contractAddress}/token/${eventId}`;
}

export const tagLookupURI = (publicKey) => {
  return `${API_ENDPOINT}/tag/publickey/${publicKey}`;
}

export const getOpenSeaMaticURI = (contractAddress, tokenID) =>
{
	return `${OPENSEA_MATIC_BASE}${contractAddress}/${tokenID}`;
}

export const getScannerMaticURI = (contractAddress) => {
	return `${SCANNER_MATIC_BASE}${contractAddress}`;
}