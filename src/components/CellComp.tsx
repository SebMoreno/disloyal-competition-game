import React, { MouseEventHandler } from "react";
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


const highlightElement: MouseEventHandler<HTMLDivElement> = e => {
    e.currentTarget.classList.add("highlight");
};

const unHighlightElement: MouseEventHandler<HTMLDivElement> = e => {
    e.currentTarget.classList.remove("highlight");
};
export const CellComp: React.FC<CellProps> = ({ height, cell }) => {
    const width = height * aspectRatio;
    if (cell.type === "none") {
        return <div className="cell">
            <HexagonSVG height={height} width={width} fill={colors[cell.type]}/>
        </div>;
    }
    const handleClick: React.MouseEventHandler<HTMLDivElement> = e => {
        console.log(e);
    };
    return (
        <div className="cell"
             onClick={handleClick}
             onMouseOver={highlightElement}
             onMouseLeave={unHighlightElement}>
            <HexagonSVG height={height} width={width} fill={colors[cell.type]}/>
            <div className="cell_content">
                {cell.content.map((e, i) => <div key={i} className={e}/>)}
            </div>
        </div>
    );
};
