import React, { useRef, useState } from "react";
import { createInitialBoard } from "../services/createInitialBoard.ts";
import { Cell, Entity, GameFases } from "../types.ts";
import { Board } from "./Board.tsx";
import { usePlayer } from "../hooks/usePlayer.ts";

interface GameProps {
    players: number;
    maxBoats: number;
    maxFeatures: number;
}

export const Game: React.FC<GameProps> = ({maxBoats, maxFeatures, players}) => {
    const features = useRef(Math.floor(maxFeatures / players) * players);
    const boats = useRef(maxBoats);
    const {currentPlayer, nextTurn} = usePlayer(players);
    const [cells, setCells] = useState(createInitialBoard);
    const [fase, setFase] = useState(GameFases.featurePlacement);

    function handleCellSelected(i: number, j: number) {
        const newCells: Cell[][] = structuredClone(cells);
        const cell = newCells[i][j];
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
                    setFase(GameFases.movement);
                }
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
        <h1>{currentPlayer}</h1>
    </div>;
};
