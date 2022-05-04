import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button, Menu, MenuItem, Tab, Tabs, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { useSlice } from 'app/pages/authentication/slice';
import { selectAuthent } from 'app/pages/authentication/slice/selectors';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getDetailUser } from 'server/register';
import styled, { keyframes } from 'styled-components';
import ShopButton from '../ShopButton';
import logo from './assets/logoShop.png';
import Avatart from './assets/avatar.jpg';
import LogoutIcon from '@mui/icons-material/Logout';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SettingsIcon from '@mui/icons-material/Settings';
import { selectDetailProduct } from 'app/pages/DetailProduct/slice/selectors';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';

export default function HeaderShop() {
  const history = useHistory();

  let path = history.location.pathname ? history.location.pathname : '';

  let valueParam;

  switch (path) {
    case '/': {
      valueParam = '1';
      break;
    }
    case '/products': {
      valueParam = '2';
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

  const [user, setUser] = React.useState<any>();

  const [totalCard, setTotalCard] = React.useState<number>(0);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [search, setSearch] = React.useState<string>('');

  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    switch (newValue) {
      case '1': {
        history.push('/');
        break;
      }
      case '2': {
        history.push('/products');
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

  const handleGoLogin = () => {
    history.push('/login');
  };

  const handleGoRegister = () => {
    history.push('/register');
  };

  const dispatch = useDispatch();
  const { actions } = useSlice();

  const userId = localStorage.getItem('userId');
  useEffect(() => {
    (async () => {
      const data = await getDetailUser(userId);
      dispatch(actions.setDataUser(data.data));
      setUser(data.data);
    })();
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.setItem('access_token', '');
    setUser('');
  };

  const total = useSelector(selectDetailProduct).card;

  useEffect(() => {
    const card = localStorage.getItem('card');
    if (card) {
      setTotalCard(
        JSON.parse(localStorage.getItem('card') || '').length || '0',
      );
    } else setTotalCard(0);
  }, [total]);

  const goCard = () => {
    history.push('/card');
  };

  const goChangePassword = () => {
    history.push('/change-password');
  };

  const goProfile = () => {
    history.push('/profile');
  };

  useEffect(() => {
    if (!localStorage.getItem('valueSearch')) {
      localStorage.setItem('valueSearch', JSON.stringify(''));
    } else {
      setSearch(JSON.parse(localStorage.getItem('valueSearch') || ''));
    }
  });

  const changeValueSearch = e => {
    setSearch(e.target.value);
    localStorage.setItem('valueSearch', JSON.stringify(e.target.value));
  };

  const handleSearch = () => {
    history.push('/products');
  };

  const goViewOders = () => {
    history.push('/view-oders');
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
            placeholder="Product's name"
            sx={{
              '>div': { borderRadius: '20px', padding: '0px', height: '47px' },
              width: '500px',
              margin: '0 20px 0 0px',
              '>input': { height: '20px' },
            }}
            color="secondary"
            onChange={changeValueSearch}
            value={search}
          />
          <ShopButton
            text="search"
            isLoading={false}
            isDisabled={false}
            handleClick={handleSearch}
          />
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
          <Tab value="2" label="PRODUCTS" />
          <Tab value="4" label="ABOUT" />
          <Tab value="5" label="CONTACT" />
        </Tabs>
        <Box
          position="absolute"
          right="100px"
          sx={{ cursor: 'pointer' }}
          display="flex"
          gap="50px"
          marginBottom="5px"
          alignItems="center"
        >
          {user && (
            <Box display="flex" alignItems="center" onClick={goCard}>
              <ShoppingCartIcon /> CART [{totalCard}]
            </Box>
          )}

          {!user && path !== '/login' && (
            <ShopButton text="Login" handleClick={handleGoLogin} />
          )}
          {!user && path !== '/register' && (
            <ShopButton text="Register" handleClick={handleGoRegister} />
          )}
          {user && (
            <div>
              <img
                src={Avatart}
                alt="hihih"
                onClick={handleClick}
                width="32px"
                style={{ borderRadius: '100%' }}
              />{' '}
              Hi, {user.name}
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={goViewOders}>
                  {' '}
                  <CalendarViewDayIcon sx={{ marginRight: '5px' }} />
                  View orders
                </MenuItem>
                <MenuItem onClick={goProfile}>
                  {' '}
                  <PermIdentityIcon sx={{ marginRight: '5px' }} />
                  Edit personal information
                </MenuItem>
                <MenuItem onClick={goChangePassword}>
                  {' '}
                  <SettingsIcon sx={{ marginRight: '5px' }} />
                  Change Password
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  {' '}
                  <LogoutIcon sx={{ marginRight: '5px' }} />
                  Logout
                </MenuItem>
              </Menu>
            </div>
          )}
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
