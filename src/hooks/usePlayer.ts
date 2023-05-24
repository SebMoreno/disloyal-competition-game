import { useCallback, useState } from "react";

export function usePlayer(players: number) {
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const nextTurn = useCallback(
        () => setCurrentPlayer(prevPlayer => ++prevPlayer % players),
        [players]
    );
    return {currentPlayer, nextTurn} as const;
}
