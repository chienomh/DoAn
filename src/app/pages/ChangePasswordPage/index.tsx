import React, { useState } from 'react';
import { Box, Button, Container } from '@mui/material';
import LayoutShop from 'app/components/ShopLayout';
import { Title } from './styled';
import { ShopField } from 'app/components/ShopField';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthent } from '../authentication/slice/selectors';
import { changePassword } from 'server/user';
import AlertShop from 'app/components/alert';
import { useHistory } from 'react-router-dom';

export default function ChangePassword() {
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [type, setType] = useState<boolean>(false);

  const { data } = useSelector(selectAuthent);

  const history = useHistory();

  const schema = yup.object({
    oldPassword: yup.string().required('This is required'),
    newPassword: yup.string().required('This is required'),
    confirmPassword: yup
      .string()
      .required('This is required')
      .test(
        'pass',
        'Invalid password',
        val => getValues('newPassword') === getValues('confirmPassword'),
      ),
  });

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'all',
  });

  const { getValues, setValue } = form;

  const handleChangePassword = async () => {
    const params = {
      newPassword: getValues('newPassword'),
      oldPassword: getValues('oldPassword'),
      username: data.user_name,
    };

    try {
      await changePassword(params);
      setOpenAlert(true);
      setType(true);
    } catch (error) {
      setOpenAlert(true);
      setType(false);
    }
  };
  return (
    <LayoutShop>
      <AlertShop
        isOpen={openAlert}
        type={type ? 'success' : 'error'}
        textAlert={
          type ? 'Change Password successfully!' : 'Change Password Faild!'
        }
        onClose={() => {
          setOpenAlert(false);
          history.push('/');
        }}
        handl={() => {
          setOpenAlert(false);
          history.push('/');
        }}
      />
      <Container>
        <Box display="flex" justifyContent="center" marginTop="100px">
          <Box
            border="1px solid #ccc"
            borderRadius="20px"
            minWidth="500px"
            bgcolor="#fff"
            padding="20px"
          >
            <form onSubmit={form.handleSubmit(handleChangePassword)}>
              <Box marginBottom="10px">
                <Title>Old Password</Title>
                <ShopField form={form} name="oldPassword" errorText={true} />
              </Box>
              <Box marginBottom="10px">
                <Title>New Password</Title>
                <ShopField form={form} name="newPassword" errorText={true} />
              </Box>
              <Box>
                <Title>Confirm Password</Title>
                <ShopField
                  form={form}
                  name="confirmPassword"
                  errorText={true}
                />
              </Box>
              <Box textAlign="center" marginTop="20px">
                <Button fullWidth variant="contained" type="submit">
                  Change Password
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Container>
    </LayoutShop>
  );
}
