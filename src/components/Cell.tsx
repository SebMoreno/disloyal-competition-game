import React, { CSSProperties } from "react";
import "../styles/Cell.css";

interface CellProps {
    height: number;
    style?: CSSProperties;
}

const aspectRatio = 174 / 200;
export const Cell: React.FC<CellProps> = ({height}) => {
    const width = height * aspectRatio;
    return (
        <svg version="1.1"
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 174 200"
             height={height}
             width={width}
             className="cell">
            <path fill="#28498d"
                  d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"/>
        </svg>
    );
};
