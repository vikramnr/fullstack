/* eslint-disable @typescript-eslint/no-unsafe-call */
import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(weight) || isNaN(height)) {
    res.send({
      error: 'malformatted parameters"',
    });
  }
  const bmi = calculateBmi({ height, weight });
  res.json({
    bmi,
    height,
    weight,
  });
});
app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;
  const target1 = target as number;
  const daily_exercises1 = daily_exercises as number[];
  console.log(req.body);
  if (!target1 || !daily_exercises1) {
    return res.json({ error: "missing parameters" });
  } else if (
    isNaN(target1) ||
    daily_exercises1.map(Number).every((n) => isNaN(n))
  ) {
    return res.json({ error: "malformed parameters" });
  } else {
    const result = calculateExercises({
      training: daily_exercises1,
      target: target1,
    });
    return res.send(result);
  }
  res.end('any eror');
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`app started at ${PORT}`);
});
