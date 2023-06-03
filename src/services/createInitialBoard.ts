import { Cell, Creature, creatureDistribution, Entity, Helper } from "../types.ts";
import game from "./gameElements.json";
import { shuffleArray } from "./shuffleArray.ts";


export function createInitialBoard(): Cell[][] {
    const board = game.board as Cell[][];
    const numOfEntities = Object.values(creatureDistribution).reduce((acc, {ammount}) => acc + ammount, 0);
    const nullEntities = Array(Math.max(board.flat().filter(cell => cell.type === "sprintDay").length - numOfEntities, 0)).fill(null);
    const entities = shuffleArray(Object.values(creatureDistribution)
        .reduce(
            (accEntities, {name, ammount, movements}) =>
                accEntities.concat(Array(ammount).fill({name, movements})),
            [] as Entity[]
        ).concat(nullEntities));

    let j = entities.length;
    for (const row of board) {
        for (let i = 0; i < row.length; i++) {
            if (row[i].type === "sprintDay" && j > 0) {
                row[i].event = entities[--j]?.name as Creature | Helper;
            }
        }
    }
    return board;
}
