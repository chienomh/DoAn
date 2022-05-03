import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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

export default function CardPage() {
  const [dataCard, setDataCard] = useState<any>([]);

  const userId = JSON.parse(localStorage.getItem('userId') || '');

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

    console.log(product);
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
    const params = {
      couponName: '',
      discountPersent: 0,
      listBillProducts: dataCard.map(x => ({
        productId: x.id,
        quantity: x.quantity,
        sizeId: x.sizeId,
      })),

      priceTotal: dataCard.reduce(
        (init, curr) => init + curr.quantity * curr.price,
        0,
      ),
      userId: userId,
    };

    dispatch(actions.handleCreateBill(params));

    dispatch(actions.handleCreateBillSuccess());

    localStorage.setItem('card', '');
  };

  console.log(dataCard);
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
                    0
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
                    {dataCard.reduce(
                      (init, curr) => init + curr.quantity * curr.price,
                      0,
                    )}
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
