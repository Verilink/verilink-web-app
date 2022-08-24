import React from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Skeleton, Grid } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { useMetadata } from '../helpers/nftMetadata';
import useWindowDimensions from '../helpers/windowDimensions';
import { MAX_VIEWPORT_WIDTH } from '../config/settings';
import FlipCard from '../components/nft/flipCard';
import { useParams } from 'react-router-dom';
import nftStore from '../stores/nftStore';
import { useStatusSnackbar, StatusSnackbar } from "../components/modals/statusSnackbar";
import VerifyCreator from '../components/event/VerifyCreator';
import logo from "../logo.png";
import ShareButton from '../components/buttons/shareButton';
import PolygonScanButton from '../components/buttons/polygonScanButton';
import OpenseaButton from '../components/buttons/openseaButton';
import ClipboardCopy from '../components/buttons/clipboardCopy';

const centerFlex = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const safeIndexing = (array, index) => {
  if(!array) return null;
  return array[index];
}

const TagNFTPage = (props) => {

  var { isLoading, error, metadata } = nftStore((s) => ({ isLoading: s.isLoading, error: s.error, metadata: s.metadata }));

  const { contractAddress, tokenId } = useParams();

  metadata = metadata || {};
  const title = metadata.title || "none";
  const creator = metadata.creator || "none";
  const description = metadata.description || "none";

  console.log("isLoading")

  const windowDimensions = useWindowDimensions();
  const mediaSize = Math.min(windowDimensions.width - 20, MAX_VIEWPORT_WIDTH - 40);

  const {
    status: errorStatus,
    setMessage: setError
  } = useStatusSnackbar("error");

  const {
    status: successStatus,
    setMessage: setSuccess
  } = useStatusSnackbar("success");

  const waiting = () => {
    return (isLoading || (Object.keys(metadata).length == 0));
  }

  React.useEffect(() => {
    (async () => {
      const { init, loadNFT } = nftStore.getState();
      init(contractAddress, tokenId);

      try 
      {
        await loadNFT();
        setSuccess("NFT found!");
      }
      catch(error)
      {
        console.log(`Error loading NFT: ${error}`);
        setError("Failed to load the NFT!");
      }
    })();
  }, [contractAddress, tokenId]); 


  return (
    <Box sx={{ 
      marginTop: 0, 
      marginBottom: 2,
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
        {

        !isLoading ?
        (<FlipCard 
          front={ safeIndexing(metadata.digitalMedia, 0) } 
          back={ safeIndexing(metadata.physicalMedia, 0) }
          width={mediaSize}
          height={mediaSize}
        />) :
        (<Skeleton variant={"rectangular"} width={mediaSize} height={mediaSize}/>)
        }
      </div>
      <Container sx={{ marginTop: 2, }}>
        {
          !waiting() ? (<>
          <Typography align="center" variant="h5">{title}</Typography>
          <Typography 
            align="center" variant="h6" 
            style={{ fontStyle: "italic", }}>by {creator}</Typography>
          <Box sx={{
            display: "flex",
            justifyContent: "center"
          }}>
            <ShareButton
              name={title}
              creator={creator}
            />
          </Box>
          </>) : (<Skeleton variant={"text"}/>)
        }

        <Box>
        {
          !waiting() ? (
          <Typography paragraph component="div">
              <ReactMarkdown children={description} className="line-break" />
          </Typography>) : <Skeleton variant="text"/>
        }
        </Box>

        <Box sx={{ marginTop: 3, }}>
          <Box sx={{ ...centerFlex, marginTop: 2}}>
            <PolygonScanButton contractAddress={contractAddress} tokenId={tokenId}/>
          </Box>
          <Box sx={{ ...centerFlex, marginTop: 2 }}>
            <OpenseaButton contractAddress={contractAddress} tokenId={tokenId}/>
          </Box>
        </Box>

        <Box
          sx={{ marginTop: 3, }}
        />
        <Typography style={{ fontWeight: 750 }} gutterBottom>
          Event Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box sx={{ display: "flex", alignItems: "center"}}>
              <Typography align="center">
                Contract Address
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Box sx={{ display: "flex", justifyContent: "left" }}>
              <Typography align="center" style={{  marginRight: 5, }}>
                    {contractAddress.slice(0, 10) + "..." + contractAddress.slice(-10)}
              </Typography>
              <ClipboardCopy text={contractAddress}/>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{ display: "flex", justifyContent: "left" }}
            >
              <Typography align="center">Token Id</Typography>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Box
              sx={{ display: "flex", justifyContent: "left"}}
            >
              <Typography align="center">{tokenId}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <StatusSnackbar {...errorStatus}/>
      <StatusSnackbar {...successStatus}/>
    </Box>
  );
}

export default TagNFTPage;