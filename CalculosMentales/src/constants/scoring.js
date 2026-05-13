import { modes } from "../logic/modes";
import { points } from "../logic/points";

const calculatePoints = (timeUsed,timeLimit,isCorrect) => {
    if(!isCorrect && timeUsed > timeLimit){
        return points.noAnswer;
    }
    if(!isCorrect){
        return points.incorrect;
    }
    const timeDifference = timeUsed / timeLimit;

    if(timeDifference <= 0.75)
        return points.fCorrect;

    return points.tCorrect;


}
export { calculatePoints };