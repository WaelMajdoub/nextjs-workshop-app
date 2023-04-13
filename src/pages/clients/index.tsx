import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Table, TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle } from '@mui/material';
import Link from 'next/link';

const API_URL = 'https://dental.aftercode.tn/api/v1/patients/';

const PatientsList = () => {
  const [patients, setPatients] = useState([]);
  const [open, setOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState({});

  const handleClickOpen = (patient) => {
    setPatientToDelete(patient);
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  
  const deletePatient = async () => {
    try {
      await Axios.delete(`${API_URL}${patientToDelete.id}/`);
      setPatients(patients.filter((patient) => patient.id !== patientToDelete.id));
    } catch (error) {
      console.error(error);
    } finally {
      setOpen(false);
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios(API_URL);
      setPatients(result.data);
    };
    fetchData();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Birthdate</TableCell>
            <TableCell>Medical History</TableCell>
            <TableCell>Gender</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell>{patient.id}</TableCell>
              <TableCell>{patient.first_name}</TableCell>
              <TableCell>{patient.last_name}</TableCell>
              <TableCell>{patient.email}</TableCell>
              <TableCell>{patient.phone}</TableCell>
              <TableCell>{patient.address}</TableCell>
              <TableCell>{patient.birthdate}</TableCell>
              <TableCell>{patient.medical_history}</TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>
                <Button onClick={() => handleClickOpen(patient)} color="secondary">
                  Delete
                </Button>
              </TableCell>
              <TableCell>
                <Link href="/patients/[id]" as={`/patients/${patient.id}`}>
                  <Button color="primary">Detail</Button>
                </Link>
              </TableCell>
              <TableCell>
                <Link href="/patients/edit/[id]" as={`/patients/edit/${patient.id}`}>
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
        <DialogTitle id="alert-dialog-title">{"Delete patient?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the patient with ID: {patientToDelete.id}?
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
  );
};

export default PatientsList;
