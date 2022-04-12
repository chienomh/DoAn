import { Box, Grid } from '@mui/material';
import React from 'react';

interface Iprop {
  link: string;
  cost: number;
  title: string;
  sizeGrid: number;
}

export default function ShopProduct(props: Iprop) {
  return (
    <Grid item xs={props.sizeGrid}>
      <Box
        sx={{
          border: '1px solid #bbb',
          cursor: 'pointer',
          borderRadius: '3px',
          overflow: 'hidden',
        }}
        paddingBottom="20px"
      >
        <Box
          component="img"
          src={props.link}
          width="100%"
          sx={{
            objectFit: 'inherit',
            transition: 'transform .2s',
            ':hover': { transform: 'scale(1.1)' },
          }}
        />
        <Box margin="20px 20px" fontSize="21px" textAlign="center">
          {props.title}
        </Box>
        <Box textAlign="center">$ {props.cost}</Box>
      </Box>
    </Grid>
  );
}
