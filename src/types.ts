export enum EntityName {
    "feature0" = "feature0",
    "feature1" = "feature1",
    "feature2" = "feature2",
    "feature3" = "feature3",
    "feature4" = "feature4",
    "feature5" = "feature5",
    "boat" = "boat",
    "shark" = "shark",
    "whale" = "whale",
    "monster" = "monster"
}

export interface Entity {
    name: EntityName;
    movements: number;
    passangers?: Entity[];
}

export enum GameFases {
    "featurePlacement" = "featurePlacement",
    "boatPlacement" = "boatPlacement",
    "selectMoveFromCell" = "selectMoveFromCell",
    "moveToCell" = "moveToCell",
    "sprintEnd" = "sprintEnd"
}

export type Sprint = "sprint1" | "sprint2" | "sprint3";
export type Creature = "shark" | "whale" | "monster";

export function isInstanceOfCreature(value: any): value is Creature {
    return typeof value === "string" &&
        (value === "shark" || value === "whale" || value === "monster");
}

export function isInstanceOfSprint(value: any): value is Sprint {
    return typeof value === "string" && value.includes("sprint");
}

export function isInstanceOfFeature(value: any): value is Extract<EntityName, `feature${number}`> {
    return typeof value === "string" && value.includes("feature");
}

export interface Cell {
    type: "placeholder" | "production" | "safe" | "none" | Sprint;
    content: Entity[];
    event?: GameEvent;
    isHighlighted?: boolean;
}

export interface Position {
    i: number;
    j: number;
}

export interface GameEvent {
    type: "instant" | "idea" | "counter";
    entity: EntityName | "whirlpool" | "doom" | "dolphin";
}

export interface Player {

}
