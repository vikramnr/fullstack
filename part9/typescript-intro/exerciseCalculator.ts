interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  training: Array<number>;
  target: number;
}

export function parseArgumentsForCalculator(args: Array<string>): ExerciseValues {
  if (args.length < 4)
    throw new Error("not enough arugments");
  if (args.length > 12)
    throw new Error("too many arugments");

  const exerciseValues: Array<number> = [...args.slice(2)].map(Number);

  if (exerciseValues.every((n) => !isNaN(n)) && exerciseValues.length === 10) {
    if (exerciseValues.length === 10) {
      return {
        training: exerciseValues.slice(1, exerciseValues.length),
        target: exerciseValues[0],
      };
    } else {
      throw new Error('arugments should be of type number... please check your input and try againg');
    }
  }
  throw new Error('Some error has occured.. please check');
}

export const calculateExercises = (exerciseValues: ExerciseValues): Result => {
  const { training, target } = exerciseValues;
  const trainedDays = training.filter((n) => n >= target);
  const rating = Math.ceil(training.reduce((a, r) => a + r, 0) / 7);
  const ratingMapping: { [key: number]: string } = {
    1: "good days are ahead, keep training",
    2: "not too bad but could be better",
    3: "keep training, best is yet to come",
    4: "push harder, just few more laps!!!",
    5: "great workout, take some timeoff?",
  };

  return {
    periodLength: training.length,
    trainingDays: training.filter((n) => n > 0).length,
    success: training.every((n) => n >= target),
    rating,
    ratingDescription: ratingMapping[rating],
    target,
    average: trainedDays.reduce((a, r) => a + r, 0) / training.length,
  };
};

// try {
//   const exerciseValues: ExerciseValues = parseArgumentsForCalculator(
//     process.argv
//   );
//   console.log(calculateExercises(exerciseValues));
// } catch (e) {
//   console.log("error occurend", e.message);
// }
