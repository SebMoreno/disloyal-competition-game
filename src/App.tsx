import React, {useState} from "react";
import "./App.css";
import {Board} from "./components/Board.tsx";
import {createInitialBoard} from "./services/createInitialBoard.ts";

export const App: React.FC = () => {
    const [cells, setCells] = useState(createInitialBoard);
    return <Board cells={cells}/>
};
