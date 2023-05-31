import React from "react";
import { GameEvent } from "../types.ts";
import "../styles/PlayerCard.css";

export interface PlayerCardProps {
    playerNumber: number;
    playerIdeas?: GameEvent[];
    playerCounters?: GameEvent[]
}

export const PlayerCard: React.FC<PlayerCardProps> = ({playerNumber}) => {
    return (
        <section className="playerCard">
            <article>Proyect Manager {playerNumber + 1}</article>
        </section>
    );
}
