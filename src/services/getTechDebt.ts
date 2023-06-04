import { Cell, Position, safePositions } from "../types.ts";
import { getAdjacents } from "./hexMatrixService.ts";


function getKey(position: Position): `${number},${number}` {
    return `${position.i},${position.j}`;
}

const techDebts: { [key: `${number},${number}`]: number } = {
    "4,1": 3,
    "4,2": 4,
    "5,2": 4,
    "5,0": 4,
    "4,3": 5,
    "5,3": 5,
    "6,2": 5,
    "6,1": 5,
    "2,10": 1,
    "2,9": 2,
    "0,8": 3,
    "2,8": 3,
    "4,9": 3,
    "4,10": 3,
    "0,7": 4,
    "2,7": 4,
    "4,8": 4,
    "5,9": 4,
    "5,11": 4,
    "0,6": 5,
    "2,6": 5,
    "4,7": 5,
    "5,8": 5,
    "6,8": 5,
    "6,9": 5,
    "6,10": 5,
    "8,1": 3,
    "8,2": 4,
    "7,2": 4,
    "7,0": 4,
    "8,3": 5,
    "7,3": 5,
    "10,10": 1,
    "10,9": 2,
    "8,10": 3,
    "8,9": 3,
    "10,8": 3,
    "12,8": 3,
    "7,11": 4,
    "7,9": 4,
    "8,8": 4,
    "10,7": 4,
    "12,7": 4,
    "7,8": 5,
    "8,7": 5,
    "10,6": 5,
    "12,6": 5,
    "4,4": 6,
    "5,4": 6,
    "6,3": 6,
    "7,4": 6,
    "8,4": 6,
    "4,6": 6,
    "5,7": 6,
    "6,7": 6,
    "7,7": 6,
    "8,6": 6,
    "4,5": 7,
    "5,5": 7,
    "6,4": 7,
    "7,5": 7,
    "8,5": 7,
    "7,6": 7,
    "6,6": 7,
    "5,6": 7,
    "6,5": 8
}

export function getTechDebt(position: Position, cells: Cell[][] = [[]]) {
    const tentative = Math.min(...safePositions.map(safePosition => {
        let dist = Math.abs(safePosition.i - position.i) + Math.abs(safePosition.j - position.j)
        if (position.i % 2 === 1 && position.i !== safePosition.i) {
            dist--;
        }
        return dist;
    }));
    const saved = techDebts[getKey(position)];
    return saved ?? tentative;
    return Math.min(...safePositions.map(safePosition => {
        let dist = Math.abs(safePosition.i - position.i) + Math.abs(safePosition.j - position.j)
        if (position.i % 2 === 1 && position.i !== safePosition.i) {
            dist--;
        }
        return dist;
    }));

    let currentDist = 0;
    for (let safePosition of safePositions) {
        let adjacents = getAdjacents(safePosition).filter(position => cells[position.i][position.j].type !== "none");
        while (adjacents.length) {
            currentDist++;
            const newAdjacents = [];
            for (let adjacent of adjacents) {
                techDebts[getKey(adjacent)] = Math.min(currentDist, techDebts[getKey(adjacent)] ?? Infinity);
                newAdjacents.push(...getAdjacents(adjacent))
            }
            adjacents = newAdjacents.filter(position => cells[position.i][position.j].type !== "none");
        }
        break;
    }
    return techDebts[getKey(position)];
    return techDebts[getKey(position)] = Math.min(...safePositions.map(safePosition => {
        return Math.abs(safePosition.i - position.i) + Math.abs(safePosition.j - position.j);
        const adjacents = getAdjacents(safePosition).filter(position => cells[position.i][position.j].type !== "none");
        for (let i = 0; i < adjacents.length; i++) {

        }
        return 0;
    }));
}
