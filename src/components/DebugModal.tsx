import React from "react";
import { GameFases, Position } from "../types.ts";

interface DebugModalProps {
    currentPlayer: number;
    fase: GameFases;
    playerMovements: number;
    isMovingCreature: boolean;
    fromCell: Position | null;
}

export const DebugModal: React.FC<DebugModalProps> = ({
                                                          currentPlayer,
                                                          fase,
                                                          playerMovements,
                                                          isMovingCreature,
                                                          fromCell
                                                      }) => {
    return (
        <div style={{
            position: "absolute",
            color: "darkcyan",
            zIndex: 9,
            fontSize: 25,
            left: 10,
            background: "rgba(0,0,0,0.8)",
            margin: "-35px 0",
        }}>
            <p style={{position: "relative"}}>Player {currentPlayer}</p>
            <p style={{position: "relative"}}>Fase {fase}</p>
            <p style={{position: "relative"}}>MovementsRemaining {playerMovements}</p>
            <p style={{position: "relative"}}>Is moving creature: {String(isMovingCreature)}</p>
            <p style={{position: "relative"}}>Moving
                from: {fromCell ? `{i: ${fromCell.i}, j: ${fromCell.j}}` : "null"}</p>
        </div>
    );
};
