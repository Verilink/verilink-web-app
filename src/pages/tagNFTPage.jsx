import React from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { useMetadata } from '../helpers/nftMetadata';
import FlipCard from '../components/nft/flipCard';

const contractAddress = "0x4524488c6ea3f8f41ed5bdd75b3a4b143f85eae9";
const tokenId = 4;

const TagNFTPage = (props) => {
  
  var { isLoading, error, metadata } = useMetadata(contractAddress, tokenId);
  metadata = metadata || {};
  const _contractAddress = metadata.contractAddress || "none";
  const _tokenId = metadata.tokenId || 0;
  const title = metadata.title || "none";
  const creator = metadata.creator || "none";
  const description = metadata.description || "none";

  return (
    <FlipCard/>
  );
}

export default TagNFTPage;

/*
<div>
    <p>ContractAddress: {_contractAddress}</p>
    <p>TokenId: {_tokenId}</p>
    <p>Title: {title}</p>
    <p>Creator: {creator}</p>
    <p>Description: {description}</p>
</div>
*/