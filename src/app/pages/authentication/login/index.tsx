import { Box, Container, getNativeSelectUtilityClasses } from '@mui/material';
import LayoutShop from 'app/components/ShopLayout';
import React from 'react';
import * as yup from 'yup';
import { TitleForm } from './styled';
import { ShopField } from '../../../components/ShopField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Label } from 'app/pages/ContactPage/components/GetInTouch/styled';
import ShopButton from 'app/components/ShopButton';
import { useDispatch, useSelector } from 'react-redux';
import { useSlice } from '../slice';
import { selectAuthent } from '../slice/selectors';
import AlertShop from 'app/components/alert';
import { useHistory } from 'react-router-dom';

export default function LoginForm() {
  const schema = yup.object({
    username: yup.string().required('this field is is required'),
    password: yup.string().required('this field is is required'),
  });

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'all',
  });

  const { getValues } = form;

  const dispatch = useDispatch();

  const { actions } = useSlice();

  const { loading, openMessage, typeError } = useSelector(selectAuthent);

  const history = useHistory();

  const handleLogin = () => {
    const params = {
      username: getValues('username'),
      password: getValues('password'),
    };

    dispatch(actions.login(params));
  };
  return (
    <LayoutShop>
      <AlertShop
        isOpen={openMessage}
        textAlert={
          typeError ? 'Login successfully!' : 'Ops! Something went wrong!'
        }
        type={typeError ? 'success' : 'error'}
        onClose={() => dispatch(actions.closeMessagae())}
        handle={() =>
          typeError
            ? (dispatch(actions.closeMessagae()), history.push('/'))
            : ''
        }
      />
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <form onSubmit={form.handleSubmit(handleLogin)}>
          <Box
            sx={{
              width: '500px',
              padding: '30px',
              marginTop: '50px',
            }}
          >
            <Box sx={{ marginBottom: '20px' }}>
              <Label>User Name</Label>
              <ShopField form={form} name="username" />
            </Box>
            <Box sx={{ marginBottom: '20px' }}>
              <Label>Password</Label>
              <ShopField form={form} name="password" type="password" />
            </Box>
            <ShopButton text="Login" sx={{ width: '100%' }} type="submit" />
          </Box>
        </form>
      </Container>
    </LayoutShop>
  );
}
