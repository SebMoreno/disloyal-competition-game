import { useCallback, useRef, useState } from "react";
import { Player } from "../types.ts";

export function usePlayers(numOfPlayers: number) {
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [players, setPlayers] = useState<Player[]>([{}]);
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
