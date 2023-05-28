export enum Entity {
    "feature0" = "feature0",
    "feature1" = "feature1",
    "feature2" = "feature2",
    "feature3" = "feature3",
    "feature4" = "feature4",
    "feature5" = "feature5",
    "boat" = "boat",
    "shark" = "shark",
    "whale" = "whale",
    "demon" = "demon"
}

export enum GameFases {
    "featurePlacement",
    "boatPlacement",
    "selectMoveFromCell",
    "moveToCell",
    "sprintEnd"
}

export interface Cell {
    type: "placeholder" | "production" | "safe" | "none" | "sprint1" | "sprint2" | "sprint3";
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
    entity: Entity | "whirlpool" | "doom" | "dolphin";
}
