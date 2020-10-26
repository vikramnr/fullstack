import express from 'express';
import PatientService from '../services/patient';

const router = express.Router();

router.get('/',(_req,res,_next) => {
    res.send(PatientService.getAllNonSSNPatientData());
});

export default router;