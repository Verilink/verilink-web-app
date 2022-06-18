import React from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import ReactMarkdown from 'react-markdown';
import { useMetadata } from '../helpers/nftMetadata';
import useWindowDimensions from '../helpers/windowDimensions';
import { MAX_VIEWPORT_WIDTH } from '../config/settings';
import FlipCard from '../components/nft/flipCard';

import nftStore from '../stores/nftStore';

import logo from "../logo.png";

const safeIndexing = (array, index) => {
  if(!array) return null;
  return array[index];
}

const TagNFTPage = (props) => {
  
  var { isLoading, error, metadata } = nftStore((s) => ({ isLoading: s.isLoading, error: s.error, metadata: s.metadata }));

  metadata = metadata || {};
  const contractAddress = metadata.contractAddress || "none";
  const tokenId = metadata.tokenId || 0;
  const title = metadata.title || "none";
  const creator = metadata.creator || "none";
  const description = metadata.description || "none";

  const windowDimensions = useWindowDimensions();
  const mediaSize = Math.min(windowDimensions.width - 20, MAX_VIEWPORT_WIDTH - 40);

  console.log(`MediaSize: ${mediaSize}`)
  return (
    <Box sx={{ 
      marginTop: 0, 
      marginBottom: 20, 
      width: "100%",
    }}>
      <div style={{ 
          display: "flex", 
          justifyContent: "center",
          width: "100%",
          backgroundColor: "gray",
          backgroundImage: logo,
          marginBottom: 5,
      }}>
        <FlipCard 
          front={ safeIndexing(metadata.digitalMedia, 0) } 
          back={ safeIndexing(metadata.physicalMedia, 0) }
          width={mediaSize}
          height={mediaSize}
        />
      </div>
      <Container>
        <Typography align="center" variant="h5">{title}</Typography>
        <Typography gutterBottom align="center" variant="h6">
          <Box sx={{ fontStyle: 'italic', }}>{creator}</Box>
        </Typography>
        <Typography paragraph>
          <ReactMarkdown children={description} className="line-break" />
        </Typography>
        <Box
          sx={{
            width: "100%",
		        borderTop: `1px solid ${"gray"}`,
		        opacity: .5
          }}
        />
        <Typography gutterBottom variant="body1">
          Contract Address: {contractAddress}
        </Typography>
        <Typography gutterBottom variant="body1">
          Token Id: {tokenId}
        </Typography>
      </Container>
    </Box>
  );
}

export default TagNFTPage;