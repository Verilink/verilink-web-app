import React from 'react';
import { getPOIPMetadataURI } from '../config/endpoints';
import { supportIpfsUrl } from './ipfs';
import axios from 'axios';
import { POIP_ADDRESS } from '../config/settings';

export const fetchPOIPMetadata = async (eventId) => {

  const internalFetchUrl = getPOIPMetadataURI(POIP_ADDRESS, eventId);
  const result = await axios(internalFetchUrl);

  const data = result.data;
  
  if(data.metadata && !data.ipfs_cached)
  { /* handle IPFS metadata */
    const ipfsResult = await axios(supportIpfsUrl(data.metadata));
    return processPOIPMetadata(ipfsResult);
  }
  else
  {
    return processPOIPMetadata(data);
  }
}

export const processPOIPMetadata = (metadata) => {
  if(!metadata) return null;
	
	console.log(`Processing metadata: ${JSON.stringify(metadata)}`);

	let image = null;
	if(metadata.image)
	{
		image = {
			type: "image",
			src: metadata.image
		};
	}

	let animation_url = null;
	if(metadata.animation_url)
	{
		animation_url = {
			type: "video",
			src: metadata.animation_url
		};
	}

	return {
		image,
		animation_url,
		title: metadata.name,
		creator: metadata.creator,
    description: metadata.description,
		eventId: metadata.tokenId
	}
}