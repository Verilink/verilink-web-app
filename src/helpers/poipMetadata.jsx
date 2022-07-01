import React from 'react';
import { getPOIPMetadataURI } from '../config/endpoints';
import { supportIpfsUrl, isIPFS} from './ipfs';
import axios from 'axios';
import { getPOIPAddress } from '../config/endpoints';
import { uri } from '../web3/interfaces/IPOIP/IPOIP';
import { MATIC_PROVIDER } from '../config/settings';

export const fetchPOIPMetadataCentralized = async (eventId) => {
	const internalFetchUrl = getPOIPMetadataURI(getPOIPAddress(), eventId);
  const result = await axios(internalFetchUrl);

  const data = result.data;
  
  if(data.metadata && !data.ipfs_cached)
  { /* handle IPFS metadata */
    const ipfsResult = await axios(supportIpfsUrl(data.metadata));
    return ipfsResult;
  }
  else
  {
    return data;
  }
}

export const fetchPOIPMetadataBlockchain = async (eventId) => {
	const metadataUri = await uri(MATIC_PROVIDER, eventId);
	console.log(`Metadata URI: ${metadataUri}`);
	const result = await axios(metadataUri);
	console.log(`Result: ${result}`);
	return result.data;
}

export const fetchPOIPMetadata = async (eventId) => {
	try 
	{
		const metadata = await fetchPOIPMetadataCentralized(eventId);
		if(Object.keys(metadata).length != 0)
		{	
			return processPOIPMetadata(metadata);
		}
	}
	catch(error)
	{
		console.log(`Pulling cached metadata fails: ${eventId}`)
	}

	try
	{
		const metadata = await fetchPOIPMetadataBlockchain(eventId);
		if(Object.keys(metadata).length != 0)
		{
			return processPOIPMetadata(metadata);
		}
	}
	catch(error)
	{
		console.log(`Pulling blockchain metadata fails: ${eventId}`)
	}

	throw `Metadata not found for eventId: ${eventId}`
}

export const processPOIPMetadata = (metadata) => {
  if(!metadata) return null;
	
	console.log(`Processing metadata: ${JSON.stringify(metadata)}`);

	let image = metadata.image;
	if(isIPFS(image))
	{
		image = {
			type: "image",
			src: metadata.image
		};
	}

	let animation_url = metadata.animation_url;
	if(isIPFS(animation_url))
	{
		animation_url = {
			type: "video",
			src: metadata.animation_url
		};
	}

	let ret = {
		image,
		animation_url,
		title: metadata.name,
		creator: metadata.creator,
    description: metadata.description,
		eventId: metadata.tokenId
	};

	console.log(`Returning: ${JSON.stringify(ret)}`);
	return ret;
}