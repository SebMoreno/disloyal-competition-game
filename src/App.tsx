import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { Board } from "./components/Board.tsx";
import { createInitialBoard } from "./services/createInitialBoard.ts";
import { Cell, Entity, GameFases } from "./types.ts";

export const App: React.FC = () => {
    const players = useRef<number>(0);
    const features = useRef<number>(0);
    const [cells, setCells] = useState(createInitialBoard);
    const [fase, setFase] = useState(GameFases.setup);

    function handleCellSelected(i: number, j: number) {
        const newCells: Cell[][] = structuredClone(cells);
        const cell = newCells[i][j];
        if (fase === GameFases.placement
            && cell.type.includes("sprint")
            && cell.content.length === 0) {
            cell.content.push("feature" + (features.current-- % players.current) as Entity);
        }
        if (features.current === 0) {
            setFase(GameFases.movement);
        }
        setCells(newCells);
    }

    function handleFaseChange() {
        switch (fase) {
            case GameFases.setup:
                players.current = parseInt(prompt("How many players?") ?? "0");
                if (isNaN(players.current)) {
                    players.current = 4;
                }
                features.current = Math.floor(40 / players.current) * players.current;
                setFase(GameFases.placement);
                break;
        }
    }

    useEffect(handleFaseChange, [fase]);


    return <Board cells={cells} onCellSelected={handleCellSelected}/>;
};
