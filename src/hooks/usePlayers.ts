import { useCallback, useRef, useState } from "react";

export function usePlayers(players: number) {
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const playerMovements = useRef(3);
    const nextTurn = useCallback(
        () => setCurrentPlayer(prevPlayer => {
            playerMovements.current = 3;
            return ++prevPlayer % players
        }),
        [players]
    );
    return {currentPlayer, nextTurn, playerMovements} as const;
}
