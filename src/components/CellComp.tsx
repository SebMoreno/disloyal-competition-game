import React, { useCallback, useState } from "react";
import "../styles/Cell.css";
import { Cell } from "../types";
import { HexagonSVG } from "./HexagonSVG.tsx";

interface CellProps {
    cell: Cell;
    height: number;
    position: { i: number, j: number };
    onSelected: (i: number, j: number) => void;
    isHighlighted?: boolean;
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


export const CellComp: React.FC<CellProps> = ({height, cell, onSelected, position}) => {
    const [highlight, setHighlight] = useState(cell.isHighlighted);
    const width = height * aspectRatio;
    const handleClick: React.MouseEventHandler<HTMLDivElement> = useCallback(() => {
        onSelected(position.i, position.j);
    }, [onSelected, position]);

    if (cell.type === "none") {
        return <div className="cell">
            <HexagonSVG height={height} width={width} fill={colors[cell.type]}/>
        </div>;
    }
    return (
        <div className={"cell" + (highlight ? " highlight" : "")}
             onClick={handleClick}
             onMouseOver={cell.isHighlighted === undefined ? (() => setHighlight(true)) : undefined}
             onMouseLeave={cell.isHighlighted === undefined ? (() => setHighlight(false)) : undefined}>
            <HexagonSVG height={height} width={width} fill={colors[cell.type]}/>
            <div className="cell_content">
                {cell.content.map((e, i) => <div key={i} className={e}/>)}
            </div>
        </div>
    );
};
