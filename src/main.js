
import { Difficulty } from "./difficulty.js";
import { QuincyActionFigure } from "./quincyActionFigure.js";



const calculator = document.querySelector('#calculator');

const inputDifficulty = calculator.querySelector('#inputDifficulty');
const inputRounds = calculator.querySelector('#inputRounds');
const inputSell = calculator.querySelector('#inputSell');
const divBetterSellDeals = calculator.querySelector('#divBetterSellDeals');
const inputBetterSellDeals = calculator.querySelector('#inputBetterSellDeals')

const outputText = calculator.querySelector('#output');

function updateCalculator() {

    // SET DIFFICULTY SELECTED
    const difficulty = Difficulty.convertDifficulty(inputDifficulty.value);
    // SET MIN ROUND
    const startRound = Difficulty.getStartRound(difficulty);
    inputRounds.min = startRound;
    inputRounds.value = Math.floor(Math.max(inputRounds.value, startRound));

    const rounds = parseInt(inputRounds.value);
    
    const doSell = inputSell.checked;
    const betterSellDeals = inputBetterSellDeals.checked;

    const output = QuincyActionFigure.calcActionFigure(rounds, {
        difficulty: difficulty,
        sell: doSell,
        betterSellDeals: betterSellDeals
    });

    const outputString = Math.floor(output).toLocaleString();

    outputText.innerText = outputString;
    outputText.title = `Cost to ${doSell ? 'sell' : 'buy'} on ${Difficulty.convertDifficulty(difficulty)} difficulty at round ${rounds}`;
    
}

inputDifficulty.addEventListener('change', updateCalculator);
inputRounds.addEventListener('change', updateCalculator);
inputSell.addEventListener('change', updateCalculator);
inputBetterSellDeals.addEventListener('change', updateCalculator);

updateCalculator();



// Auto hide/show BetterSellDeals input
function updateBetterSellDeals() {
    if(inputSell.checked) divBetterSellDeals.classList.remove('hidden');
    else divBetterSellDeals.classList.add('hidden');
}
inputSell.addEventListener('change', updateBetterSellDeals);
updateBetterSellDeals();