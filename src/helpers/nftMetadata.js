import React from 'react';
import { getMetadataURI } from "../config/endpoints";
import { supportIpfsUrl } from "./ipfs";
import axios from 'axios';

/* Change to GRAPHQL later on */
export const useMetadata = (contractAddress, tokenId) => {
	/* 
		To be deprecated in favor of graphql API 
		And caching metadata details in the backend
	*/
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState({isSet: false, message: ""});
	const [metadata, setMetadata] = React.useState(null);

	const internalFetchUrl = getMetadataURI(contractAddress, tokenId);

	React.useEffect(() => {

    const inner = async () =>
    {

      setIsLoading(true);
      setError({isSet: false, message: ""});
      setMetadata(null);

      try
      {
        const result = await axios(internalFetchUrl);
        const data = result.data;
        if(data.metadata)
        { /* IPFS */
          var ipfs_result = await axios(supportIpfsUrl(data.metadata));
          setMetadata({...data, ...ipfs_result.data});
        }
        else
        { /* Legacy */
          setMetadata(data);
        }
      }
      catch(error)
      {
        setIsLoading(false);
        setError({ 
          isSet: true,
          message: `We couldn't load the NFT with contract address: ${contractAddress}, tokenID: ${tokenId}`
        });
      }

      
      setIsLoading(false);
    }

    inner();
	}, [contractAddress, tokenId]);

	return { isLoading, error, metadata: processMetadata(metadata) }
}


export const processMetadata = (metadata, low_res=true) => {
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