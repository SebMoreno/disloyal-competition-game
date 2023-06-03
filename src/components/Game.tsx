import React, { useRef, useState } from "react";
import { createInitialBoard } from "../services/createInitialBoard.ts";
import {
    Cell,
    creatureDistribution,
    Entity,
    GameConstants,
    GameFases,
    isInstanceOfTicket,
    Position,
    Ticket,
} from "../types.ts";
import { Board } from "./Board.tsx";
import { usePlayers } from "../hooks/usePlayers.ts";
import { PlayerCard } from "./PlayerCard.tsx";
import "../styles/Game.css";

interface GameProps {
    numOfPlayers: number;
    ticketsPerPlayer: number;
    initialPipelines: number;
    askForEntity: (entities: Entity[]) => Entity;
    onGameOver: () => void;
}

export const Game: React.FC<GameProps> = ({
                                              numOfPlayers,
                                              ticketsPerPlayer,
                                              initialPipelines,
                                              askForEntity,
                                              onGameOver
                                          }) => {
    const tickets = useRef(ticketsPerPlayer * numOfPlayers);
    const pipelines = useRef(initialPipelines);
    const entityToMove = useRef<Entity | null>(null);
    const playerMovements = useRef<number>(GameConstants.playerMovementsPerTurn);
    const {currentPlayer, nextTurn, players} = usePlayers(numOfPlayers);
    const [cells, setCells] = useState(createInitialBoard);
    const [fase, setFase] = useState(GameFases.ticketPlacement);
    const [fromCell, setFromCell] = useState<Position | null>(null);

    function handleCellSelected(position: Position) {
        const newCells: Cell[][] = structuredClone(cells);
        const cell = newCells[position.i][position.j];
        switch (fase) {
            case GameFases.ticketPlacement:
                if (tickets.current > 0
                    && cell.type === "sprintDay"
                    && cell.content.length === 0) {
                    cell.content.push({name: "ticket" + currentPlayer as Ticket, movements: GameConstants.ticketMovements});
                    tickets.current--;
                    nextTurn();
                }
                if (tickets.current === 0) {
                    setFase(GameFases.pipelinePlacement);
                }
                break;
            case GameFases.pipelinePlacement:
                if (pipelines.current > 0
                    && cell.type === "production"
                    && cell.content.length === 0) {
                    cell.content.push({name: "pipeline", movements: creatureDistribution.pipeline.movements});
                    pipelines.current--;
                    nextTurn();
                }
                if (pipelines.current === 0) {
                    setFase(GameFases.selectMoveFromCell);
                }
                break;
            case GameFases.selectMoveFromCell:
                if (cell.content.length > 0) {
                    // if (creatureToMove.current === null
                    //     && cell.content.some(entity => entity.name === `feature${currentPlayer}` && entity.movements > 0)) {
                    //     creatureToMove.current = askForEntity(cell.content.filter(entity => isInstanceOfCreature(entity.name)));
                    // } else if () {
                    //
                    // }
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
                        setFase(GameFases.sprintDayEnds);
                    }
                    setFromCell(null);
                    entityToMove.current = null;
                }
                break;
            case GameFases.sprintDayEnds:
                if (cell.type === currentSprint.current && cell.event) {
                    if (cell.event.type === "instant") {
                        switch (cell.event.entity) {
                            case EntityName.boat:
                                const features = cell.content.filter(entity => isInstanceOfTicket(entity.name));
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
                    } else {
                        // TODO give the counter or the idea to the player
                    }
                    cell.type = "production";
                    nextTurn();
                    setFase(GameFases.selectMoveFromCell);
                }
                break;
        }
        setCells(newCells);
    }

    return <div className="game">
        {Array(numOfPlayers).fill(null).map((_, i) => <PlayerCard
            key={i}
            playerNumber={i}
            isCurrent={currentPlayer === i}
        />)}
        <h1 style={{color: "darkcyan", zIndex: 9, position: "absolute", left: 300}}>Player {currentPlayer}</h1>
        <h1 style={{color: "darkcyan", zIndex: 9, position: "absolute", left: 300, top: "3rem"}}>Fase {fase}</h1>
        <Board cells={cells} onCellSelected={handleCellSelected}/>
    </div>;
};
