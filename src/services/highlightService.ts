import { isAdjacent } from "./hexMatrixService.ts";
import { Cell, Position } from "../types.ts";


export function highlightAdjacentCells(newCells: Cell[][], position: Position) {
    for (let i = 0; i < newCells.length; i++) {
        for (let j = 0; j < newCells[i].length; j++) {
            if (isAdjacent(position, {i, j})) {
                newCells[i][j].isHighlighted = true;
            }
        }
    }
}


export function removeHighlight(newCells: Cell[][]) {
    for (const row of newCells) {
        for (const cell of row) {
            delete cell.isHighlighted;
        }
    }
}
