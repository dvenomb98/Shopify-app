import classNames from "classnames";
import React, { FC } from "react";

interface PriceProps {
  amount: string | number;
  className?: string
}

const Price: FC<PriceProps> = ({ amount, className }) => {
  if (!amount) return null;

  const parsedPrice = parseFloat(amount as string);

  return <span className={classNames("whitespace-nowrap", className)}>{parsedPrice} Kč</span>;
};

export default Price;
