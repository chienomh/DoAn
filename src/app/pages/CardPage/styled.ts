import { Box, styled } from '@mui/system';
import { relative } from 'path';

export const Wrapper = styled(Box)(() => ({
  minHeight: '200px',
  padding: '20px',
  position: 'relative',
}));

export const Title = styled(Box)(() => ({
  fontWeight: 600,
  fontSize: '26px',
}));

export const Label = styled(Box)(() => ({
  fontSize: '16px',
}));
