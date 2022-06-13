import React from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { useMetadata } from '../helpers/nftMetadata';
import useWindowDimensions from '../helpers/windowDimensions';
import { MAX_VIEWPORT_WIDTH } from '../config/settings';

import FlipCard from '../components/nft/flipCard';

const contractAddress = "0x4524488c6ea3f8f41ed5bdd75b3a4b143f85eae9";
const tokenId = 4;

const safeIndexing = (array, index) => {
  if(!array) return null;
  return array[index];
}

const TagNFTPage = (props) => {
  
  var { isLoading, error, metadata } = useMetadata(contractAddress, tokenId);
  metadata = metadata || {};
  const _contractAddress = metadata.contractAddress || "none";
  const _tokenId = metadata.tokenId || 0;
  const title = metadata.title || "none";
  const creator = metadata.creator || "none";
  const description = metadata.description || "none";

  const windowDimensions = useWindowDimensions();
  const mediaSize = Math.min(windowDimensions.width - 20, MAX_VIEWPORT_WIDTH - 40);

  console.log(`MediaSize: ${mediaSize}`)
  return (
    <Box style={{ 
      marginTop: 20, 
      marginBottom: 20, 
      width: "100%",
    }}>
      <div style={{ 
          display: "flex", 
          justifyContent: "center",
          width: "100%",
      }}>
        <FlipCard 
          front={ safeIndexing(metadata.digitalMedia, 0) } 
          back={ safeIndexing(metadata.physicalMedia, 0) }
          width={mediaSize}
          height={mediaSize}
        />
      </div>
    </Box>
  );
}

export default TagNFTPage;