import { Game } from "./components/Game.tsx";
import React from "react";

export const App: React.FC = () => {
    return <Game players={4} maxFeatures={40} maxBoats={8}/>;
};
