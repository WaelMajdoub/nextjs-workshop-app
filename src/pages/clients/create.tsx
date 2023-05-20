import React from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { toast } from 'react-toastify';

const schema = z.object({
  first_name: z.string().nonempty('First Name is required'),
  last_name: z.string().nonempty('Last Name is required'),
  email: z.string().email('Invalid Email').nonempty('Email is required'),
  phone: z.string().nonempty('Phone is required'),
  address: z.string().nonempty('Address is required'),
});

export default function CreateClient() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleSaveClient = async (data) => {
    try {
      await axios.post('https://dental.aftercode.tn/api/v1/patients/', data);
      toast('Client created successfully');
      router.push('/clients/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <main>
        <h1>Add Client</h1>
        <form onSubmit={handleSubmit(handleSaveClient)}>
          <TextField
            id="first_name"
            label="First Name"
            variant="outlined"
            {...register('first_name')}
            error={!!errors.first_name}
            helperText={errors.first_name?.message}
          />
          <br />
          <TextField
            label="Last Name"
            variant="outlined"
            {...register('last_name')}
            error={!!errors.last_name}
            helperText={errors.last_name?.message}
          />
          <br />
          <TextField
            label="Email"
            variant="outlined"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <br />
          <TextField
            label="Phone"
            variant="outlined"
            {...register('phone')}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
          <br />
          <TextField
            label="Address"
            variant="outlined"
            {...register('address')}
            error={!!errors.address}
            helperText={errors.address?.message}
          />
          <br />
          <Button variant="outlined" startIcon={<SaveIcon />} type="submit">
            Save
          </Button>
        </form>
      </main>
    </>
  );
}
