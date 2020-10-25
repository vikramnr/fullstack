import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/ping',(_req,res) => {
    res.send('pong');
});

app.get('/api/patients',(_req,res) => {
    res.send('hello');
});
const PORT = 3001;

app.listen(PORT,() => {
    console.log(`app started at ${PORT}`);
});
