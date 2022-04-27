import { Button } from '@mui/material';
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

interface IButton {
  text: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  type?: string;
  sx?: any;
  handleClick?: any;
}

export default function ShopButton(props: IButton) {
  return (
    <>
      <Button
        disabled={props.isDisabled}
        variant="contained"
        sx={{
          ...props.sx,
          borderRadius: '20px',
          padding: '10px 30px',
          fontFamily: 'cursive',
          bgcolor: 'lightblue',
        }}
        onClick={props.handleClick}
        type="submit"
      >
        {props.isLoading ? <CircularProgress size="20" /> : props.text}
      </Button>
    </>
  );
}
