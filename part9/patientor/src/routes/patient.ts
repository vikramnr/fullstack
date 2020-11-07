/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import express from 'express';
import PatientService from '../services/patient';
import toNewPatient from '../routes/utils';

const router = express.Router();

router.get('/',(_req,res,_next) => {
    res.send(PatientService.getAllNonSSNPatientData());
});

router.post('/',(req,res) => {
    const {name, dateOfBirth, ssn, gender, occupation } = req.body;
    let newPatinet = toNewPatient({
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation
    });
    newPatinet = PatientService.addNewPatient(newPatinet);
    res.json(newPatinet);
});

export default router;