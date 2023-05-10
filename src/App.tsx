import React from "react";
import "./App.css";
import { Board } from "./components/Board.tsx";

export const App: React.FC = () => (
    <Board rows={12} cols={12}/>
);
