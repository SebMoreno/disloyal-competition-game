import { useCallback, useRef, useState } from "react";
import { GameConstants, ProjectManager } from "../types.ts";

export function usePlayers(numOfPlayers: number) {
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [players, setPlayers] = useState<ProjectManager[]>(
        () => Array(numOfPlayers).fill(null).map((_, id) => ({
            id,
            ticketsWithdrawn: 0,
            techDebt: 0
        } as ProjectManager))
    );
    const playerMovements = useRef<number>(GameConstants.playerMovementsPerTurn);
    const nextTurn = useCallback(
        () => setCurrentPlayer(prevPlayer => {
            playerMovements.current = 3;
            return ++prevPlayer % numOfPlayers
        }),
        [numOfPlayers]
    );
    return {currentPlayer, nextTurn, playerMovements, players} as const;
}
