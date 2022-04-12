import { Container, Grid } from '@mui/material';
import LayoutShop from 'app/components/ShopLayout';
import React from 'react';
import HeaderContact from './components/header';
import GetInTouch from './components/GetInTouch';
import { MyMapComponent } from './components/map';

export default function ContactPage() {
  return (
    <LayoutShop>
      <Container sx={{ marginTop: '50px' }}>
        <HeaderContact />
        <Grid container spacing={5}>
          <GetInTouch />
          <Grid
            item
            xs={6}
            sx={{ marginTop: '50px', '>div': { height: '100%' } }}
            className="hihih"
          >
            <MyMapComponent />
          </Grid>
        </Grid>
      </Container>
    </LayoutShop>
  );
}
