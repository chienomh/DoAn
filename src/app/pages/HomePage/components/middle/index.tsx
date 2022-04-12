import { Box, Grid } from '@mui/material';
import React from 'react';
import bg1 from './assets/bg1.jpg';
import bg2 from './assets/bg2.jpg';

export default function Middle() {
  return (
    <Box marginTop="300px">
      <Box display="flex" justifyContent="center">
        <Box textAlign="center" fontSize="45px" width="1200px">
          It started with a simple idea: Create quality, well-designed products
          that i wanted myself
        </Box>
      </Box>
      <Box>
        <Grid container spacing={5} padding="20px">
          <Grid item xs={6}>
            <img src={bg1} alt="this is image" width="100%" height="600px" />
            <Box textAlign="center" margin="20px" fontSize="30px">
              Shop Men's Collection
            </Box>
          </Grid>
          <Grid item xs={6}>
            <img
              src={bg2}
              alt="this is image"
              style={{ objectFit: 'cover', width: '100%', height: '600px' }}
            />
            <Box textAlign="center" margin="20px" fontSize="30px">
              Shop Women's Collection
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
