import { Position } from "../types.ts";

export function isAdjacent(pos1: Position, pos2: Position) {
    return getAdjacents(pos1).some(({i, j}) => i === pos2.i && j === pos2.j);
}

export function getAdjacents(position: Position) {
    let adjacentCells: Position[] = [
        {i: position.i, j: position.j - 1},
        {i: position.i, j: position.j + 1},
        {i: position.i + 1, j: position.j},
        {i: position.i + 1, j: position.j + 1},
        {i: position.i - 1, j: position.j},
        {i: position.i - 1, j: position.j + 1},
    ];
    if (position.i % 2 === 1) {
        adjacentCells = adjacentCells
            .slice(2)
            .map(({i, j}) => ({i, j: j - 1}))
            .concat(adjacentCells.slice(0, 2));
    }
    return adjacentCells;
}
