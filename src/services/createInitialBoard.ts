import { Cell } from "../types";
import game from "./gameElements.json";
import { shuffleArray } from "./shuffleArray.ts";

export function createInitialBoard(): Cell[][] {
    const board = game.board as Cell[][];
    const sprintCells = shuffleArray(...game.sprintCells) as Cell[];
    let j = sprintCells.length;
    for (const row of board) {
        for (let i = 0; i < row.length; i++) {
            if (row[i].type === "placeholder") {
                row[i] = sprintCells[--j];
            }
        }
    }
    return board;
}

/*
-- Arena
r counter tiburon
r monstruo
r tele tiburon
r tele ballena
r tele barco
r tele barco
v barco
r delfin
r delfin
r delfin
v ballena
v ballena
v ballena
v tiburon
v tiburon
v tiburon

-- Bosque
r counter ballena
r counter ballena
r counter tiburon
r monstruo
r tele tiburon
r tele ballena
r delfin
v barco
v barco
v barco
v tiburon
v tiburon
v ballena
v ballena
v remolino
v remolino

-- Roca
r counter tiburon
r counter ballena
v tiburon
v remolino
v remolino
v remolino
v remolino
v volcan
*/
