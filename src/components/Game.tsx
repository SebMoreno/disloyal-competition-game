import React, { useRef, useState } from "react";
import { createInitialBoard } from "../services/createInitialBoard.ts";
import {
    Cell,
    Entity,
    EntityName,
    GameFases,
    isInstanceOfFeature,
    isInstanceOfSprint,
    Position,
    Sprint
} from "../types.ts";
import { Board } from "./Board.tsx";
import { usePlayers } from "../hooks/usePlayers.ts";
import { PlayerCard } from "./PlayerCard.tsx";
import "../styles/Game.css";

interface GameProps {
    numOfPlayers: number;
    maxBoats: number;
    maxFeatures: number;
    askForEntity: (entities: Entity[]) => Entity;
    onGameOver: () => void;
}

export const Game: React.FC<GameProps> = ({maxBoats, maxFeatures, numOfPlayers, askForEntity, onGameOver}) => {
    const features = useRef(Math.floor(maxFeatures / numOfPlayers) * numOfPlayers);
    const boats = useRef(maxBoats);
    const entityToMove = useRef<Entity | null>(null);
    const currentSprint = useRef<Sprint>("sprint1");
    const {currentPlayer, nextTurn, playerMovements} = usePlayers(numOfPlayers);
    const [cells, setCells] = useState(createInitialBoard);
    const [fase, setFase] = useState(GameFases.featurePlacement);
    const [fromCell, setFromCell] = useState<Position | null>(null);

    function handleCellSelected(position: Position) {
        const newCells: Cell[][] = structuredClone(cells);
        const cell = newCells[position.i][position.j];
        switch (fase) {
            case GameFases.featurePlacement:
                if (features.current > 0
                    && isInstanceOfSprint(cell.type)
                    && cell.content.length === 0) {
                    cell.content.push({name: "feature" + currentPlayer as EntityName, movements: 3});
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
                    cell.content.push({name: EntityName.boat, movements: 3, passangers: []});
                    boats.current--;
                    nextTurn();
                }
                if (boats.current === 0) {
                    setFase(GameFases.selectMoveFromCell);
                }
                break;
            case GameFases.selectMoveFromCell:
                if (cell.content.length > 0
                    && cell.content.some(entity => isInstanceOfFeature(entity.name) && entity.movements > 0)) {
                    cell.isHighlighted = true;
                    entityToMove.current = askForEntity(cell.content);
                    setFromCell(position);
                    setFase(GameFases.moveToCell);
                }
                break;
            case GameFases.moveToCell:
                if (fromCell && entityToMove.current) {
                    const currentFromCell = newCells[fromCell.i][fromCell.j];
                    const {current: entity} = entityToMove;
                    const entityIndex = currentFromCell.content
                        .findLastIndex(e => e.name === entity.name && e.movements === entity.movements);
                    currentFromCell.content.splice(entityIndex, 1);
                    delete currentFromCell.isHighlighted;
                    entity.movements--;
                    cell.content.push(entity);
                    playerMovements.current--;
                    if (playerMovements.current > 0) {
                        setFase(GameFases.selectMoveFromCell);
                    } else {
                        setFase(GameFases.sprintEnd);
                    }
                    setFromCell(null);
                    entityToMove.current = null;
                }
                break;
            case GameFases.sprintEnd:
                if (cell.type === currentSprint.current && cell.event) {
                    if (cell.event.type === "instant") {
                        switch (cell.event.entity) {
                            case EntityName.boat:
                                const features = cell.content.filter(entity => isInstanceOfFeature(entity.name));
                                cell.content = [{
                                    name: EntityName.boat,
                                    movements: 3,
                                    passangers: features.slice(0, 3)
                                }, ...features.slice(3)];
                                break;
                            case EntityName.shark:
                                cell.content = [{name: EntityName.shark, movements: 2}]
                                break;
                            case EntityName.whale:
                                cell.content.push({name: EntityName.whale, movements: 3});
                                break;
                            case "whirlpool":
                                cell.content = [];
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
                                adjacentCells
                                    .map(pos => newCells[pos.i][pos.j])
                                    .forEach(cell => {
                                        cell.content = []
                                        cell.type = "production";
                                    });
                                break;
                            case "doom":
                                onGameOver();
                                break;
                        }
                        cell.type = "production";
                    } else {
                        // TODO give the counter or the idea to the player
                    }
                    nextTurn();
                    setFase(GameFases.selectMoveFromCell);
                }
                break;
        }
        setCells(newCells);
    }

    return <div className="game">
        {Array(numOfPlayers).fill(null).map((_, i) => <PlayerCard key={i} playerNumber={i}/>)}
        <Board cells={cells} onCellSelected={handleCellSelected}/>
    </div>;
};
