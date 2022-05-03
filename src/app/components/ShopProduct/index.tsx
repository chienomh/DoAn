import { Box, Button, Grid } from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useHistory } from 'react-router-dom';

interface Iprop {
  link: string;
  cost: number;
  title: string;
  sizeGrid: number;
  id: number;
}

export default function ShopProduct(props: Iprop) {
  const history = useHistory();
  return (
    <Grid item xs={props.sizeGrid}>
      <Box
        sx={{
          border: '1px solid #bbb',
          cursor: 'pointer',
          borderRadius: '3px',
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src={props.link}
          width="256px"
          height="256px"
          sx={{
            objectFit: 'cover',
            transition: 'transform .2s',
            ':hover': { transform: 'scale(1.1)' },
          }}
          onClick={() => history.push(`/detail-products/${props.id}`)}
        />
        <Box
          margin="20px 20px"
          fontSize="21px"
          textAlign="center"
          height="50px"
          onClick={() => history.push(`/detail-products/${props.id}`)}
        >
          {props.title}
        </Box>
        <Box textAlign="center" marginBottom="20px">
          $ {props.cost}
        </Box>
        {/* <Button
          fullWidth
          sx={{ marginTop: '10px' }}
          variant="contained"
          color="success"
        >
          <AddIcon /> Add to Card
        </Button> */}
      </Box>
    </Grid>
  );
}
