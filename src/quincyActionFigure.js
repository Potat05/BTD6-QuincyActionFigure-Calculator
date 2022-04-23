
/*

    Quincy action figure calculator
    
    TODO:
        Add base cost to selling.
        Make estimate better.

*/

import { Difficulty } from "./difficulty.js";

export class QuincyActionFigure {
    
    static getBasePriceForDifficulty(difficulty=Difficulty.medium) {
        // Doesn't work. (Cost is 810 on hard and impoppable?)
        // const baseCost = Difficulty.calcCost(
        //     750,
        //     difficulty,
        //     { round: Math.floor, roundToNearest: 5 }
        // );
        return [
            635, 750, 810, 810
        ][difficulty];
    }

    static sellPercent = 0.95;

    static calcActionFigure(rounds=20, { difficulty=Difficulty.medium, sell=false } = {}) {

        const baseCost = QuincyActionFigure.getBasePriceForDifficulty(difficulty);
        const startRound = Difficulty.getStartRound(difficulty);

        let val = baseCost;

        
        // For some reason easy is different?
        if(difficulty != Difficulty.easy) {
            // This starts to break at round 150+ (Good enough.)
            const per1 = 110 / 100; const cap1 = 31;
            const per2 = 105 / 100; const cap2 = 81;
            const per3 = 102 / 100;
            val *=     (per1 ** (Math.min(rounds, cap1) - startRound))
             * Math.max(per2 ** (Math.min(rounds, cap2) - cap1), 1)
             * Math.max(per3 ** (rounds - cap2), 1);
        } else {
            for(let i=startRound; i < rounds; i++) {
    
                if(i < 31) {
                    val *= 1.1;
                } else if(i < 81) {
                    val *= 1.05;
                } else {
                    val *= 1.02;
                }
    
                val -= 0.1;
                val = Math.round(val);
                
            }
        }

        // Round to nearest 5, And add 10mil cap
        const final = v => Math.min(Math.round(Math.round(v) / 5) * 5, 10_000_000);

        if(!sell) return final(val);
        return final(val * QuincyActionFigure.sellPercent);
        
    }

}
