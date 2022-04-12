import { Button, Grid } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ShopField } from 'app/components/ShopField';
import { Label } from './styled';
import ShopButton from 'app/components/ShopButton';

export default function GetInTouch() {
  const handleChangeName = () => {};

  const handleUpdateEvent = () => {};

  const schema = yup.object({
    firstName: yup
      .string()
      .required('This field is required')
      .max(50, 'Maximum length allowed is 50 characters'),
    lastName: yup
      .string()
      .required('This field is required')
      .max(50, 'Maximum length allowed is 50 characters'),
    email: yup
      .string()
      .required('This field is required')
      .email('this is not an email')
      .max(50, 'Maximum length allowed is 50 characters'),
    subject: yup
      .string()
      .required('This field is required')
      .max(50, 'Maximum length allowed is 50 characters'),
    message: yup
      .string()
      .required('This field is required')
      .max(50, 'Maximum length allowed is 50 characters'),
  });

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
    mode: 'all',
  });
  return (
    <Grid item xs={6} sx={{ marginTop: '50px' }}>
      <Box bgcolor="whitesmoke" sx={{ padding: '20px' }}>
        <form onSubmit={form.handleSubmit(handleUpdateEvent)}>
          <Box sx={{ marginBottom: '20px' }}>
            <Label>First Name</Label>
            <ShopField
              form={form}
              name="firstName"
              errorText={true}
              onGetText={handleChangeName}
              placeholder="Your first Name"
            />
          </Box>
          <Box sx={{ marginBottom: '20px' }}>
            <Label>Last Name</Label>
            <ShopField
              form={form}
              name="lastName"
              errorText={true}
              onGetText={handleChangeName}
              placeholder="Your last Name"
            />
          </Box>
          <Box sx={{ marginBottom: '20px' }}>
            <Label>Email</Label>
            <ShopField
              form={form}
              name="email"
              errorText={true}
              onGetText={handleChangeName}
              placeholder="Your email address"
            />
          </Box>
          <Box sx={{ marginBottom: '20px' }}>
            <Label>Subject</Label>
            <ShopField
              form={form}
              name="subject"
              errorText={true}
              onGetText={handleChangeName}
              placeholder="Your subject of this message"
            />
          </Box>
          <Box sx={{ marginBottom: '20px' }}>
            <Label>Message</Label>
            <ShopField
              form={form}
              name="message"
              errorText={true}
              onGetText={handleChangeName}
              placeholder="Say something about us"
            />
          </Box>
          {/* <ShopButton text="Send Message"/> */}
          <Button
            type="submit"
            sx={{
              borderRadius: '20px',
              padding: '10px 30px',
              fontFamily: 'cursive',
            }}
            variant="contained"
            color="secondary"
          >
            Send Message
          </Button>
        </form>
      </Box>
    </Grid>
  );
}
