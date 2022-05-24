import { Button, Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import LayoutShop from 'app/components/ShopLayout';
import ShopProduct from 'app/components/ShopProduct';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Products } from './data';
import { useSlice } from './slice';
import { selectProduct } from './slice/selectors';
import { ButtonFilter, TitleFilter, WrapperFilter } from './styled';

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

export default function MenPage() {
  const [branch, setBranch] = useState<any>(-1);

  const [material, setMaterial] = useState<any>(-1);

  const [style, setStyle] = useState<any>(-1);

  const [technology, setTechnology] = useState<any>(-1);

  const [color, setColor] = useState<any>(-1);

  const [gender, setGender] = useState<any>(-1);

  const dispatch = useDispatch();

  const { actions } = useSlice();

  const { param, data } = useSelector(selectProduct);

  useEffect(() => {
    return () => {
      dispatch(
        actions.changeParams({
          branch: -1,
          color: -1,
          gender: -1,
          material: -1,
          offset: -1,
          pageNumber: -1,
          pageSize: -1,
          product_name: '',
          style: -1,
          technology: -1,
        }),
      );
    };
  }, []);

  useEffect(() => {
    dispatch(actions.getListProduct(param));
  }, [param]);

  const handleChangeSearch = () => {
    const value = JSON.parse(localStorage.getItem('valueSearch') || '');
    const newParam = { ...param, product_name: value };
    dispatch(actions.changeParams(newParam));
  };

  useEffect(() => {
    handleChangeSearch();
  }, [localStorage.getItem('valueSearch')]);

  const handleChangeBranch = value => {
    if (branch === value) {
      setBranch(-1);

      const { branch, ...rest } = param;
      const newParam = { ...param, branch: '' };
      dispatch(actions.changeParams(newParam));
    } else {
      setBranch(value);

      const newParam = { ...param, branch: value };

      dispatch(actions.changeParams(newParam));
    }
  };

  const handleChangeMaterial = value => {
    if (material === value) {
      setMaterial(-1);

      const { material, ...rest } = param;
      const newParam = { ...param, material: '' };

      dispatch(actions.changeParams(newParam));
    } else {
      setMaterial(value);

      const newParam = { ...param, material: value };

      dispatch(actions.changeParams(newParam));
    }
  };

  const handleChangeStyle = value => {
    if (style === value) {
      setStyle(-1);

      const { style, ...rest } = param;
      const newParam = { ...param, style: '' };
      dispatch(actions.changeParams(newParam));
    } else {
      setStyle(value);

      const newParam = { ...param, style: value };

      dispatch(actions.changeParams(newParam));
    }
  };

  const handleChangeTechnology = value => {
    if (technology === value) {
      setTechnology(-1);

      const { technology, ...rest } = param;
      const newParam = { ...param, technology: '' };
      dispatch(actions.changeParams(newParam));
    } else {
      setTechnology(value);

      const newParam = { ...param, technology: value };

      dispatch(actions.changeParams(newParam));
    }
  };

  const handleChangeColor = value => {
    if (color === value) {
      setColor(-1);

      const { color, ...rest } = param;
      const newParam = { ...param, color: '' };
      dispatch(actions.changeParams(newParam));
    } else {
      setColor(value);

      const newParam = { ...param, color: value };

      dispatch(actions.changeParams(newParam));
    }
  };

  const handleChangeGender = value => {
    if (gender === value) {
      setGender(-1);

      const { gender, ...rest } = param;
      const newParam = { ...param, gender: '' };
      dispatch(actions.changeParams(newParam));
    } else {
      setGender(value);

      const newParam = { ...param, gender: value };

      dispatch(actions.changeParams(newParam));
    }
  };
  return (
    <>
      <Helmet>
        <title>Men</title>
      </Helmet>
      <LayoutShop>
        <Box
          textAlign="center"
          fontSize="28px"
          color="#595959"
          margin="50px 50px"
          textTransform="uppercase"
        >
          All products
        </Box>
        <Container sx={{ marginBottom: '100px' }}>
          <Grid container spacing={4}>
            <Grid item xs={3}>
              <WrapperFilter>
                <TitleFilter>Branch</TitleFilter>
                <Box>
                  {listBranch.map(x => (
                    <ButtonFilter
                      variant={branch === x.value ? 'contained' : 'outlined'}
                      onClick={() => handleChangeBranch(x.value)}
                    >
                      {x.label}
                    </ButtonFilter>
                  ))}
                </Box>
              </WrapperFilter>
              <WrapperFilter>
                <TitleFilter>Material</TitleFilter>
                <Box>
                  {listMeterial.map(x => (
                    <ButtonFilter
                      variant={material === x.value ? 'contained' : 'outlined'}
                      onClick={() => handleChangeMaterial(x.value)}
                    >
                      {x.label}
                    </ButtonFilter>
                  ))}
                </Box>
              </WrapperFilter>
              <WrapperFilter>
                <TitleFilter>Style</TitleFilter>
                <Box>
                  {listStyle.map(x => (
                    <ButtonFilter
                      variant={style === x.value ? 'contained' : 'outlined'}
                      onClick={() => handleChangeStyle(x.value)}
                    >
                      {x.label}
                    </ButtonFilter>
                  ))}
                </Box>
              </WrapperFilter>
              <WrapperFilter>
                <TitleFilter>Technology</TitleFilter>
                <Box>
                  {listteChnology.map(x => (
                    <ButtonFilter
                      variant={
                        technology === x.value ? 'contained' : 'outlined'
                      }
                      onClick={() => handleChangeTechnology(x.value)}
                    >
                      {x.label}
                    </ButtonFilter>
                  ))}
                </Box>
              </WrapperFilter>
              <WrapperFilter>
                <TitleFilter>Color</TitleFilter>
                <Box>
                  {listColor.map(x => (
                    <ButtonFilter
                      variant={color === x.value ? 'contained' : 'outlined'}
                      onClick={() => handleChangeColor(x.value)}
                    >
                      {x.label}
                    </ButtonFilter>
                  ))}
                </Box>
              </WrapperFilter>
              <WrapperFilter>
                <TitleFilter>Gender</TitleFilter>
                <Box>
                  {listGender.map(x => (
                    <ButtonFilter
                      variant={gender === x.value ? 'contained' : 'outlined'}
                      onClick={() => handleChangeGender(x.value)}
                    >
                      {x.label}
                    </ButtonFilter>
                  ))}
                </Box>
              </WrapperFilter>
            </Grid>
            <Grid container item xs={9} spacing={5}>
              {data.map(x => (
                <ShopProduct
                  link={x.image}
                  cost={x.price}
                  title={x.name}
                  sizeGrid={4}
                  id={x.id}
                />
              ))}
            </Grid>
          </Grid>
        </Container>
      </LayoutShop>
    </>
  );
}
