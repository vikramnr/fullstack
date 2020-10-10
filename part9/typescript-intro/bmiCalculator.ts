interface BmiValues {
  height: number;
  weight: number;
}

export const calculateBmi = (bmiValues: BmiValues): string => {
  let { height, weight } = bmiValues;

  let mHeight = height / 100;
  let bmi = weight / (mHeight * mHeight);
  if (bmi < 15) {
    return "Very severely underweight";
  } else if (bmi < 16 && bmi >= 15) {
    return "Severely underweight	";
  } else if (bmi > 16 && bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi < 25) {
    return "Normal (healthy weight)";
  } else if (bmi >= 25 && bmi < 30) {
    return "Overweight";
  } else if (bmi >= 30 && bmi < 35) {
    return "Obese Class I (Moderately obese)";
  } else if (bmi >= 35 && bmi < 40) {
    return "Obese Class II (Severely obese)";
  } else if (bmi >= 40) {
    return "Obese Class III (Very severely obese)";
  }
  return 'an error occured. Please try again'
};

export const parseArgumentsForBMI = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error("not enough arugments");
  if (args.length > 6) throw new Error("too many arugments");

  let argsValue1: number = Number(args[2]);
  let argsValue2: number = Number(args[3]);

  if (!isNaN(argsValue1) && !isNaN(argsValue2)) {
    return {
      height: argsValue1,
      weight: argsValue2,
    };
  } else {
      throw new Error('arugment should of type number.. Please check your input and try again')
  }
};

// try {
//   console.log('hello why areyou')
//   const bmiValues: BmiValues = parseArgumentsForBMI(process.argv);
//   console.log(calculateBmi(bmiValues));
// } catch (e) {
//   console.log("error occurend", e.message);
// }
