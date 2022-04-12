import { Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import ShopProduct from 'app/components/ShopProduct';
import React from 'react';
import { Products } from './data';

export default function BestSale() {
  return (
    <Container>
      <Box textAlign="center" component="h1" marginBottom="80px">
        BEST SELLERS
      </Box>
      <Grid container spacing={5} width="md" sx={{ marginBottom: '200px' }}>
        {Products.map(x => (
          <ShopProduct
            link={x.link}
            cost={x.cost}
            title={x.title}
            sizeGrid={3}
          />
        ))}
      </Grid>
    </Container>
  );
}
