import React from "react";
import { GameEvent } from "../types.ts";
import "../styles/PlayerCard.css";

export interface PlayerCardProps {
    playerNumber: number;
    isCurrent: boolean;
    playerIdeas?: GameEvent[];
    playerCounters?: GameEvent[];
}

export const PlayerCard: React.FC<PlayerCardProps> = ({playerNumber, isCurrent}) => {
    return (
        <section className={"playerCard" + (isCurrent ? " highlight" : "")}>
            <article>Proyect Manager {playerNumber + 1}</article>
        </section>
    );
}
