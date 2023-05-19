import game from "./gameElements.json";
import {shuffleArray} from "./shuffleArray.ts";
import {Cell} from "../types";

export function createInitialBoard(): Cell[][] {

    const board = game.board as Cell[][];
    const {sprint1, sprint2, sprint3} = game.gameElements as GameElements;
    const lozas = shuffleArray(...sprint1, ...sprint2, ...sprint3);
    let i = lozas.length;
    for (const row of board) {
        for (const cell of row) {
            if (cell.type === "sprint") {
                cell.type = "sprint" + lozas[--i].sprint;
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
