
import React, { FC } from "react";
import { Button } from "./Button";

interface CounterProps {
	value: number;
    maxValue: number
    minValue: number
    addCount: () => void
    decreaseCount: () => void
	allowRemove?: boolean
}

const buttonClass = "w-fit px-5"

const Counter: FC<CounterProps> = ({ value, maxValue, minValue, addCount, decreaseCount, allowRemove }) => {

const disableIncrement = maxValue <= value
const disableDecrement = allowRemove ? undefined : minValue >= value

	return (
		<div className="flex gap-4 items-center">
			<Button onClick={addCount} disabled={disableIncrement} variant="secondary" size="small" className={buttonClass}>+</Button>
			<span className="font-medium">{value}</span>
			<Button onClick={decreaseCount} disabled={disableDecrement} variant="secondary" size="small" className={buttonClass}>-</Button>
		</div>
	);
};

export default Counter;
