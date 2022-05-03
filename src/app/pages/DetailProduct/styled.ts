import { Button } from '@mui/material';
import { Box, styled } from '@mui/system';

export const Title = styled(Box)(() => ({
  letterSpacing: '0.5px',
  margin: '0px',
  fontSize: '26px',
  display: 'flex',
  alignItems: 'center',
}));

export const Price = styled(Box)(() => ({
  fontSize: '21px',
  color: 'red',
}));

export const StyleQuantity = styled(Button)(() => ({
  padding: '5px',
  border: '1px solid #ccc',
  width: '20px',
  height: '30px',
  display: 'flex',
  alignItems: 'center',
  margin: '10px 20px',
  cursor: 'pointer',
}));
