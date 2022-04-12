import React from 'react';
import Box from '@mui/material/Box';
import logo from './assets/logoShop.png';
import { Button, Tab, Tabs, TextField } from '@mui/material';
import ShopButton from '../ShopButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import styled, { keyframes } from 'styled-components';
import { useHistory } from 'react-router-dom';
import TabPanel from '@mui/lab/TabPanel';

export default function HeaderShop() {
  const history = useHistory();
  console.log(history.location.pathname);

  let path = history.location.pathname;

  let valueParam;

  switch (path) {
    case '/': {
      valueParam = '1';
      break;
    }
    case '/men': {
      valueParam = '2';
      break;
    }
    case '/women': {
      valueParam = '3';
      break;
    }
    case '/about': {
      valueParam = '4';
      break;
    }
    case '/contact': {
      valueParam = '5';
      break;
    }
  }

  const [value, setValue] = React.useState(valueParam);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    switch (newValue) {
      case '1': {
        history.push('/');
        break;
      }
      case '2': {
        history.push('/men');
        break;
      }
      case '3': {
        history.push('/women');
        break;
      }
      case '4': {
        history.push('/about');
        break;
      }
      case '5': {
        history.push('/contact');
        break;
      }
    }
  };
  return (
    <Box>
      <Box
        padding="5px 100px"
        position="relative"
        display="flex"
        alignItems="center"
      >
        <img src={logo} alt="this is logo shop" width="150px" />
        <Box position="absolute" right="100px">
          <TextField
            placeholder="search"
            sx={{
              '>div': { borderRadius: '20px', padding: '0px', height: '47px' },
              width: '500px',
              margin: '0 20px 0 0px',
              '>input': { height: '20px' },
            }}
            color="secondary"
          />
          <ShopButton text="search" isLoading={false} isDisabled={false} />
        </Box>
      </Box>
      <Box
        sx={{
          width: '100%',
          paddingLeft: '100px',
          marginTop: '20px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="1" label="HOME" />
          <Tab value="2" label="MEN" />
          <Tab value="3" label="WOMEN" />
          <Tab value="4" label="ABOUT" />
          <Tab value="5" label="CONTACT" />
        </Tabs>
        <Box position="absolute" right="100px" sx={{ cursor: 'pointer' }}>
          <ShoppingCartIcon /> CART [0]
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        textTransform="uppercase"
        height="80px"
        bgcolor="#96D6FF"
        fontSize="28px"
        color="#fff"
        fontFamily="cursive"
        position="relative"
      >
        <TitleSale1>
          25% off (almost) everything! use code: summer sale
        </TitleSale1>
        <TitleSale2>our biggest sale yet 50% of all summer shoes</TitleSale2>
      </Box>
    </Box>
  );
}

const textSlide1 = keyframes`
0% {
  opacity: 0;
  fontSize: 28px;
  transform: translateY(-10px);
}

10% {
  opacity: 1;
  fontSize: 28px;
  transform: translateY(0px);
}

45% {
  opacity: 1;
  transform: translateY(0px);
}

50% {
  display: none;
  opacity: 0;
  transform: translateY(10px);
}

100% {
  display: none;
  opacity: 0;
}
`;

const TitleSale1 = styled.div`
  animation-name: ${textSlide1};
  animation-duration: 10s;
  animation-iteration-count: infinite;
  position: absolute;
`;

const textSlide2 = keyframes`
0% {
  opacity: 0;
  fontSize: 28px;
  transform: translateY(-10px);
}

45% {
  opacity: 0;
  transform: translateY(-10px);
}

50% {
  opacity: 1;
  fontSize: 28px;
  transform: translateY(0px);
}

95% {
  opacity: 1;
  transform: translateY(0px);
}

100% {
  display: none;
  opacity: 0;
  transform: translateY(10px);
}
`;

const TitleSale2 = styled.div`
  animation-name: ${textSlide2};
  animation-duration: 10s;
  animation-iteration-count: infinite;
  position: absolute;
`;
