import { Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import ShopProduct from 'app/components/ShopProduct';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSlice } from '../../slice';
import { Products } from './data';
import { selectProduct } from '../../slice/selectors';

export default function BestSale() {
  const { data } = useSelector(selectProduct) || [];

  const { actions } = useSlice();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getData());
  }, []);

  return (
    <Container>
      <Box textAlign="center" component="h1" marginBottom="80px">
        BEST SELLERS
      </Box>
      <Grid container spacing={5} width="md" sx={{ marginBottom: '200px' }}>
        {data.length > 0 &&
          data.map(x => (
            <ShopProduct
              link={x.image}
              cost={x.price}
              title={x.name}
              sizeGrid={3}
              id={x.id}
            />
          ))}
      </Grid>
    </Container>
  );
}
