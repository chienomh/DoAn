import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Container, MenuItem, Stack, TextField } from '@mui/material';
import AlertShop from 'app/components/alert';
import ShopButton from 'app/components/ShopButton';
import LayoutShop from 'app/components/ShopLayout';
import { Label } from 'app/pages/ContactPage/components/GetInTouch/styled';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { ShopField } from '../../../components/ShopField';
import { useSlice } from '../slice';
import { selectAuthent } from '../slice/selectors';

export default function RegisterForm() {
  const schema = yup.object({
    name: yup.string().required('This field is is required'),
    age: yup
      .number()
      .required('This field is is required')
      .typeError('This field must be number'),
    username: yup.string().required('This field is is required'),
    password: yup.string().required('This field is is required'),
    phone: yup.string().required('This field is is required'),
    address: yup.string().required('This field is is required'),
    email: yup.string().required('This field is is required'),
  });

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      age: null,
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

  const { loading, openMessage, typeError } = useSelector(selectAuthent);

  const history = useHistory();

  const [gender, setGender] = useState<number>(0);

  const handleRegister = async () => {
    console.log('first');
    const params = {
      name: getValues('name'),
      age: getValues('age'),
      username: getValues('username'),
      password: getValues('password'),
      address: getValues('address'),
      gender: gender,
      phone: getValues('phone'),
      email: getValues('email'),
    };
    dispatch(actions.register(params));
  };

  const genders = [
    { value: 0, label: 'Men' },
    { value: 1, label: 'Women' },
  ];

  const handleChangeGenger = e => {
    setGender(e.target.value);
  };
  return (
    <LayoutShop>
      <AlertShop
        isOpen={openMessage}
        textAlert={
          typeError ? 'Register successfully!' : 'Ops! Something went wrong!'
        }
        type={typeError ? 'success' : 'error'}
        onClose={() => dispatch(actions.closeMessagae())}
        handle={() => (typeError ? history.push('/login') : '')}
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
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
              <Box sx={{ marginBottom: '20px', width: '100%' }}>
                <Label>Phone</Label>
                <ShopField
                  form={form}
                  name="phone"
                  type="text"
                  errorText={true}
                />
              </Box>
              <Box>
                <Label>Gender</Label>
                <TextField
                  select
                  value={gender}
                  sx={{
                    '.MuiSelect-select': { width: '120px' },
                    backgroundColor: 'white',
                  }}
                  onChange={handleChangeGenger}
                >
                  {genders.map(o => (
                    <MenuItem key={o.value} value={o.value}>
                      {o.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Stack>
            <Box sx={{ marginBottom: '20px', width: '100%' }}>
              <Label>Email</Label>
              <ShopField
                form={form}
                name="email"
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
