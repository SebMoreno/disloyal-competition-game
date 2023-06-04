import React, { useRef, useState } from "react";
import { createInitialBoard } from "../services/createInitialBoard.ts";
import {
    Cell,
    creatureDistribution,
    Entity,
    GameConstants,
    GameFases,
    isInstanceOfCreature,
    Position,
    Ticket,
} from "../types.ts";
import { Board } from "./Board.tsx";
import { usePlayers } from "../hooks/usePlayers.ts";
import { PlayerCard } from "./PlayerCard.tsx";
import "../styles/Game.css";
import { highlightAdjacentCells, removeHighlight } from "../services/highlightService.ts";
import { isAdjacent } from "../services/hexMatrixService.ts";
import { restartMovements } from "../services/restartMovements.ts";
import { DebugModal } from "./DebugModal.tsx";

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
        const isMovingCreature = useRef<boolean>(false);
        const entitiesToMove = useRef<Entity[]>([]);
        const {currentPlayer, nextTurn, playerMovements, players} = usePlayers(numOfPlayers);
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
                        cell.content.push({
                            name: "ticket" + currentPlayer as Ticket,
                            movements: GameConstants.ticketMovements
                        });
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
                    let canMove = false;
                    if (cell.content.length > 0) {
                        if (isMovingCreature.current) {
                            const creaturesInCell = cell.content.filter(entity => isInstanceOfCreature(entity.name) && entity.movements > 0);
                            if (creaturesInCell.length) {
                                entitiesToMove.current = [creaturesInCell[0]];
                                canMove = true;
                            }
                        } else {
                            const playerTickets = cell.content.filter(entity => entity.name === `ticket${currentPlayer}` && entity.movements > 0);
                            const pipelinesInCell = cell.content.filter(entity => entity.name === "pipeline" && entity.movements > 0);
                            canMove = true;
                            if (playerTickets.length && pipelinesInCell.length) {
                                entitiesToMove.current = cell.content;
                            } else if (playerTickets.length) {
                                entitiesToMove.current = [playerTickets[0]];
                            } else if (pipelinesInCell.length) {
                                entitiesToMove.current = [pipelinesInCell[0]];
                            } else {
                                canMove = false;
                            }
                        }
                    }
                    if (canMove) {
                        cell.isHighlighted = true;
                        setFromCell(position);
                        setFase(GameFases.moveToCell);
                        highlightAdjacentCells(newCells, position);
                    }
                    break;
                case GameFases.moveToCell:
                    if (fromCell && entitiesToMove.current.length && isAdjacent(fromCell, position)) {
                        const currentFromCell = newCells[fromCell.i][fromCell.j];
                        for (const entity of entitiesToMove.current) {
                            const entityIndex = currentFromCell.content
                                .findIndex(e => e.name === entity.name && e.movements === entity.movements);
                            currentFromCell.content.splice(entityIndex, 1);
                        }
                        entitiesToMove.current.forEach(entity => entity.movements--);
                        cell.content.push(...entitiesToMove.current);
                        playerMovements.current--;
                        removeHighlight(newCells);
                        if (isMovingCreature.current) {
                            if (entitiesToMove.current[0].movements > 0) {
                                setFromCell(position);
                                setFase(GameFases.moveToCell);
                            } else {
                                entitiesToMove.current = [];
                                isMovingCreature.current = false;
                                setFromCell(null);
                                setFase(GameFases.sprintDayEnds);
                                restartMovements(newCells);
                            }
                        } else {
                            setFase(GameFases.selectMoveFromCell);
                            setFromCell(null);
                            entitiesToMove.current = [];
                            if (playerMovements.current === 0
                                || (playerMovements.current > 0
                                    && !newCells.flat()
                                        .flatMap(cell => cell.content)
                                        .some(entity =>
                                            (entity.name === `ticket${currentPlayer}` || entity.name === "pipeline")
                                            && entity.movements > 0
                                        ))
                            ) {
                                isMovingCreature.current = true;
                                restartMovements(newCells);
                            }
                        }
                    }
                    break;
                case GameFases.sprintDayEnds:
                    if (cell.type === "sprintDay") {
                        if (cell.event) {
                            cell.content.push({
                                name: cell.event,
                                movements: creatureDistribution[cell.event].movements
                            });
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
            {players.map((player, i) =>
                <PlayerCard
                    key={i}
                    player={player}
                    isCurrent={currentPlayer === i}
                />
            )}
            <DebugModal
                currentPlayer={currentPlayer}
                fase={fase}
                playerMovements={playerMovements.current}
                isMovingCreature={isMovingCreature.current}
                fromCell={fromCell}
            />
            <Board cells={cells} onCellSelected={handleCellSelected}/>
        </div>;
    }
;
