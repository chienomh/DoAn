import { Box, styled } from '@mui/system';

export const TitleFooter = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '80px',
  textTransform: 'uppercase',
  fontSize: '28px',
  fontWeight: 'bold',
  marginBottom: '50px',
}));

export const ImgBrand = styled('img')(() => ({
  width: '200px',
}));

export const TitleChil = styled(Box)(() => ({
  fontSize: '16px',
  fontWeight: 'bold',
  marginBottom: '30px',
  textTransform: 'uppercase',
}));

export const TextStyle = styled(Box)(() => ({
  fontSize: '14px',
  color: '#212529',
  cursor: 'pointer',
  ':hover': {
    color: '#5bb5ef',
  },
}));

export const WrapText = styled(Box)(() => ({
  width: '200px',
}));
