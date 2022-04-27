import { Box, Container } from '@mui/material';
import LayoutShop from 'app/components/ShopLayout';
import React from 'react';
import * as yup from 'yup';
import { TitleForm } from './styled';
import { ShopField } from '../../../components/ShopField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Label } from 'app/pages/ContactPage/components/GetInTouch/styled';
import ShopButton from 'app/components/ShopButton';
import { loginAPI } from 'server/register';
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

  const { getValues, setValue } = form;

  const history = useHistory();

  const handleLogin = async () => {
    const params = {
      username: getValues('username'),
      password: getValues('password'),
    };

    const data = await loginAPI(params);
    history.push('/');
  };
  return (
    <LayoutShop>
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
