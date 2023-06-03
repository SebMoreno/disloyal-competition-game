export enum GameConstants {
    numOfPlayers = 6,
    ticketsPerPlayer = 6,
    initialPipelines = 8
}

export enum GameFases {
    "ticketPlacement" = "ticketPlacement",
    "pipelinePlacement" = "pipelinePlacement",
    "selectMoveFromCell" = "selectMoveFromCell",
    "moveToCell" = "moveToCell",
    "sprintDayEnds" = "sprintDayEnds"
}

export const creatureDistribution = {
    pipeline: {
        name: "pipeline",
        movements: 3,
        ammount: 6,
    },
    testSuite: {
        name: "testSuite",
        movements: 2,
        ammount: 18,
    },
    withdrawer: {
        name: "withdrawer",
        movements: 1,
        ammount: 8,
    }
} as const;

export const cellColors: Record<Cell["type"], string> = {
    sprintDay: "#a95aa1",
    production: "#28498d",
    safe: "#9acd32",
    none: "transparent"
};

export type ConsecutiveNumbers<N extends number, T extends unknown[] = []> = T['length'] extends N
    ? T[number]
    : ConsecutiveNumbers<N, [...T, T['length']]>;

export type Ticket<Players extends number = GameConstants.numOfPlayers> = `ticket${ConsecutiveNumbers<Players>}`;
export type Creature = "pipeline" | "withdrawer" | "testSuite";

export interface Entity {
    name: Ticket | Creature;
    movements: number;
}

export interface Cell {
    type: "sprintDay" | "production" | "safe" | "none";
    content: Entity[];
    event?: Creature;
    isHighlighted?: boolean;
}

export interface Position {
    i: number;
    j: number;
}

export interface ProjectManager {
    id: ConsecutiveNumbers<GameConstants.numOfPlayers>;
    ticketsWithdrawn: number;
    techDebt: number;
}


export function isInstanceOfCreature(value: any): value is Creature {
    return typeof value === "string"
        && (value === "pipeline" || value === "withdrawer" || value === "testSuite");
}

export function isInstanceOfTicket<N extends number = GameConstants.numOfPlayers>(
    value: any,
    numOfPlayers = GameConstants.numOfPlayers
): value is Ticket<N> {
    const ticketNumber = parseInt(value.substring(6));
    return typeof value === "string"
        && value.substring(0, 6) === "ticket"
        && !isNaN(ticketNumber)
        && ticketNumber < numOfPlayers;
}
