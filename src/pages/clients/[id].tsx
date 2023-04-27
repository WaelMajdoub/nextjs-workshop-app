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

  const handleClickOpenDeleteDialog = (patient) => {
    setPatientToDelete(patient);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeletePatient = async () => {
    try {
      await axios.delete(`${API_URL}${patientToDelete.id}/`);
      setPatients(patients.filter((patient) => patient.id !== patientToDelete.id));
    } catch (error) {
      console.error(error);
    } finally {
      setOpenDeleteDialog(false);
    }
  };

  const fetchData = async () => {
    try {
      const { id } = router.query;
      if (id) {
        const result = await axios(`${API_URL}${id}/`);
        setPatients([result.data]);
      } else {
        const result = await axios(`${API_URL}`);
        setPatients(result.data);
      }
    } catch (error) {
      console.error(error);
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
                <Typography gutterBottom variant="h5" component="div">{patients[0].first_name}</Typography>
                <Typography gutterBottom variant="h5" component="div">{patients[0].last_name}</Typography>
                <Typography gutterBottom variant="h5" component="div">{patients[0].email}</Typography>
                <Typography gutterBottom variant="h5" component="div">{patients[0].phone}</Typography>
                <Typography gutterBottom variant="h5" component="div">{patients[0].address}</Typography>
                <Typography gutterBottom variant="h5" component="div">{patients[0].birthdate}</Typography>
                <Typography gutterBottom variant="h5" component="div">{patients[0].medical_history}</Typography>
                <Typography gutterBottom variant="h5" component="div">{patients[0].gender}</Typography>
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
              onClick={() => router.push(`/edit-client?id=${patients[0].id}`)}
            >
              Edit
            </Button>
          </div>
      
          <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
            <DialogTitle>Delete client?</DialogTitle>
            <DialogContent>
              <Typography>
                Are you sure you want to delete {patientToDelete.first_name} {patientToDelete.last_name}?
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