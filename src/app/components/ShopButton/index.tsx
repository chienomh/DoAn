import { Button } from '@mui/material';
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

interface IButton {
  text: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  type?: string;
}

export default function ShopButton(props: IButton) {
  return (
    <>
      <Button
        disabled={props.isDisabled}
        sx={{
          borderRadius: '20px',
          padding: '10px 30px',
          fontFamily: 'cursive',
        }}
        variant="contained"
        color="secondary"
      >
        {props.isLoading ? <CircularProgress size="20" /> : props.text}
      </Button>
    </>
  );
}
