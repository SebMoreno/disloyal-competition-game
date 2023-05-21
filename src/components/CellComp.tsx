import React from "react";
import "../styles/Cell.css";
import { Cell } from "../types";

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
        <svg
            viewBox="0 0 174 200"
            height={height}
            width={width}
            className="cell">
            <path fill={colors[cell.type]}
                  d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"/>
        </svg>
    );
};
