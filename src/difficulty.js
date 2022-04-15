
export class Difficulty {

    static easy = 0;
    static medium = 1;
    static hard = 2;
    static impoppable = 3;

    static difficulties = {
        0: 'easy',
        1: 'medium',
        2: 'hard',
        3: 'impoppable',

        'easy': 0,
        'medium': 1,
        'hard': 2,
        'impoppable': 3,
    };

    static startRounds = {
        0: 1,
        1: 1,
        2: 3,
        3: 6
    };

    static getStartRound(difficulty=Difficulty.medium) {
        return Difficulty.startRounds[difficulty];
    }

    static convertDifficulty(difficulty) {
        if(typeof difficulty == 'string') difficulty = difficulty.toLowerCase();
        return Difficulty.difficulties[difficulty];
    }

    static costsMul = [
        0.85,
        1,
        1.08,
        1.20
    ];

    /**
     * 
     * @param {Number} cost 
     * @param {Number} difficulty 
     * @param {{round: null|Function, roundToNearest: Number}} param2 
     * @returns 
     */
    static calcCost(cost, difficulty=Difficulty.medium, { round=Math.floor, roundToNearest=1 } = {}) {
        if(typeof cost != "number") {
            console.error('Cannot calculate cost of', cost);
            return undefined;
        }

        let costDif = cost * Difficulty.costsMul[difficulty];

        
        if(!round) return costDif;

        return round(costDif / roundToNearest) * roundToNearest;
        
    }

}
