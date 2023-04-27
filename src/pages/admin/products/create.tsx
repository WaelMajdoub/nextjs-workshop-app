import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';
import axios from 'axios';
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CreateClient() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [purchasePrice, setPurchase] = useState('');
  const [salesPrice, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [sku, setSku] = useState('');
  const [stock, setStock] = useState('');
  const [reorderPoint, setReorder] = useState('');

  const handleSaveClient = async (event: any) => {
    event.preventDefault();
    const payload = {
      name: name,
      description: description,
      purchase_price: purchasePrice,
      sales_price: salesPrice,
      category: category,
      sku: sku,
      stock: stock,
      reorder_point: reorderPoint,
    };
    try {
      await axios.post('https://dental.aftercode.tn/api/v1/products/', payload); //local API: await axios.post('http://localhost:3000/api/clients/', payload)
      toast("Product created successfully");
      router.push('/admin/products/');
    } catch (error) {
      console.error(error);
    }
    console.log("BUTTON YI5DIM");
  };

  const handleResetForm = () => {
    setName('');
    setDescription('');
    setPurchase('');
    setPrice('');
    setCategory('');
    setSku('');
    setStock('');
    setReorder('');
  };

  return (
    <>
      <center>
        <h1>Add Product</h1>
        <form>
          <TextField 
            id="name"
            type="text"
            label="Name"
            variant="outlined"
            value={name}
            required
            onChange={(event) => setName(event.target.value)}
            sx={{ mb: 2, width: '50ch' }}
          />
          <br />
          <TextField
            type="text"
            label="description"
            variant="outlined"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            sx={{ mb: 2, width: '50ch' }}
          />
          <br />
          <TextField
            required
            type="text"
            label="purchase_price"
            variant="outlined"
            value={purchasePrice}
            onChange={(event) => setPurchase(event.target.value)}
            sx={{ mb: 2, width: '50ch' }}
          />
          <br />
          <TextField
            required
            type="text"
            label="sales price"
            variant="outlined" 
            value={salesPrice} 
            onChange={(event) => setPrice(event.target.value)}
            sx={{ mb: 2, width: '50ch' }}
          />
          <br />
          <TextField 
            type="number"
            label="category" 
            variant="outlined" 
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            sx={{ mb: 2, width: '50ch' }}
          />
          <br />
          <TextField
            type="number"
            label="sku" 
            variant="outlined" 
            value={sku}
            onChange={(event) => setSku(event.target.value)}
            sx={{ mb:2, width: '50ch' }}
            />
            <br />
            <TextField
            type="number"
            label="stock"
            variant="outlined"
            value={stock}
            onChange={(event) => setStock(event.target.value)}
            sx={{ mb: 2, width: '50ch' }}
            />
            <br />
            <TextField
            type="number"
            label="reorder point"
            variant="outlined"
            value={reorderPoint}
            onChange={(event) => setReorder(event.target.value)}
            sx={{ mb: 2, width: '50ch' }}
            />
            <br />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={handleResetForm}
            >
              Reset
            </Button>
            <Button
              variant="contained"
              color="primary"
              endIcon={<SaveIcon />}
              onClick={handleSaveClient}
            >
              Save
            </Button>
          </Box>
            </form>
            </center>
            </>
            );
            }            