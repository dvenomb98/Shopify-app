import useMobileWidth from "@/hooks/useMobile";
import classNames from "classnames";
import React, { FC, useState } from "react";
import { layoutClasses } from "./PageLayout";

interface NavLayoutProps {
  children: React.ReactNode;
}

const NavLayout: FC<NavLayoutProps> = ({ children }) => {

   
  return (
    <div className={classNames("sm:sticky bg-primary-white sm:top-0 sm:z-50")}>
      <nav className={classNames(layoutClasses, "flex justify-between py-8")}>
        {children}
      </nav>
    </div>
  );
};

export default NavLayout;
