import { Game } from "./components/Game.tsx";
import React from "react";
import { Entity, GameConstants } from "./types.ts";

function askForEntity(entities: Entity[]): Entity {
    if (entities.length === 0) {
        throw new Error("No entities to choose from");
    }
    return entities[0];
}


export const App: React.FC = () => {
    function handleGameOver() {
        alert("Game over");
    }

    return <Game
        numOfPlayers={GameConstants.numOfPlayers}
        ticketsPerPlayer={GameConstants.ticketsPerPlayer}
        initialPipelines={GameConstants.initialPipelines}
        askForEntity={askForEntity}
        onGameOver={handleGameOver}
    />;
};
