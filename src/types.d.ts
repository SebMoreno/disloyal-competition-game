export interface Cell {
    type: "sprint" | "production" | "safe" | "none";
    content: Entity[];
    event: GameEvent;
}


export interface Entity {
    type: "player" | "enemy" | "none";
}

export interface GameEvent {
    type: "instant" | "idea" | "counter";
    entity: "boat" | "shark" | "whale" | "monster" | "dolfin" | "whirlpool" | "doom";
    sprint: 1 | 2 | 3;
}

export interface GameElements {
    sprint1: GameEvent[];
    sprint2: GameEvent[];
    sprint3: GameEvent[];
}
