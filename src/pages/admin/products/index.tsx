import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Stack from '@mui/material/Stack';
import CreateIcon from '@mui/icons-material/Create';

const API_URL = 'https://dental.aftercode.tn/api/v1/products/';


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState({});
  const router = useRouter()



  
  interface Product {
    id: number;
    name: string;
    description: string;
    purchase_price: number;
    sales_price: number;
    category: string;
    sku: string;
    stock: number;
    reorder_point: number;
  }
  //function
  const handleClickOpen = (product: any) => {
    setPatientToDelete(product);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const deletePatient = async () => {
    try {
      await axios.delete(`${API_URL}${(patientToDelete as Product).id}/`);
      setProducts(products.filter((product: Product) => product.id !== (patientToDelete as Product).id));
    } catch (error) {
      console.error(error);
    } finally {
      setOpen(false);
    }
  };

  const fetchData = async () => {
    const result = await axios(API_URL);
    setProducts(result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <main>
      <br />
    <center><Button startIcon={<CreateIcon />} variant="contained" onClick={() => router.push('/admin/products/create')}>create a product</Button></center>
      
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>description</TableCell>
            <TableCell>purchase_price</TableCell>
            <TableCell>sales_price</TableCell>
            <TableCell>category</TableCell>
            <TableCell>sku</TableCell>
            <TableCell>stock</TableCell>
            <TableCell>reorder_point</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {products.map((product: Product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.purchase_price}</TableCell>
              <TableCell>{product.sales_price}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.sku}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.reorder_point}</TableCell>
              <TableCell>
                <Button onClick={() => handleClickOpen(product)} color="secondary">
                  Delete
                </Button>
              </TableCell>
              <TableCell>
                <Link href="/products/[id]" as={`/products/${product.id}`}>
                  <Button color="primary">Detail</Button>
                </Link>
              </TableCell>
              <TableCell>
                <Link href="/products/edit/[id]" as={`/products/edit/${product.id}`}>
                  <Button color="primary">Edit</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete product?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the product with ID: {(patientToDelete as Product).id}? 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deletePatient} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
    </main>
  );
};
export default ProductList;