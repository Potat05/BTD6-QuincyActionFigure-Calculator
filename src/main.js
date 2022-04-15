
import { Difficulty } from "./difficulty.js";
import { QuincyActionFigure } from "./quincyActionFigure.js";



const calculator = document.querySelector('#calculator');

const inputDifficulty = calculator.querySelector('#inputDifficulty');
const inputRounds = calculator.querySelector('#inputRounds');
const inputSell = calculator.querySelector('#inputSell');

const outputText = calculator.querySelector('#output');

function updateCalculator() {

    const difficulty = Difficulty.convertDifficulty(inputDifficulty.value);
    const rounds = parseInt(inputRounds.value);
    const doSell = inputSell.checked;

    const output = QuincyActionFigure.calcActionFigure(rounds, {
        difficulty: difficulty,
        sell: doSell
    });

    const outputString = Math.floor(output).toLocaleString(undefined, {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    });

    outputText.innerText = outputString;
}

inputDifficulty.addEventListener('change', updateCalculator);
inputRounds.addEventListener('change', updateCalculator);
inputSell.addEventListener('change', updateCalculator);

updateCalculator();