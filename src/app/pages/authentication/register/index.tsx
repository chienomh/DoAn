import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Container } from '@mui/material';
import AlertShop from 'app/components/alert';
import ShopButton from 'app/components/ShopButton';
import LayoutShop from 'app/components/ShopLayout';
import { Label } from 'app/pages/ContactPage/components/GetInTouch/styled';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { registerAPI } from 'server/register';
import * as yup from 'yup';
import { ShopField } from '../../../components/ShopField';
import { ActionsAuthent, useSlice } from '../slice';
import { selectAuthent } from '../slice/selectors';

export default function RegisterForm() {
  const schema = yup.object({
    name: yup.string().required('This field is is required'),
    age: yup
      .number()
      .required('This field is is required')
      .typeError('This field must be number'),
    username: yup.string().required('This field is is required'),
    email: yup
      .string()
      .email('This is email')
      .required('This field is is required'),
    password: yup.string().required('This field is is required'),
    phone: yup.string().required('This field is is required'),
    address: yup.string().required('This field is is required'),
  });

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      age: '',
      username: '',
      password: '',
      phone: '',
      address: '',
      email: '',
    },
    mode: 'all',
  });

  const { getValues, setValue } = form;

  const dispatch = useDispatch();

  const { actions } = useSlice();

  const { loading, openMessage } = useSelector(selectAuthent);

  const history = useHistory();

  const handleRegister = async () => {
    const params = {
      name: getValues('name'),
      age: 18,
      username: getValues('username'),
      password: getValues('password'),
      address: getValues('address'),
      gender: 'Nam',
      phone: getValues('phone'),
      email: getValues('email'),
    };
    dispatch(actions.register(params));
  };
  return (
    <LayoutShop>
      <AlertShop
        isOpen={openMessage}
        textAlert="Register successfully!"
        type="success"
        onClose={() => dispatch(actions.closeMessagae())}
        handle={() => history.push('/login')}
      />
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <form onSubmit={form.handleSubmit(handleRegister)}>
          <Box
            sx={{
              width: '500px',
              padding: '30px',
              marginTop: '50px',
            }}
          >
            <Box sx={{ marginBottom: '20px', display: 'flex', gap: '20px' }}>
              <Box width="70%">
                <Label>Name</Label>
                <ShopField form={form} name="name" errorText={true} />
              </Box>
              <Box>
                <Label>Age</Label>
                <ShopField
                  form={form}
                  name="age"
                  errorText={true}
                  type="number"
                />
              </Box>
            </Box>
            <Box sx={{ marginBottom: '20px' }}>
              <Label>Email</Label>
              <ShopField form={form} name="email" errorText={true} />
            </Box>
            <Box sx={{ marginBottom: '20px' }}>
              <Label>User Name</Label>
              <ShopField form={form} name="username" errorText={true} />
            </Box>
            <Box sx={{ marginBottom: '20px' }}>
              <Label>Password</Label>
              <ShopField
                form={form}
                name="password"
                type="password"
                errorText={true}
              />
            </Box>
            <Box sx={{ marginBottom: '20px' }}>
              <Label>Phone</Label>
              <ShopField
                form={form}
                name="phone"
                type="text"
                errorText={true}
              />
            </Box>
            <Box sx={{ marginBottom: '20px' }}>
              <Label>Address</Label>
              <ShopField
                form={form}
                name="address"
                type="text"
                errorText={true}
              />
            </Box>
            {loading ? (
              <ShopButton
                text="Register"
                sx={{ width: '100%' }}
                isLoading={loading}
              />
            ) : (
              <ShopButton text="Register" sx={{ width: '100%' }} />
            )}
          </Box>
        </form>
      </Container>
    </LayoutShop>
  );
}
