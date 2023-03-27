import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import React, { FC } from "react";

const ArrowBack: FC = () => {
  const { back } = useRouter();
  return (
    <button onClick={back} className="w-fit items-center flex gap-2 group">
      <ArrowLeftIcon className="w-5 h-5" />
      <span className="group-hover:underline">Vrátit se zpět</span>
    </button>
  );
};

export default ArrowBack;
