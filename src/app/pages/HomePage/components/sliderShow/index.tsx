import { Box } from '@mui/material';
import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import bg1 from './assets/img_bg_1.jpg';
import bg2 from './assets/img_bg_2.jpg';
import bg3 from './assets/img_bg_3.jpg';
import ShopButton from 'app/components/ShopButton';
import styled, { keyframes } from 'styled-components';
import { useHistory } from 'react-router-dom';

const arrBg = [bg1, bg2, bg3];

export default function SlideShow() {
  const history = useHistory();

  const goProducts = () => {
    history.push('/products');
  };
  return (
    <Box height="500px">
      <Splide
        options={{
          rewind: true,
          gap: '1rem',
          arrows: false,
          interval: 6000,
          autoplay: true,
        }}
      >
        {arrBg.map(x => (
          <SplideSlide>
            <Box position="relative">
              <Box
                position="absolute"
                width="100%"
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <TextBg>
                  <Box
                    component="h2"
                    fontSize="70px"
                    marginTop="0px"
                    marginBottom="20px"
                    letterSpacing="2px"
                  >
                    NEW
                  </Box>
                  <Box fontSize="30px" letterSpacing="5px">
                    ARRIVAL
                  </Box>
                  <Box fontWeight="200" fontSize="40px">
                    UP TO <span style={{ fontWeight: '700' }}>30%</span> OFF
                  </Box>
                  <Box marginBottom="20px">New Stylish shoes for men</Box>
                  <ShopButton
                    text="SHOP COLLECTION"
                    handleClick={goProducts}
                  ></ShopButton>
                </TextBg>
              </Box>
              <img
                src={x}
                width="100%"
                height="650px"
                style={{ objectFit: 'cover' }}
              />
            </Box>
          </SplideSlide>
        ))}
      </Splide>
    </Box>
  );
}

const animationTilte = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }

  30% {
    opacity: 1;
    transform: translateY(0px);
  }

  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const TextBg = styled('div')`
  animation-name: ${animationTilte};
  animation-duration: 6s;
  font-family: 'initial';
  text-align: center;
  color: white;
`;
