import React from "react";
import "../styles/Board.css";
import { Cell, Position } from "../types.ts";
import { CellComp } from "./CellComp.tsx";

interface BoardProps {
    cells: Cell[][];
    containerHeight?: number;
    cellHeight?: number;
    onCellSelected: (position: Position) => void;
}

export const Board: React.FC<BoardProps> = ({
                                                cells,
                                                containerHeight = window.innerHeight,
                                                cellHeight = containerHeight / cells.length * 1.25,
                                                onCellSelected
                                            }) => {
    return (
        <main className="board">
            {cells.map((row, i) =>
                <div
                    style={{
                        height: cellHeight,
                        top: cellHeight * i * 0.77,
                        left: i % 2 === 0 ? cellHeight * 0.435 : 0
                    }}
                    className="row"
                    key={i}>
                    {row.map((cell, j) =>
                        <CellComp
                            onSelected={onCellSelected}
                            position={{i, j}}
                            cell={cell}
                            key={i + j}
                            height={cellHeight}/>
                    )}
                </div>
            )}
        </main>
    );
};
