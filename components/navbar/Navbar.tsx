import useMobileWidth from "@/hooks/useMobile";
import React from "react";
import NavLink from "../atoms/NavLink";
import NavLayout from "../layouts/NavLayout";
import Cart from "../Cart/Cart";
import AccountIcon from "../account/AccountIcon";
import { Bars3BottomRightIcon } from "@heroicons/react/20/solid";
import { navbarData } from "@/consts/data";


const Navbar = () => {
  const { isMobile } = useMobileWidth();

  return (
    <NavLayout>
      <h1 className="font-bold">LOGO</h1>

      {!isMobile ? (
        <ul className="flex gap-5 items-center">
          {navbarData.map(({ title, href }) => (
            <NavLink key={title} href={href} title={title} />
          ))}
          <Cart />
          <AccountIcon />
        </ul>
      ) : (
        <div className="flex gap-5">
          <AccountIcon />
          <Cart />
          <button aria-roledescription="menu" role="menubar">
            <Bars3BottomRightIcon className="w-6 h-6" />
          </button>
        </div>
      )}
    </NavLayout>
  );
};

export default Navbar;

