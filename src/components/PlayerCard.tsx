import React from "react";
import { ProjectManager } from "../types.ts";
import "../styles/PlayerCard.css";

export interface PlayerCardProps {
    player: ProjectManager;
    isCurrent: boolean;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({player, isCurrent}) => {
    return (
        <section
            className={"playerCard" + (isCurrent ? " highlight" : "")}
            style={{
                backgroundColor: `var(--color-player${player.id})`,
                "--card-color": `var(--color-player${player.id})`
            } as React.CSSProperties & { "--card-color": string }}>
            <article>Proyect Manager {player.id + 1}</article>
        </section>
    );
}
