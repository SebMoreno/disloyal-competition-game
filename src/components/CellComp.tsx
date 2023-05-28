import React, { useCallback, useEffect, useState } from "react";
import "../styles/Cell.css";
import { Cell, Position } from "../types";
import { HexagonSVG } from "./HexagonSVG.tsx";

interface CellProps {
    cell: Cell;
    height: number;
    position: Position;
    onSelected: (position: Position) => void;
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
    const [highlight, setHighlight] = useState<boolean>(Boolean(cell.isHighlighted));
    const [highlightOnHover, setHighlightOnHover] = useState<boolean>(Boolean(cell.isHighlighted));
    const width = height * aspectRatio;
    const handleClick: React.MouseEventHandler<HTMLDivElement> = useCallback(() => onSelected(position), [onSelected, position]);

    useEffect(() => {
        if (cell.isHighlighted === undefined) {
            setHighlightOnHover(true);
            setHighlight(false);
        } else {
            setHighlightOnHover(false);
            setHighlight(cell.isHighlighted);
        }
    }, [cell]);
    if (cell.type === "none") {
        return <div className="cell">
            <HexagonSVG height={height} width={width} fill={colors[cell.type]}/>
        </div>;
    }
    return (
        <div className={"cell" + (highlight ? " highlight" : "")}
             onClick={handleClick}
             onMouseOver={highlightOnHover ? (() => setHighlight(true)) : undefined}
             onMouseLeave={highlightOnHover ? (() => setHighlight(false)) : undefined}>
            <HexagonSVG height={height} width={width} fill={colors[cell.type]}/>
            <div className="cell_content">
                {cell.content.map((e, i) => <div key={i} className={e}/>)}
            </div>
        </div>
    );
};
