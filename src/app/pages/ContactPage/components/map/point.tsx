import { Box, CardMedia, Typography } from '@mui/material';
import React from 'react';

import Card from './assets/Rectangle.png';
import { ReactComponent as Points } from './assets/point.svg';
import { ReactComponent as ChatBubbles } from './assets/chatBubbles.svg';
import { ReactComponent as Star } from './assets/Star.svg';
import { ReactComponent as MapMarker } from './assets/mapMarker.svg';

const MyMarker = (props: any) => {
  return (
    <Box position="absolute">
      <Points style={{ cursor: 'pointer' }} />
    </Box>
  );
};

export default MyMarker;
