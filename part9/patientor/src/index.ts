import express from 'express';
import cors from 'cors';
import diagnosisRouter from './routes/diagnoses';
import patientRouter from './routes/patient';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/ping',(_req,res) => {
    res.send('pong');
});
app.use('/api/patients',patientRouter);
app.use('/api/diagnosis',diagnosisRouter);

const PORT = 3001;

app.listen(PORT,() => {
    console.log(`app started at ${PORT}`);
});
