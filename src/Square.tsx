import React from "react";
import { SquareProps } from "./types/SquareProps";

const Square: React.FC<SquareProps> = props => {
	return (
		<button className="square" onClick={props.onClick}>
			{props.value}
		</button>
	);
};

export default Square;