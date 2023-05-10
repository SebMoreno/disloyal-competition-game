import React from "react";
import "../styles/Board.css";
import { Cell } from "./Cell.tsx";

interface BoardProps {
    rows: number;
    cols: number;
    cellHeight?: number;
    containerHeight?: number;
}

export const Board: React.FC<BoardProps> = ({
                                                rows,
                                                cols,
                                                containerHeight = window.innerHeight,
                                                cellHeight = containerHeight / rows * 1.25
                                            }) => {
    const cells = [];
    for (let i = 0; i < rows; i++) {
        cells.push(
            Array(cols).fill(null).map((_, j) =>
                <Cell
                    style={{filter: "drop-shadow(rgba(255, 255, 255, 0.5) 0px 0px 10px)"}}
                    key={"" + i + j}
                    height={cellHeight}/>
            )
        );

    }
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
                    {row}
                </div>)
            }
        </main>
    );
};
