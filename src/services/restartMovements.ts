import { Cell, creatureDistribution, GameConstants, isInstanceOfTicket } from "../types.ts";

export function restartMovements(cells: Cell[][]) {
    cells
        .flat()
        .flatMap(cell => cell.content)
        .forEach(entity =>
            entity.movements = isInstanceOfTicket(entity.name)
                ? GameConstants.playerMovementsPerTurn
                : creatureDistribution[entity.name].movements
        );
}
