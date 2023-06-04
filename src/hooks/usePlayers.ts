import { useCallback, useRef, useState } from "react";
import { Cell, GameConstants, ProjectManager } from "../types.ts";
import { getTechDebt } from "../services/getTechDebt.ts";

export function usePlayers(numOfPlayers: number) {
    const playerMovements = useRef<number>(GameConstants.playerMovementsPerTurn);
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [players, setPlayers] = useState<ProjectManager[]>(
        () => Array(numOfPlayers).fill(null).map((_, id) => ({
            id,
            ticketsWithdrawn: 0,
            techDebt: 0
        } as ProjectManager))
    );
    const updateTechDebt = (cells: Cell[][]) => {
        const newPlayers: ProjectManager[] = structuredClone(players);
        const player = newPlayers.find(player => player.id === currentPlayer)!;
        player.techDebt = 0;
        for (let i = 0; i < cells.length; i++) {
            for (let j = 0; j < cells[i].length; j++) {
                const cell = cells[i][j];
                const playerTickets = cell.content.filter(entity => entity.name === `ticket${currentPlayer}`);
                player.techDebt += getTechDebt({i, j}) * playerTickets.length;
            }
        }
        player.techDebt += player.ticketsWithdrawn * GameConstants.maxTechDebt;
        setPlayers(newPlayers);
    };
    const nextTurn = useCallback(
        () => setCurrentPlayer(prevPlayer => {
            playerMovements.current = 3;
            return ++prevPlayer % numOfPlayers
        }),
        [numOfPlayers]
    );
    return {currentPlayer, nextTurn, playerMovements, players, updateTechDebt} as const;
}
