import { useCallback, useRef, useState } from "react";
import { ProjectManager } from "../types.ts";

export function usePlayers(numOfPlayers: number) {
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [players, setPlayers] = useState<ProjectManager[]>([{}]);
    const playerMovements = useRef(3);
    const nextTurn = useCallback(
        () => setCurrentPlayer(prevPlayer => {
            playerMovements.current = 3;
            return ++prevPlayer % numOfPlayers
        }),
        [numOfPlayers]
    );
    return {currentPlayer, nextTurn, playerMovements, players} as const;
}
