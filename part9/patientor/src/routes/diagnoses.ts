import express from 'express';
import DiagnosisService from '../services/diagnoses';
const router = express.Router();


router.get('/',(_req,res,_next) => {
    res.send(DiagnosisService.getAllDiagnosisData());
});

export default router;