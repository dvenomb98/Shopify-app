import React, { FC } from "react";

interface PriceProps {
  amount: string | number;
}

const Price: FC<PriceProps> = ({ amount }) => {
  if (!amount) return null;

  const parsedPrice = parseFloat(amount as string);

  return <span>{parsedPrice} Kč</span>;
};

export default Price;
