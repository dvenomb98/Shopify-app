
import { conditionsData } from "@/consts/data";
import React, { FC } from "react";
import InternalLink from "../atoms/InternalLink";
import Container from "../layouts/Container";
import FooterContact from "./FooterContact";

export const boxClasses = "flex flex-col gap-5";
export const iconClasses = "w-8 h-8";
export const boxUlClasses = "flex flex-col gap-4"
export const headerClasses = "font-bold text-h4"

const Footer: FC = () => {

  return (
    <footer className="bg-neutral-graylight3 pt-16">
      <Container className="flex gap-32 sm:flex-col sm:gap-10">
      <FooterContact />
      <div className={boxClasses}>
        <h4 className={headerClasses}>Vše o nákupu</h4>
        <ul className={boxUlClasses}>
          {conditionsData.map(({label, href}) => (
            <InternalLink href={href}>
            <li>{label}</li>
            </InternalLink>
          ))}

        </ul>
      </div>
      <div className={boxClasses}>
        <h4 className={headerClasses}>O nás</h4>
        <ul className={boxUlClasses}>
            <InternalLink href={"/kontakt"}>
            <li>Kontakt</li>
            </InternalLink>
        </ul>
      </div>
      </Container>
      <Container>
      <p className= "text-center text-sm py-5 mt-5 border-t border-default-color">Copyright © 2023 Daniel Bílek</p>
      </Container>
    </footer>
  );
};

export default Footer;
