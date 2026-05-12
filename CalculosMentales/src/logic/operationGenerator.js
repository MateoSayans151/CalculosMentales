import { difficulties } from "./difficulty";
import { modes } from "./modes";

    const difficulty = difficulties[difficulty];
    const mode = modes[mode];
    const operations = difficulty.operations;


    const generateOperation = (difficulty) => {
        const operation = difficulty.operations[Math.floor(Math.random() * difficulty.operations.length)];
        const num1 = Math.floor(Math.random() * difficulty.maxNumber) + 1;
        const num2 = Math.floor(Math.random() * difficulty.maxNumber) + 1;

        if(operation === '/'){
            num1 = Math.floor(Math.random() * difficulty.maxNumber) + 1;
            num2 = Math.floor(Math.random() * difficulty.maxNumber) + 1;
        }

        if (operation === '/' && num2 > num1) {
            [num1, num2] = [num2, num1];
        }

        result = calculate(num1, num2, operation);
        return {'${num1} ${operation} ${num2}': result};
    }

    const calculate = (num1, num2, operation) => {
        switch(operation) {
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            case '*':
                return num1 * num2;
            case '/':
                return num1 / num2;
        };
    };
    export { generateOperation };