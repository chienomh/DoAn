import { Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import LayoutShop from 'app/components/ShopLayout';
import ShopProduct from 'app/components/ShopProduct';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Products } from './data';

export default function WomentPage() {
  return (
    <>
      <Helmet>
        <title>Men</title>
      </Helmet>
      <LayoutShop>
        <Box
          textAlign="center"
          fontSize="28px"
          color="#595959"
          margin="50px 50px"
          textTransform="uppercase"
        >
          All products for women
        </Box>
        <Container sx={{ marginBottom: '100px' }}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              đây là filter
            </Grid>
            <Grid container item xs={9} spacing={3}>
              {Products.map(x => (
                <ShopProduct
                  link={x.link}
                  cost={x.cost}
                  title={x.title}
                  sizeGrid={4}
                />
              ))}
            </Grid>
          </Grid>
        </Container>
      </LayoutShop>
    </>
  );
}
