import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Delete as DeleteIcon, Save as SaveIcon } from '@mui/icons-material';
import axios from 'axios';

const API_URL = 'https://dental.aftercode.tn/api/v1/patients/';

export default function CreateClient() {
  const router = useRouter();
  const [patients, setPatients] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState({});

  interface Patient {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: number;
    address: string;
    birthdate: string;
    medical_history: string;
    gender: string;
  }

  const handleClickOpenDeleteDialog = (patient: any) => {
    setPatientToDelete(patient);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeletePatient = async () => {
    try {
      await axios.delete(`${API_URL}${(patientToDelete as Patient).id}/`);
      setPatients(patients.filter((patient: any) => patient.id !== (patientToDelete as Patient).id));
    } catch (error) {
      console.error(error);
    } finally {
      setOpenDeleteDialog(false);
    }
  };

  const fetchData = async (): Promise<Patient[]> => {
    try {
      const { id } = router.query;
      if (id) {
        const result = await axios(`${API_URL}${id}/`);
        return [result.data];
      } else {
        const result = await axios(`${API_URL}`);
        return result.data;
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    fetchData();
  }, [router.query.id]);

  return (
    <main>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <h1>Client details</h1>

        {patients.length > 0 && (
          <Card sx={{ maxWidth: 1500 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="200"
                image="https://cdn-icons-png.flaticon.com/512/6386/6386976.png"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">{(patients[0] as Patient).first_name}</Typography>
                <Typography gutterBottom variant="h5" component="div">{(patients[0] as Patient).last_name}</Typography>
                <Typography gutterBottom variant="h5" component="div">{(patients[0] as Patient).email}</Typography>
                <Typography gutterBottom variant="h5" component="div">{(patients[0] as Patient).phone}</Typography>
                <Typography gutterBottom variant="h5" component="div">{(patients[0] as Patient).address}</Typography>
                <Typography gutterBottom variant="h5" component="div">{(patients[0] as Patient).birthdate}</Typography>
                <Typography gutterBottom variant="h5" component="div">{(patients[0] as Patient).medical_history}</Typography>
                <Typography gutterBottom variant="h5" component="div">{(patients[0] as Patient).gender}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        )}
        

        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}        
            onClick={() => handleClickOpenDeleteDialog(patients[0])}
            >
              Delete
            </Button>
      
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              style={{ marginLeft: '10px' }}
              onClick={() => router.push(`/edit-client?id=${(patients[0] as Patient).id}`)}
            >
              Edit
            </Button>
          </div>
      
          <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
            <DialogTitle>Delete client?</DialogTitle>
            <DialogContent>
              <Typography>
                Are you sure you want to delete {(patientToDelete as Patient).first_name} {(patientToDelete as Patient).last_name}?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
              <Button onClick={handleDeletePatient} color="error">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </main>
      );
    }