import {
  Button,
  Container,
  Dialog,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import LayoutShop from 'app/components/ShopLayout';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getBillByPhone, getBillDetail, getListBill } from 'server/billService';
import { selectAuthent } from '../authentication/slice/selectors';
import moment from 'moment';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';

export default function ViewOders() {
  const [listBill, setListBill] = useState<any>([]);
  const [id, setId] = useState<number>(0);
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [dataDetail, setDataDetail] = useState<any>([]);

  const [phone, setPhone] = useState<string>('');

  const valuesStatus = [
    {
      value: 0,
      label: 'Unprocessed',
    },
    {
      value: 1,
      label: 'Processed',
    },
    {
      value: 2,
      label: 'Delivering',
    },
    {
      value: 3,
      label: 'delivered',
    },
    {
      value: 4,
      label: 'Cannceled',
    },
  ];

  useEffect(() => {
    (async () => {
      const id = JSON.parse(localStorage.getItem('userIdMember') || '');
      const dataBill = await getListBill(id);
      setListBill(dataBill.data.rows);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const dataBill = await getBillDetail(id);
      setDataDetail(dataBill.data.rows);
    })();
  }, [id]);

  const handleDetail = id => {
    setId(id);
    setOpenPopup(true);
  };

  const handleClose = () => {
    setOpenPopup(false);
  };

  const changePhone = e => {
    setPhone(e.target.value);
  };

  const handleSearchBill = async () => {
    try {
      const data = await getBillByPhone(phone);
      setListBill(data.data.rows);
    } catch (error) {
      setListBill([]);
    }
  };
  return (
    <LayoutShop>
      <Container>
        <Dialog open={openPopup} onClose={handleClose} maxWidth="lg">
          <Box
            position="relative"
            padding="20px"
            width="800px"
            minHeight="300px"
            bgcolor="#a3dff1"
          >
            <CloseIcon
              sx={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                cursor: 'pointer',
              }}
              onClick={handleClose}
            />
            <TableContainer sx={{ marginTop: '50px', borderRadius: '30px' }}>
              <Table>
                <TableHead
                  sx={{ backgroundColor: '#eb9696', borderRadius: '30px' }}
                >
                  <TableCell sx={{ fontWeight: 700 }} align="center">
                    Index
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="center">
                    Product's Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="center">
                    Price
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="center">
                    Quantity
                  </TableCell>
                </TableHead>
                {dataDetail.length > 0 && (
                  <TableBody
                    sx={{ backgroundColor: '#fff', borderRadius: '30px' }}
                  >
                    {dataDetail.map((x, index) => (
                      <TableRow
                        sx={{ cursor: 'pointer' }}
                        onClick={() => handleDetail(x.id)}
                      >
                        <TableCell sx={{ fontWeight: 700 }} align="center">
                          {index + 1}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700 }} align="center">
                          {x.productName}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700 }} align="center">
                          {x.unitPrice}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700 }} align="center">
                          {x.quantity}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Box>
        </Dialog>
        <Box sx={{ borderRadius: '30px' }}>
          <Box
            textAlign="right"
            marginTop="50px"
            display="flex"
            alignItems="center"
          >
            <TextField
              placeholder="Phone"
              sx={{ marginRight: '20px' }}
              value={phone}
              onChange={changePhone}
            />
            <Button variant="contained" onClick={handleSearchBill}>
              Search
            </Button>
          </Box>
          <TableContainer sx={{ marginTop: '50px', borderRadius: '30px' }}>
            <Table>
              <TableHead
                sx={{ backgroundColor: '#eb9696', borderRadius: '30px' }}
              >
                <TableCell sx={{ fontWeight: 700 }} align="center">
                  Index
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="center">
                  Date
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="center">
                  Discount Percent
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="center">
                  Price Total
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="center">
                  Shipper
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="center">
                  Phone Shipper
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="center">
                  Status
                </TableCell>
              </TableHead>
              {listBill.length > 0 && (
                <TableBody>
                  {listBill.map((x, index) => (
                    <TableRow
                      sx={{ cursor: 'pointer' }}
                      onClick={() => handleDetail(x.id)}
                    >
                      <TableCell sx={{ fontWeight: 700 }} align="center">
                        {index + 1}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700 }} align="center">
                        {moment(x.buyDate).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700 }} align="center">
                        {x.discountPercent} %
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700 }} align="center">
                        {x.priceTotal} $
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700 }} align="center">
                        {x.shipperName}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700 }} align="center">
                        {x.shipperPhone}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700 }} align="center">
                        {
                          valuesStatus.filter(o => o.value === x.status)[0]
                            .label
                        }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </LayoutShop>
  );
}
