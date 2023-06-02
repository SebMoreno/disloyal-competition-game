import React from "react";
import { GameEvent } from "../types.ts";
import "../styles/PlayerCard.css";

export interface PlayerCardProps {
    playerNumber: number;
    isCurrent: boolean;
    movements: number;
    playerIdeas?: GameEvent[];
    playerCounters?: GameEvent[];
}

export const PlayerCard: React.FC<PlayerCardProps> = ({playerNumber, isCurrent, movements}) => {
    return (
        <section className={"playerCard" + (isCurrent ? " highlight" : "")}>
            <article>Proyect Manager {playerNumber + 1}</article>
            <article>Movements Remaining {movements}</article>
        </section>
    );
}
