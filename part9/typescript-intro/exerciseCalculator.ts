interface Result { 
    periodLength: number
    trainingDays: number
    success: boolean
    rating: number
    ratingDescription: string
    target: number
    average: number
}
const calculateExercises = (training:Array<number>,target: number):Result=> {
    let trainedDays = training.filter(n => n>=target)
    let rating = Math.ceil(training.reduce((a,r) => a+r,0)/7)
    const ratingMapping : {[key:number]:string} = {
        1 : 'good days are ahead, keep training', 
        2 : 'not too bad but could be better',
        3 : 'keep training, best is yet to come',
        4 : 'push harder, just few more laps!!!',
        5 : 'great workout, take some timeoff?'
    }
    
    return { 
        periodLength: training.length,
        trainingDays: training.filter(n => n>0).length,
        success: training.every(n => n>=target),
        rating,
        ratingDescription: ratingMapping[rating],
        target,
        average: trainedDays.reduce((a,r) => a+r,0)/training.length 
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1],2))