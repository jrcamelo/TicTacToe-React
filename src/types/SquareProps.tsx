import { SquareType } from "./SquareType";

export interface SquareProps {
    value: SquareType;
    onClick(): void;
}
