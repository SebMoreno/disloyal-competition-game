import React from "react";
import "../styles/Cell.css";
import { Cell } from "../types";
import { HexagonSVG } from "./HexagonSVG.tsx";

interface CellProps {
    cell: Cell;
    height: number;
}

const colors: Record<Cell["type"], string> = {
    sprint1: "#f4a460",
    sprint2: "#228b22",
    sprint3: "#808080",
    production: "#28498d",
    safe: "#9acd32",
    none: "transparent",
    placeholder: "transparent"
};
const aspectRatio = 174 / 200;
export const CellComp: React.FC<CellProps> = ({ height, cell }) => {
    const width = height * aspectRatio;
    return (
        <div className="cell">
            <HexagonSVG height={height} width={width} fill={colors[cell.type]}/>
        </div>
    );
};
