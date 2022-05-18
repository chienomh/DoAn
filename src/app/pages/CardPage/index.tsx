import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Container,
  Dialog,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import LayoutShop from '../../components/ShopLayout';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthent } from '../authentication/slice/selectors';
import { useSlice } from './slice';
import { selectBill } from './slice/selectors';
import AlertShop from 'app/components/alert';
import { useHistory } from 'react-router-dom';
import { getCoupon } from 'server/billService';
import { Label, Title, Wrapper } from './styled';
import { ShopField } from 'app/components/ShopField';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import ShopButton from 'app/components/ShopButton';

export default function CardPage() {
  const [dataCard, setDataCard] = useState<any>([]);
  const [coupon, setCoupon] = useState<string>('');
  const [percent, setPercent] = useState<any>();
  const [open, setOpen] = useState<boolean>(false);

  const dataUser = localStorage.getItem('dataUserMember')
    ? JSON.parse(localStorage.getItem('dataUserMember') || '')
    : { name: '', phone: '', email: '', address: '' };

  const [name, setName] = useState<string>(dataUser.name);
  const [phone, setPhone] = useState<string>(dataUser.phone);
  const [email, setEmail] = useState<string>(dataUser.email);
  const [address, setAddress] = useState<string>(dataUser.address);

  const dispatch = useDispatch();

  const { actions } = useSlice();

  const history = useHistory();

  const { isOpenAlert, type } = useSelector(selectBill);

  useEffect(() => {
    if (localStorage.getItem('card')) {
      const data = JSON.parse(localStorage.getItem('card') || '');
      setDataCard(data);
    }
  }, [isOpenAlert]);

  const handleSubQuantity = id => {
    const product = dataCard.filter(x => x.id === id)[0];

    if (product.quantity > 1) {
      const newCard = dataCard.map(x => {
        if (x.id === id) {
          return { ...x, quantity: x.quantity - 1 };
        } else return x;
      });
      localStorage.setItem('card', JSON.stringify(newCard));

      setDataCard(newCard);
    } else {
      handleRemoveProduct(id);
    }
  };

  const handleAddQuantity = id => {
    const newCard = dataCard.map(x => {
      if (x.id === id) {
        return { ...x, quantity: x.quantity + 1 };
      } else return x;
    });
    localStorage.setItem('card', JSON.stringify(newCard));

    setDataCard(newCard);
  };

  const handleRemoveProduct = id => {
    const newCard = dataCard.filter(x => x.id !== id);
    localStorage.setItem('card', JSON.stringify(newCard));
    setDataCard(newCard);
  };

  const handleBuy = () => {
    setOpen(true);
  };

  const handleConfirmInfor = () => {
    const userId = localStorage.getItem('userIdMember')
      ? JSON.parse(localStorage.getItem('userIdMember') || '')
      : '';

    let params;

    if (userId) {
      params = {
        couponName: percent ? percent.name : '',
        discountPersent: percent ? percent.percent : 0,
        listBillProducts: dataCard.map(x => ({
          productId: x.id,
          quantity: x.quantity,
          sizeId: x.sizeId,
        })),

        priceTotal: percent
          ? dataCard.reduce(
              (init, curr) => init + curr.quantity * curr.price,
              0,
            ) -
            dataCard.reduce(
              (init, curr) => init + curr.quantity * curr.price,
              0,
            ) *
              (percent.percent / 100)
          : dataCard.reduce(
              (init, curr) => init + curr.quantity * curr.price,
              0,
            ),
        userId: userId,
        name,
        phone,
        email,
        address,
      };
    } else {
      console.log('first');

      params = {
        couponName: percent ? percent.name : '',
        discountPersent: percent ? percent.percent : 0,
        listBillProducts: dataCard.map(x => ({
          productId: x.id,
          quantity: x.quantity,
          sizeId: x.sizeId,
        })),

        priceTotal: percent
          ? dataCard.reduce(
              (init, curr) => init + curr.quantity * curr.price,
              0,
            ) -
            dataCard.reduce(
              (init, curr) => init + curr.quantity * curr.price,
              0,
            ) *
              (percent.percent / 100)
          : dataCard.reduce(
              (init, curr) => init + curr.quantity * curr.price,
              0,
            ),
        name,
        phone,
        email,
        address,
      };
    }

    dispatch(actions.handleCreateBill(params));

    dispatch(actions.handleCreateBillSuccess());

    localStorage.setItem('card', '');

    setOpen(false);
  };

  const changeCoupon = async e => {
    setCoupon(e.target.value);
    const data = await getCoupon(e.target.value);
    console.log(data.data);
    setPercent(data.data);
  };

  const handleClosePopup = () => {
    setOpen(false);
  };

  const schema = yup.object({
    // name: yup.string().required('This field is is required'),
    // phone: yup.string().required('This field is is required'),
    // address: yup.string().required('This field is is required'),
    // email: yup.string().required('This field is is required'),
  });

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      email: '',
    },
    mode: 'all',
  });

  useEffect(() => {
    setValue('name', dataUser.name);
    setValue('phone', dataUser.phone);
    setValue('email', dataUser.email);
    setValue('address', dataUser.address);
  }, [dataUser]);

  const { getValues, setValue } = form;

  const handleChangeName = e => {
    setName(e.target.value);
    // setValue('name', e.target.value);
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
      <Container sx={{ paddingTop: '50px' }}>
        <AlertShop
          type={type ? 'success' : 'error'}
          textAlert={type ? 'Buy successfully!' : 'Ops! Somethins went wrong!'}
          isOpen={isOpenAlert}
          onClose={() => dispatch(actions.CloseAlert())}
          handle={() => history.push('/')}
        />

        <Dialog open={open} onClose={handleClosePopup} maxWidth="lg">
          <Wrapper>
            <Title>Confirm informationn</Title>
            <CloseIcon
              sx={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                cursor: 'pointer',
              }}
              onClick={handleClosePopup}
            />
            <form onSubmit={form.handleSubmit(() => {})}>
              <Box
                sx={{
                  width: '600px',
                  padding: '30px',
                  bgcolor: '#fff',
                  borderRadius: '20px',
                }}
              >
                <Box width="100%">
                  <Label>Name</Label>
                  <ShopField
                    form={form}
                    name="name"
                    errorText={true}
                    value={name}
                    onGetText={handleChangeName}
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
                      onGetText={handleChangePhone}
                      value={phone}
                    />
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

                <ShopButton
                  text="Confirm"
                  sx={{ width: '100%' }}
                  handleClick={handleConfirmInfor}
                />
              </Box>
            </form>
          </Wrapper>
        </Dialog>

        {dataCard.length > 0 ? (
          <TableContainer>
            <Table>
              <TableHead sx={{ textTransform: 'uppercase' }}>
                <TableCell align="center">Index</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Image</TableCell>
                <TableCell align="center">price of 1 product</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Total Price</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableHead>
              <TableBody>
                {dataCard.map((x, index) => (
                  <TableRow>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{x.name}</TableCell>
                    <TableCell align="center">
                      <img src={x.image} alt="This is image" width="100px" />
                    </TableCell>
                    <TableCell align="center">{x.price} $</TableCell>
                    <TableCell align="center">
                      <Box display="flex" justifyContent="center">
                        <Button onClick={() => handleSubQuantity(x.id)}>
                          <RemoveIcon />
                        </Button>
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          sx={{ width: '50px' }}
                        >
                          {x.quantity}
                        </Box>
                        <Button onClick={() => handleAddQuantity(x.id)}>
                          <AddIcon />
                        </Button>
                      </Box>
                    </TableCell>
                    <TableCell align="center">{x.quantity * x.price}</TableCell>
                    <TableCell align="center">
                      <DeleteIcon
                        sx={{ cursor: 'pointer' }}
                        onClick={() => handleRemoveProduct(x.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell
                    colSpan={5}
                    sx={{
                      textTransform: 'uppercase',
                      textAlign: 'center',
                      fontWeight: 600,
                      fontSize: '18px',
                    }}
                  >
                    Coupon
                  </TableCell>
                  <TableCell
                    sx={{
                      textTransform: 'uppercase',
                      textAlign: 'center',
                      fontWeight: 600,
                    }}
                  >
                    <TextField onChange={changeCoupon} value={coupon} />
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    colSpan={5}
                    sx={{
                      textTransform: 'uppercase',
                      textAlign: 'center',
                      fontWeight: 600,
                      fontSize: '18px',
                    }}
                  >
                    percentage is reduced
                  </TableCell>
                  <TableCell
                    sx={{
                      textTransform: 'uppercase',
                      textAlign: 'center',
                      fontWeight: 600,
                    }}
                  >
                    {percent ? percent.percent : 0} %
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    colSpan={5}
                    sx={{
                      textTransform: 'uppercase',
                      textAlign: 'center',
                      fontWeight: 600,
                      fontSize: '18px',
                    }}
                  >
                    Total
                  </TableCell>
                  <TableCell
                    sx={{
                      textTransform: 'uppercase',
                      textAlign: 'center',
                      fontWeight: 600,
                    }}
                  >
                    {percent
                      ? dataCard.reduce(
                          (init, curr) => init + curr.quantity * curr.price,
                          0,
                        ) -
                        dataCard.reduce(
                          (init, curr) => init + curr.quantity * curr.price,
                          0,
                        ) *
                          (percent.percent / 100)
                      : dataCard.reduce(
                          (init, curr) => init + curr.quantity * curr.price,
                          0,
                        )}{' '}
                    $
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Box width="100%">
              <Button
                sx={{
                  margin: '20px',
                  padding: '10px 40px',
                  position: 'absolute',
                  right: '200px',
                }}
                variant="contained"
                onClick={handleBuy}
              >
                Buy Now
              </Button>
            </Box>
          </TableContainer>
        ) : (
          <Box textAlign="center" fontSize="21px">
            You have no products in your shopping cart
          </Box>
        )}
      </Container>
    </LayoutShop>
  );
}
