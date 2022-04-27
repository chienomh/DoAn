import { Box } from '@mui/material';
import React from 'react';
import FooterShop from '../ShopFooter';
import HeaderShop from '../ShopHeader';

export default function LayoutShop({ children }) {
  return (
    <Box
      position="relative"
      fontFamily="cursive"
      sx={{
        backgroundImage:
          'linear-gradient(89.9deg, rgba(178, 253, 238, 0.96) -8.1%, rgba(207, 244, 254, 1) 26.3%, rgba(207, 244, 254, 0.48) 47.5%, rgba(254, 219, 243, 0.63) 61.5%, rgba(254, 219, 243, 1) 78.7%, rgba(254, 207, 210, 1) 109.2%)',
      }}
    >
      <Box>
        <HeaderShop />
      </Box>
      <Box minHeight="100vh">{children}</Box>
      <Box>
        <FooterShop />
      </Box>
    </Box>
  );
}
