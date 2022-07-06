import React from 'react';
import ShareIcon from '@mui/icons-material/Share';
import IconButton from '@mui/material/IconButton';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon
} from "react-share";


const MenuSocial = ({ SocialButton, SocialButtonProps, SocialIcon, Text }) => 
{
  return (
    <Box sx={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center"
    }}>
      <SocialButton {...SocialButtonProps}>
        <Box sx={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center"
        }}>
          <SocialIcon style={{
            width: 24, height: 24,
            marginRight: 5,
          }}/>
          <Typography>
            {Text}
          </Typography>
        </Box>
      </SocialButton>
    </Box>
  )
}

const ShareButton = ({ name, creator }) => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return(
    <Box sx={{}}>
      <IconButton 
        aria-label="Share Button"
        onClick={handleClick}
      >
        <ShareIcon/>
      </IconButton>
      <FacebookShareButton/>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>
          <MenuSocial 
            SocialButton={FacebookShareButton}
            SocialIcon={FacebookIcon}
            Text={"Share on Facebook"}
            SocialButtonProps={{
              quote: `${name} by ${creator}, a POIP event!`,
              hashtag: "POIP",
              url: window.location.href,
              onShareWindowClose: handleClose
            }}
            />
        </MenuItem>
        <MenuItem>
          <MenuSocial
            SocialButton={TwitterShareButton}
            SocialIcon={TwitterIcon}
            Text={"Share on Twitter"}
            SocialButtonProps={{
              title: `${name} by ${creator}, a POIP event!`,
              hashtags: ["POIP"],
              related: ["VerilinkTeam"],
              url: window.location.href,
              onShareWindowClose: handleClose
            }}
          />
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default ShareButton;

/*
  <MenuItem onClick={handleClose}>
    <MenuSocial
      SocialButton={LinkedinShareButton}
      SocialIcon={LinkedinIcon}
      Text={"Share on LinkedIn"}
      SocialButtonProps={{
        title: "",
        summary: "",
        source: ""
      }}
    />
  </MenuItem>
*/