import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Container, MenuItem, Stack, TextField } from '@mui/material';
import AlertShop from 'app/components/alert';
import ShopButton from 'app/components/ShopButton';
import { ShopField } from 'app/components/ShopField';
import LayoutShop from 'app/components/ShopLayout';
import { Label } from 'app/pages/ContactPage/components/GetInTouch/styled';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { changeProfile } from 'server/user';
import * as yup from 'yup';
import { useSlice } from '../authentication/slice';
import { selectAuthent } from '../authentication/slice/selectors';

export default function Profile() {
  const schema = yup.object({
    name: yup.string().required('This field is is required'),
    age: yup
      .number()
      .required('This field is is required')
      .typeError('This field must be number'),
    phone: yup.string().required('This field is is required'),
    address: yup.string().required('This field is is required'),
    email: yup.string().required('This field is is required'),
  });

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      age: null,
      phone: '',
      address: '',
      email: '',
    },
    mode: 'all',
  });

  const { getValues, setValue } = form;

  const dispatch = useDispatch();

  const { actions } = useSlice();

  const { loading, openMessage, typeError, data } = useSelector(selectAuthent);

  const history = useHistory();

  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<number>(0);
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [gender, setGender] = useState<number>(0);
  const [address, setAddress] = useState<string>('');
  const [openMess, setOpenMess] = useState<boolean>(false);
  const [type, setType] = useState<boolean>(false);

  const genders = [
    { value: 0, label: 'Men' },
    { value: 1, label: 'Women' },
  ];

  useEffect(() => {
    setName(data.name);
    setAge(data.age);
    setPhone(data.phone);
    setEmail(data.email);
    setAddress(data.address);
    setGender(
      genders.filter(x => x.label === data.gender).length > 0
        ? genders.filter(x => x.label === data.gender)[0].value
        : 0,
    );
    setValue('name', data.name);
    setValue('address', data.address);
    setValue('email', data.email);
    setValue('phone', data.phone);
    setValue('age', data.age);
  }, [data]);

  const handleChangeProfile = async () => {
    const params = {
      name,
      age,
      address,
      gender: genders.filter(x => x.value === gender)[0].label,
      phone,
      email,
      id: data.id,
    };
    try {
      await changeProfile(params);
      setOpenMess(true);
      setType(true);
    } catch (error) {
      setOpenMess(true);
      setType(false);
    }
  };

  const handleChangeGenger = e => {
    setGender(e.target.value);
  };

  const handleChangeName = e => {
    setName(e.target.value);
  };

  const handleChangeAge = e => {
    setAge(e.target.value);
  };

  const handleChangePhone = e => {
    setPhone(e.target.value);
  };

  const handleChangeEmail = e => {
    setEmail(e.target.value);
  };

  const handleChangeAddress = e => {
    setAddress(e.target.value);
  };
  return (
    <LayoutShop>
      <AlertShop
        isOpen={openMess}
        textAlert={
          type ? 'Change profile successfully!' : 'Ops! Something went wrong!'
        }
        type={type ? 'success' : 'error'}
        onClose={() => {
          setOpenMess(false);
        }}
        handle={() => (type ? history.push('/') : '')}
      />
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <form onSubmit={form.handleSubmit(handleChangeProfile)}>
          <Box
            sx={{
              width: '600px',
              padding: '30px',
              marginTop: '50px',
              bgcolor: '#fff',
              borderRadius: '20px',
            }}
          >
            <Box sx={{ marginBottom: '20px', display: 'flex', gap: '20px' }}>
              <Box width="70%">
                <Label>Name</Label>
                <ShopField
                  form={form}
                  name="name"
                  errorText={true}
                  value={name}
                  onGetText={handleChangeName}
                />
              </Box>
              <Box>
                <Label>Age</Label>
                <ShopField
                  form={form}
                  name="age"
                  errorText={true}
                  type="number"
                  value={age}
                  onGetText={handleChangeAge}
                />
              </Box>
            </Box>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
              <Box sx={{ marginBottom: '20px', width: '100%' }}>
                <Label>Phone</Label>
                <ShopField
                  form={form}
                  name="phone"
                  type="text"
                  errorText={true}
                  onGetText={handleChangePhone}
                  value={phone}
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
                onGetText={handleChangeEmail}
                value={email}
              />
            </Box>
            <Box sx={{ marginBottom: '20px' }}>
              <Label>Address</Label>
              <ShopField
                form={form}
                name="address"
                type="text"
                errorText={true}
                onGetText={handleChangeAddress}
                value={address}
              />
            </Box>
            {loading ? (
              <ShopButton
                text="Update"
                sx={{ width: '100%' }}
                isLoading={loading}
              />
            ) : (
              <ShopButton text="Update" sx={{ width: '100%' }} />
            )}
          </Box>
        </form>
      </Container>
    </LayoutShop>
  );
}
