import express from 'express'
import { calculateBmi } from './bmiCalculator'
const app = express()

app.get('/hello',(_req,res) => {
    res.send('Hello Full Stack!')
})

app.get('/bmi', (req,res) => {
    let height = Number(req.query.height)
    let weight = Number(req.query.weight)
    if(isNaN(weight) || isNaN(height)) {
        res.send({
            error: 'malformatted parameters"'
        })
    }
    let bmi = calculateBmi({height,weight})
    res.json({
        bmi,
        height,
        weight
    })
})

const PORT =3001

app.listen(PORT, () => {
    console.log(`app started at ${PORT}`)
})