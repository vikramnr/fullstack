const calculateBmi= (height: number, weight: number) :string  => {
    let mHeight=  height/100
    let bmi = weight/(mHeight*mHeight)
    if(bmi<15) {
        return 'Very severely underweight'
    } else if(bmi<16 && bmi>=15) {
        return 'Severely underweight	'
    } else if (bmi>16 && bmi<18.5) {
        return 'Underweight'
    } else if(bmi>=18.5 && bmi<25 ) {
        return 'Normal (healthy weight)'
    } else if(bmi>=25 && bmi<30) {
        return 'Overweight'
    } else if(bmi>=30 && bmi<35) {
        return 'Obese Class I (Moderately obese)'
    } else if(bmi>=35 && bmi<40) {
        return 'Obese Class II (Severely obese)'
    } else if(bmi>=40) {
        return 'Obese Class III (Very severely obese)'
    }
}

console.log(calculateBmi(180, 74))
