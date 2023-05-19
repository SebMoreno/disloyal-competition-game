import React from "react";
import "../styles/Board.css";
import {CellComp} from "./CellComp.tsx";
import {Cell} from "../types";

interface BoardProps {
    cells: Cell[][];
    containerHeight?: number;
    cellHeight?: number;
}

export const Board: React.FC<BoardProps> = ({
                                                cells,
                                                containerHeight = window.innerHeight,
                                                cellHeight = containerHeight / cells.length * 1.25
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
                            cell={cell}
                            key={i + j}
                            height={cellHeight}/>
                    )}
                </div>
            )}
        </main>
    );
};
