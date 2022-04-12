import { Box } from '@mui/system';
import React from 'react';
import {
  TitleFooter,
  ImgBrand,
  TitleChil,
  TextStyle,
  WrapText,
} from './styled';
import brand1 from './assets/brand-1.jpg';
import brand2 from './assets/brand-2.jpg';
import brand3 from './assets/brand-3.jpg';
import brand4 from './assets/brand-4.jpg';
import brand5 from './assets/brand-5.jpg';
import { Container } from '@mui/material';

const arrLogoBrand = [brand1, brand3, brand3, brand4, brand5];

export default function FooterShop() {
  return (
    <Container sx={{ paddingBottom: '100px' }}>
      <TitleFooter>trusted partners</TitleFooter>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap="50px"
        marginBottom="100px"
      >
        {arrLogoBrand.map(x => (
          <ImgBrand src={x} />
        ))}
      </Box>
      <Box display="flex" justifyContent="center" gap="100px">
        <WrapText>
          <TitleChil>About footwear</TitleChil>
          <TextStyle>Event the all-powerful</TextStyle>
          <TextStyle>
            Pointing has no control about the blind texts it is an almost
            unorthographic life
          </TextStyle>
        </WrapText>
        <WrapText>
          <TitleChil>customer care</TitleChil>
          <TextStyle>Contact</TextStyle>
          <TextStyle>Returns/Exchange</TextStyle>
          <TextStyle>Gift voucher</TextStyle>
          <TextStyle>Wishlist</TextStyle>
          <TextStyle>Special</TextStyle>
          <TextStyle>Customer services</TextStyle>
          <TextStyle>Site maps</TextStyle>
        </WrapText>
        <WrapText>
          <TitleChil>information</TitleChil>
          <TextStyle>Abount us</TextStyle>
          <TextStyle>Delivery information</TextStyle>
          <TextStyle>Privacy policy</TextStyle>
          <TextStyle>Support</TextStyle>
          <TextStyle>Order tracking</TextStyle>
        </WrapText>
        <WrapText>
          <TitleChil>news</TitleChil>
          <TextStyle>Blog</TextStyle>
          <TextStyle>Press</TextStyle>
          <TextStyle>Exhibitions</TextStyle>
        </WrapText>
        <WrapText>
          <TitleChil>contact information</TitleChil>
          <TextStyle>so 9, Duy Tan, Cau Giay, Ha Noi</TextStyle>
          <TextStyle>+ 123456789</TextStyle>
          <TextStyle>Infor@yoursite.com</TextStyle>
          <TextStyle>Yoursite.com</TextStyle>
        </WrapText>
      </Box>
    </Container>
  );
}
