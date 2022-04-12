import { Box, Container, Grid } from '@mui/material';
import LayoutShop from 'app/components/ShopLayout';
import React from 'react';
import videoAbout from '../../assests/giay.mp4';

export default function AboutShop() {
  return (
    <LayoutShop>
      <Container sx={{ marginTop: '100px' }}>
        <Grid container spacing={5}>
          <Grid item xs={6}>
            <video controls autoPlay src={videoAbout} width="100%" />
          </Grid>
          <Grid item xs={6}>
            <Box fontSize="36px" marginBottom="20px">
              Footwear the leading eCommerce Store around the Globe
            </Box>
            <Box color="#767171" marginBottom="20px">
              The Big Oxmox advised her not to do so, because there were
              thousands of bad Commas, wild Question Marks and devious Semikoli,
              but the Little Blind Text didn’t listen. She packed her seven
              versalia, put her initial into the belt and made herself on the
              way.
            </Box>
            <Box color="#767171">
              When she reached the first hills of the Italic Mountains, she had
              a last view back on the skyline of her hometown Bookmarksgrove,
              the headline of Alphabet Village and the subline of her own road,
              the Line Lane. Pityful a rethoric question ran over her cheek,
              then she continued her way.
            </Box>
          </Grid>
        </Grid>
      </Container>
    </LayoutShop>
  );
}
