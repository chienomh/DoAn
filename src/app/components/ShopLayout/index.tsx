import { Box } from '@mui/material';
import React from 'react';
import FooterShop from '../ShopFooter';
import HeaderShop from '../ShopHeader';

export default function LayoutShop({ children }) {
  return (
    <Box position="relative" fontFamily="cursive">
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
