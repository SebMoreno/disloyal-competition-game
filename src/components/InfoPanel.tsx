import React from "react";
import "../styles/InfoPanel.css";
import { GameFases } from "../types.ts";

interface InfoPanelProps {
    currentPlayer: number;
    fase: GameFases;
    playerMovements: number;
    isMovingCreature: boolean;
}

const phaseLabels = {
    [GameFases.ticketPlacement]: "Put a ticket in the sprint!",
    [GameFases.pipelinePlacement]: "Put a pipeline!",
    [GameFases.selectMoveFromCell]: "Choose a ticket or a pipeline to move!",
    [GameFases.moveToCell]: "Chose a new place to put the ticket or pipeline!",
    [GameFases.sprintDayEnds]: "A Sprint day is over, choose which day!",
    movingCreature: "Move a test or a withdrawer, keep them away from you but close to your enemies!"
}

export const InfoPanel: React.FC<InfoPanelProps> = ({
                                                        currentPlayer,
                                                        fase,
                                                        playerMovements,
                                                        isMovingCreature
                                                    }) => {
    return (
        <section className="info">
            <h1>Info</h1>
            <p>Turn: Proyect Manager {currentPlayer + 1}</p>
            {playerMovements > 0 && fase === GameFases.selectMoveFromCell &&
                <p>Move {playerMovements} more tickets or pipelines!</p>}
            <p>Phase: {phaseLabels[isMovingCreature ? "movingCreature" : fase]}</p>
        </section>
    );
};
