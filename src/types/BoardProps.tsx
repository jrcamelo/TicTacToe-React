import { SquareType } from "./SquareType";

export interface BoardProps {
    squares: SquareType[];
    onClick(i: number): void;
}