import { Position } from "../types.ts";

export function isAdjacent(pos1: Position, pos2: Position) {
    let adjacentCells: Position[] = [
        {i: pos1.i, j: pos1.j - 1},
        {i: pos1.i, j: pos1.j + 1},
        {i: pos1.i + 1, j: pos1.j},
        {i: pos1.i + 1, j: pos1.j + 1},
        {i: pos1.i - 1, j: pos1.j},
        {i: pos1.i - 1, j: pos1.j + 1},
    ];
    if (pos1.i % 2 === 1) {
        adjacentCells = adjacentCells
            .slice(2)
            .map(({i, j}) => ({i, j: j - 1}))
            .concat(adjacentCells.slice(0, 2));
    }
    return adjacentCells.some(({i, j}) => i === pos2.i && j === pos2.j);
}
