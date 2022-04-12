import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Content, Title } from './styled';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import SendIcon from '@mui/icons-material/Send';
import LanguageIcon from '@mui/icons-material/Language';

export default function HeaderContact() {
  return (
    <Box>
      <Title>Contact Information</Title>
      <Grid container sx={{ paddingTop: '20px' }} spacing={5}>
        <Grid item xs={3} sx={{ display: 'flex', gap: '10px' }}>
          <AddLocationAltIcon />
          <Content>số 9, ngo 4, Duy Tan, Cau Giay, Ha Noi</Content>
        </Grid>
        <Grid item xs={3} sx={{ display: 'flex', gap: '10px' }}>
          <LocalPhoneIcon />
          <Content>+1234567890</Content>
        </Grid>
        <Grid item xs={3} sx={{ display: 'flex', gap: '10px' }}>
          <SendIcon />
          <Content>shoes@gmail.com</Content>
        </Grid>
        <Grid item xs={3} sx={{ display: 'flex', gap: '10px' }}>
          <LanguageIcon />
          <Content>myshoes.com</Content>
        </Grid>
      </Grid>
    </Box>
  );
}
