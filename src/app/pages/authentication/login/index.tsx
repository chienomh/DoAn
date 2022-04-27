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

export default function LoginForm() {
  const schema = yup.object({
    name: yup.string().required('this field is is required'),
  });

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
    mode: 'all',
  });

  const handleLogin = () => {};
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
              <ShopField form={form} name="name" />
            </Box>
            <Box sx={{ marginBottom: '20px' }}>
              <Label>Password</Label>
              <ShopField form={form} name="name" type="password" />
            </Box>
            <ShopButton text="Login" sx={{ width: '100%' }} type="submit" />
          </Box>
        </form>
      </Container>
    </LayoutShop>
  );
}
