import { difficulties } from "../logic/difficulty";




    const generateOperation = (difficulty) => {
    const difficultyy = difficulties[difficulty];
    //const mode = modes[mode];
    const operations = difficultyy.operations;
        const operation = operations[Math.floor(Math.random() * operations.length)];
        let num1 = Math.floor(Math.random() * difficultyy.maxNumber) + 1;
        let num2 = Math.floor(Math.random() * difficultyy.maxNumber) + 1;

        if(operation === '/'){
            num1 = Math.floor(Math.random() * difficultyy.maxNumber) + 1;
            num2 = Math.floor(Math.random() * difficultyy.maxNumber) + 1;
        }

        if (operation === '/' && num2 > num1) {
            [num1, num2] = [num2, num1];
        }

        const result = calculate(num1, num2, operation);
        return { expression: `${num1} ${operation} ${num2}`, result };
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
