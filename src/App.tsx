import { Game } from "./components/Game.tsx";
import React from "react";
import { Entity } from "./types.ts";

function askForEntity(entities: Entity[]): Entity {
    if (entities.length === 0) {
        throw new Error("No entities to choose from");
    }
    return entities[0];
}

export const App: React.FC = () => {
    return <Game players={4} maxFeatures={40} maxBoats={8} askForEntity={askForEntity}/>;
};
