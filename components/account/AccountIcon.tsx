import { UserIcon } from "@heroicons/react/24/outline";
import React from "react";

const AccountIcon = () => {
  return (
    <button aria-roledescription="account">
      <UserIcon className="w-6 h-6 hover:opacity-70 transition ease-in-out font-bold cursor-pointer" />
    </button>
  );
};

export default AccountIcon;
