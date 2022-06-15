import React from 'react';
import { getPOIPMetadataURI } from '../config/endpoints';
import { supportIpfsUrl } from './ipfs';
import axios from 'axios';

const contractAddress = process.env.OFFICIAL_POIP_ADDRESS;

export const fetchPOIPMetadata = async (eventId) => {
  const internalFetchUrl = getPOIPMetadataURI(contractAddress, eventId);
  const result = await axios(internalFetchUrl);
  const data = result.data;
  
  if(data.metadata)
  { /* handle IPFS metadata */
    const ipfsResult = await axios(supportIpfsUrl(data.metadata));
    return processPOIPMetadata({})
  }
  else
  {
    return processPOIPMetadata(data);
  }
}

export const processPOIPMetadata = (metadata, low_res=true) => {
  if(!metadata) return null;

	/* TODO: data design for extra images / videos */
  let physicalMedia = []
	if(metadata.physicalWork)
	{
		physicalMedia.push(
			{
				type: "image",
				src: metadata.physicalWork
			}
		);
	}
	
	let digitalMedia = []

	if(metadata.animation_url && low_res && metadata.previewMedia?.animation_url)
	{
		digitalMedia.push(
			{
				type: "video",
				src: metadata.previewMedia.animation_url
			}
		)
	}
	else if(metadata.animation_url)
	{
		digitalMedia.push(
			{
				type: "video",
				src: metadata.animation_url
			}
		)
	}
	else if(metadata.image && low_res && metadata.previewMedia?.image){
		digitalMedia.push(
			{
				type: "image",
				src: metadata.previewMedia.image
			}
		)
	}
	else if(metadata.image) 
	{
		digitalMedia.push(
			{
				type: "image",
				src: metadata.image
			}
		)
	}

	return {
		physicalMedia,
    digitalMedia,
		title: metadata.name,
		creator: metadata.creator,
    description: metadata.description,
		contractAddress: metadata.contractAddress,
		tokenId: metadata.tokenID,
	}
}