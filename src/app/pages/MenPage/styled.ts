import { Box, Button } from '@mui/material';
import { styled } from '@mui/system';

export const WrapperFilter = styled(Box)(() => ({
  border: '1px solid #ccc',
  padding: '5px',
  marginBottom: '10px',
}));

export const TitleFilter = styled(Box)(() => ({
  fontSize: '18px',
  color: 'GrayText',
  fontWeight: 500,
}));

export const ButtonFilter = styled(Button)(() => ({
  fontSize: '13px',
  margin: '5px',
}));
