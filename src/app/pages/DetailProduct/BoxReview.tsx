import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ReactStars from 'react-rating-stars-component';

export interface Iprops {
  username: string;
  star: number;
  comment: string;
}

export default function BoxReview(props: Iprops) {
  return (
    <Box fontSize="16px" borderBottom="1px solid #ccc">
      <Grid container>
        <Grid item xs={1}>
          Name:{' '}
        </Grid>
        <Grid item xs={5}>
          {props.username}{' '}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={1}>
          Star:{' '}
        </Grid>
        <Grid item xs={5}>
          {console.log(props.star)}
          <ReactStars
            count={5}
            size={20}
            activeColor="#ffd700"
            value={props.star}
            edit={false}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={1}>
          Comment:{' '}
        </Grid>
        <Grid item xs={5}>
          {props.comment}{' '}
        </Grid>
      </Grid>
    </Box>
  );
}
