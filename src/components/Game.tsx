import React, { useRef, useState } from "react";
import { createInitialBoard } from "../services/createInitialBoard.ts";
import { Cell, Entity, GameFases, Position } from "../types.ts";
import { Board } from "./Board.tsx";
import { usePlayer } from "../hooks/usePlayer.ts";

interface GameProps {
    players: number;
    maxBoats: number;
    maxFeatures: number;
    askForEntity: (entities: Entity[]) => Entity;
}

export const Game: React.FC<GameProps> = ({maxBoats, maxFeatures, players, askForEntity}) => {
    const features = useRef(Math.floor(maxFeatures / players) * players);
    const boats = useRef(maxBoats);
    const {currentPlayer, nextTurn} = usePlayer(players);
    const [cells, setCells] = useState(createInitialBoard);
    const [fase, setFase] = useState(GameFases.featurePlacement);
    const [fromCell, setFromCell] = useState<Position | null>(null);
    const [entityToMove, setEntityToMove] = useState<Entity | null>(null);

    function handleCellSelected(position: Position) {
        const newCells: Cell[][] = structuredClone(cells);
        const cell = newCells[position.i][position.j];
        switch (fase) {
            case GameFases.featurePlacement:
                if (features.current > 0
                    && cell.type.includes("sprint")
                    && cell.content.length === 0) {
                    cell.content.push("feature" + currentPlayer as Entity);
                    features.current--;
                    nextTurn();
                }
                if (features.current === 0) {
                    setFase(GameFases.boatPlacement);
                }
                break;
            case GameFases.boatPlacement:
                if (boats.current > 0
                    && cell.type === "production"
                    && cell.content.length === 0) {
                    cell.content.push(Entity.boat);
                    boats.current--;
                    nextTurn();
                }
                if (boats.current === 0) {
                    setFase(GameFases.selectMoveFromCell);
                }
                break;
            case GameFases.selectMoveFromCell:
                if (cell.content.length > 0) {
                    cell.isHighlighted = true;
                    setFromCell(position);
                    setEntityToMove(askForEntity(cell.content));
                    setFase(GameFases.moveToCell);
                }
                break;
            case GameFases.moveToCell:
                const currentFromCell = newCells[fromCell!.i][fromCell!.j];
                const entityIndex = currentFromCell.content.findLastIndex(entity => entity === entityToMove);
                currentFromCell.content.splice(entityIndex, 1);
                cell.content.push(entityToMove!);
                setFase(GameFases.selectMoveFromCell);
                delete currentFromCell.isHighlighted;
                break;
        }
        setCells(newCells);
    }

    /*
        function handleFaseChange() {
            switch (fase) {
                case GameFases.setup:
                    setFase(GameFases.placement);
                    break;
                case GameFases.movement:
                    break;
            }
        }

        useEffect(handleFaseChange, [fase, players, maxFeatures]);
    */

    return <div>
        <Board cells={cells} onCellSelected={handleCellSelected}/>
    </div>;
};
