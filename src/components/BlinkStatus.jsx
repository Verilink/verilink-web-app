/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import Box from "@mui/material/Box";

const BlinkStatus = (props) => 
{
  const color = props.color || "green";
  const width = props.width || 14;
  const height = props.height || 14;
  const blink = props.stop ? "none" : "blink 1s infinite";

  return (
    <Box css={css`
      background-color: ${color};
      width: ${width}px;
      height: ${height}px;
      display: inline-block;
      animation: ${blink};
      border-radius: 50%;
      @keyframes blink {
        0% {
          transform: scale(1);
          opacity: 1;
        }

        50% {
          transform: scale(1);
          opacity: 1;
        }

        100% {
          transform: scale(1);
          opacity: .25;
        }
      }
      `
    } style={props.style}/>
  )
}

export default BlinkStatus;