export type Entity = "feature" | "boat" | "shark" | "whale" | "monster";

export interface Cell {
    type: "placeholder" | "production" | "safe" | "none" | "sprint1" | "sprint2" | "sprint3";
    content: Entity[];
    event?: GameEvent;
}

export interface GameEvent {
    type: "instant" | "idea" | "counter";
    entity: Entity | "whirlpool" | "doom" | "dolphin";
}
