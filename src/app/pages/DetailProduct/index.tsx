import { Box, Container, Grid, Stack, Button, TextField } from '@mui/material';
import LayoutShop from 'app/components/ShopLayout';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useSlice } from '../DetailProduct/slice';
import { selectDetailProduct } from './slice/selectors';
import { Price, StyleQuantity, Title } from './styled';
import AddIcon from '@mui/icons-material/Add';
import AlertShop from 'app/components/alert';
import BoxReview from './BoxReview';
import ReactStars from 'react-rating-stars-component';
import { selectAuthent } from '../authentication/slice/selectors';

const listBranch = [
  { value: 0, label: 'Nike' },
  { value: 1, label: 'Adidas' },
  { value: 2, label: 'Merrel' },
  { value: 3, label: 'Gucci' },
  { value: 4, label: 'Skechers' },
];

const listMeterial = [
  { value: 0, label: 'Leather' },
  { value: 1, label: 'Suede' },
];

const listStyle = [
  { value: 0, label: 'Slipons' },
  { value: 1, label: 'Boots' },
  { value: 2, label: 'Sandals' },
  { value: 3, label: 'Laceups' },
  { value: 4, label: 'Oxfords' },
];

const listteChnology = [
  { value: 0, label: 'Biobevel' },
  { value: 1, label: 'Groove' },
  { value: 2, label: 'Flexbevel' },
];

const listColor = [
  { value: 0, label: 'Black' },
  { value: 1, label: 'White' },
  { value: 2, label: 'Blue' },
  { value: 3, label: 'Red' },
  { value: 4, label: 'Green' },
  { value: 5, label: 'Grey' },
  { value: 6, label: 'Orange' },
  { value: 7, label: 'Cream' },
  { value: 8, label: 'Brown' },
];

const listGender = [
  { value: 0, label: 'Male' },
  { value: 1, label: 'Female' },
];

export default function DetailPage() {
  const [quantity, setQuantity] = useState<number>(1);
  const [size, setSize] = useState<number>(-1);
  const [openBoxReview, setOpenBoxReview] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');
  const [star, setStar] = useState<number>(0);

  const dispatch = useDispatch();

  const { actions } = useSlice();

  const history = useHistory();

  const param = useParams();

  const product = useSelector(selectDetailProduct).data;

  const { openAlert, dataReview, openAlertReview } =
    useSelector(selectDetailProduct);

  const { data } = useSelector(selectAuthent);

  console.log(dataReview);

  useEffect(() => {
    dispatch(actions.getProductDetail(param));
    dispatch(actions.handleGetReview(product.id));
  }, [param, product.id, openAlertReview]);

  const handleAdd = () => {
    setQuantity(prev => prev + 1);
  };

  const handleSub = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCard = id => {
    if (
      localStorage.getItem('card') &&
      JSON.parse(localStorage.getItem('card') || '').length > 0
    ) {
      const data = JSON.parse(localStorage.getItem('card') || '');

      const sizeId = product.listSize.filter(x => x.id == size)[0].id;

      const newProduct = {
        id,
        quantity,
        sizeId,
        price: product.price,
        image: product.image,
        name: product.name,
      };

      if (data.some(x => x.id === id)) {
        console.log(id);
        const dataFilter = data.map(x => {
          if (x.id === id) {
            return {
              ...x,
              quantity: x.quantity + quantity,
            };
          } else return x;
        });
        localStorage.setItem('card', JSON.stringify(dataFilter));
      } else {
        const dataNew = data.concat(newProduct);
        console.log(dataNew);
        localStorage.setItem('card', JSON.stringify(dataNew));
      }

      dispatch(
        actions.setTotalCard(
          JSON.parse(localStorage.getItem('card') || '').length,
        ),
      );
      dispatch(actions.openAlert());
    } else {
      const sizeId = product.listSize.filter(x => x.id == size)[0].id;
      const data = JSON.stringify([
        {
          id,
          quantity,
          sizeId,
          price: product.price,
          image: product.image,
          name: product.name,
        },
      ]);

      console.log(data);

      localStorage.setItem('card', data);

      dispatch(
        actions.setTotalCard(
          JSON.parse(localStorage.getItem('card') || '').length,
        ),
      );
      dispatch(actions.openAlert());
    }
  };

  const handleChooseSize = index => {
    setSize(index);
  };

  const handleCreatReview = () => {
    setOpenBoxReview(true);
  };

  const handleCloseBoxReview = () => {
    setOpenBoxReview(false);
  };

  const handleClickStar = e => {
    setStar(e);
  };

  const handleReview = () => {
    const params = {
      comment: comment,
      productId: product.id,
      star: star,
      userId: data.id,
    };
    console.log(star);
    dispatch(actions.handleReviews(params));
    setOpenBoxReview(false);
  };

  return (
    <LayoutShop>
      <AlertShop
        isOpen={openAlert}
        textAlert="Add product to cart successfully"
        type="success"
        onClose={() => {
          dispatch(actions.closeAlert());
          history.push('/');
        }}
        handl={() => history.push('/')}
      />

      <AlertShop
        isOpen={openAlertReview}
        textAlert="Review successfully"
        type="success"
        onClose={() => {
          dispatch(actions.closeAlert());
          window.location.reload();
        }}
        handl={() => history.push('/')}
      />
      <Container
        sx={{
          marginTop: '100px',
          marginBottom: '50px',
          fontFamily: 'monospace',
        }}
      >
        <Grid container spacing={10}>
          <Grid item xs={6}>
            <img
              src={product.image}
              alt="this is image product"
              width="100%"
              height="cover"
              style={{ objectFit: 'cover', borderRadius: '10px' }}
            />
          </Grid>
          <Grid item xs={6}>
            <Grid
              container
              sx={{
                display: 'flex',
                alignItems: 'center',
                borderBottom: '1px solid #bbb',
              }}
            >
              <Grid item xs={4}>
                <Title sx={{ fontSize: '16px' }}>Product's Name: </Title>
              </Grid>
              <Grid item xs={8}>
                <Title>{product.name}</Title>
              </Grid>
            </Grid>
            <Grid
              container
              sx={{
                display: 'flex',
                alignItems: 'center',
                borderBottom: '1px solid #bbb',
              }}
            >
              <Grid item xs={4}>
                <Title sx={{ fontSize: '16px' }}>Price: </Title>
              </Grid>
              <Grid item xs={8}>
                <Title>{product.price} $</Title>
              </Grid>
            </Grid>
            <Grid
              container
              sx={{
                display: 'flex',
                alignItems: 'center',
                borderBottom: '1px solid #bbb',
              }}
            >
              <Grid item xs={4}>
                <Title sx={{ fontSize: '16px' }}>Facturer: </Title>
              </Grid>
              <Grid item xs={8}>
                <Title>{product.manufacturer}</Title>
              </Grid>
            </Grid>
            <Grid
              container
              sx={{
                display: 'flex',
                alignItems: 'center',
                borderBottom: '1px solid #bbb',
              }}
            >
              <Grid item xs={4}>
                <Title sx={{ fontSize: '16px' }}>Material: </Title>
              </Grid>
              <Grid item xs={8}>
                <Title>
                  {
                    listMeterial.filter(x => x.value === product.material)[0]
                      .label
                  }
                </Title>
              </Grid>
            </Grid>
            <Grid
              container
              sx={{
                display: 'flex',
                alignItems: 'center',
                borderBottom: '1px solid #bbb',
              }}
            >
              <Grid item xs={4}>
                <Title sx={{ fontSize: '16px' }}>Style: </Title>
              </Grid>
              <Grid item xs={8}>
                <Title>
                  {listStyle.filter(x => x.value === product.style)[0].label}
                </Title>
              </Grid>
            </Grid>
            <Grid
              container
              sx={{
                display: 'flex',
                alignItems: 'center',
                borderBottom: '1px solid #bbb',
              }}
            >
              <Grid item xs={4}>
                <Title sx={{ fontSize: '16px' }}>Technology: </Title>
              </Grid>
              <Grid item xs={8}>
                <Title>
                  {
                    listteChnology.filter(
                      x => x.value === product.technology,
                    )[0].label
                  }
                </Title>
              </Grid>
            </Grid>
            <Grid
              container
              sx={{
                display: 'flex',
                alignItems: 'center',
                borderBottom: '1px solid #bbb',
              }}
            >
              <Grid item xs={4}>
                <Title sx={{ fontSize: '16px' }}>Color: </Title>
              </Grid>
              <Grid item xs={8}>
                <Title>
                  {listColor.filter(x => x.value === product.color)[0].label}
                </Title>
              </Grid>
            </Grid>
            <Grid
              container
              sx={{
                display: 'flex',
                alignItems: 'center',
                borderBottom: '1px solid #bbb',
              }}
            >
              <Grid item xs={4}>
                <Title sx={{ fontSize: '16px' }}>Description: </Title>
              </Grid>
              <Grid item xs={8}>
                <Title>{product.description}</Title>
              </Grid>
            </Grid>
            <Grid
              container
              sx={{
                display: 'flex',
                alignItems: 'center',
                borderBottom: '1px solid #bbb',
              }}
            >
              <Grid item xs={4}>
                <Title sx={{ fontSize: '16px' }}>Size: </Title>
              </Grid>
              <Grid item xs={8}>
                <Title>
                  {product.listSize.map((x, index) => (
                    <StyleQuantity
                      onClick={() => handleChooseSize(x.id)}
                      variant={size === x.id ? 'contained' : 'outlined'}
                    >
                      {x.name}
                    </StyleQuantity>
                  ))}
                </Title>
              </Grid>
            </Grid>
            <Grid
              container
              sx={{
                display: 'flex',
                alignItems: 'center',
                borderBottom: '1px solid #bbb',
              }}
            >
              <Grid item xs={4}>
                <Title sx={{ fontSize: '16px' }}>Quantity purchased: </Title>
              </Grid>
              <Grid item xs={8} sx={{ display: 'flex' }}>
                <StyleQuantity onClick={handleSub} disabled={quantity < 2}>
                  -
                </StyleQuantity>
                <Box display="flex" alignItems="center">
                  {quantity}
                </Box>
                <StyleQuantity
                  onClick={handleAdd}
                  disabled={quantity >= product.total_quantity}
                >
                  +
                </StyleQuantity>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              sx={{ marginTop: '20px' }}
              onClick={() => handleAddToCard(product.id)}
              disabled={size === -1 ? true : false}
            >
              <AddIcon />
              Add to Card
            </Button>
            <Box display={size === -1 ? 'block' : 'none'}>
              Please choose size!!!
            </Box>
          </Grid>
        </Grid>
        <Box
          width="100%"
          border="1px solid #ccc"
          borderRadius="20px"
          marginTop="50px"
          padding="20px"
          fontSize="20px"
        >
          <Box height="500px" sx={{ overflowY: 'scroll' }}>
            {dataReview.length > 0 ? (
              <Box>
                <Box fontWeight={700} marginBottom="20px">
                  Review
                </Box>
                {dataReview.map(x => (
                  <BoxReview
                    comment={x.comment}
                    username={x.userName}
                    star={x.star}
                  />
                ))}
              </Box>
            ) : (
              'There are no reviews yet '
            )}
          </Box>
          <Button
            variant="contained"
            sx={{ margin: '20px', display: openBoxReview ? 'none' : 'block' }}
            onClick={handleCreatReview}
          >
            Create review
          </Button>
          <Box
            sx={{
              bgcolor: '#fff',
              padding: '20px',
              borderRadius: '20px',
              marginTop: '20px',
            }}
            display={openBoxReview ? 'block' : 'none'}
          >
            <Box>{data.name}</Box>
            <ReactStars
              count={5}
              size={20}
              activeColor="#ffd700"
              onChange={handleClickStar}
            />
            <TextField
              sx={{ width: '100%' }}
              onChange={e => setComment(e.target.value)}
            />
            <Box
              marginTop="20px"
              display="flex"
              justifyContent="right"
              gap="20px"
            >
              <Button variant="contained" onClick={handleReview}>
                review
              </Button>
              <Button variant="contained" onClick={handleCloseBoxReview}>
                cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </LayoutShop>
  );
}
