import React, { useState } from 'react';
import { useRouter } from 'next/router'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';

export default function CreateClient() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  const handleSaveClient = (event: any) => {
    event.preventDefault()
    const payload = {
      email: email
    }
    console.log('display the client informations', payload)
  }

  return (
    <>
      <main>
        <h1>Add Client</h1>
        <form>
         <TextField 
          id="first_name"
          label="First Name"
          variant="outlined"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          />
         <br />
         <TextField
          label="Last Name"
          variant="outlined"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          />
         <br />
         <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          />
         <br />
         <TextField
          label="Phone"
          variant="outlined" 
          value={phone} 
          onChange={(event) => setPhone(event.target.value)} 
          />
         <br />
         <TextField 
          label="Address" 
          variant="outlined" 
          value={address} 
          onChange={(event) => setAddress(event.target.value)} 
          />
         <br />
         <Button 
          variant="outlined"
          startIcon={<SaveIcon />}
          onClick={handleSaveClient}
          >
          Save
        </Button>
        </form>
      </main>
    </>
  )
}
