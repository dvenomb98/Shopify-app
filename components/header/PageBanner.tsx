import Image from "next/image";
import React from "react";
import Container from "../layouts/Container";


const PageBanner = () => {
  return (
    <div className=" bg-primary-pinklight">
      <Container className="sm:p-16 lg:h-heroBanner flex items-center lg:justify-start sm:flex-col-reverse gap-10">
      
          <div className="lg:basis-1/3">
            <p className="uppercase font-medium">Bread guy</p>
            <h1 className="text-header leading-[4rem] font-bold">Pastry marshmallow gummies pastry bonbon</h1>
          </div>

          <Image
            role="banner"
            src={"/images/banner.jpg"}
            width={600}
            height={800}
            alt="banner"
          />
       
      </Container>
    </div>
  );
};

export default PageBanner;
