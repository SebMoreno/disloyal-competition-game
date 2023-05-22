import React from "react";

export interface HexagonSVGProps {
    height: number;
    width: number;
    fill: React.CSSProperties["color"];
}

export const HexagonSVG: React.FC<HexagonSVGProps> = ({ height, width, fill }) =>
    <svg height={height}
         width={width}
         viewBox="0 0 174 200">
        <path fill={fill}
              d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"/>
    </svg>;
