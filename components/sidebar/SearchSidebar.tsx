import useMobileWidth from "@/hooks/useMobile";
import React, { FC } from "react";
import { Collection } from "shopify-buy";
import Alert from "../atoms/Alert";
import InternalLink from "../atoms/InternalLink";

interface SearchSidebarProps {
  collections: Collection[];
}

const SearchSidebar: FC<SearchSidebarProps> = ({ collections }) => {

  if(!collections?.length) {
    return (
    <aside className="sm:w-full lg:basis-1/5 flex flex-col gap-5">
      <h2 className="text-h2 font-bold">Kategorie</h2>
      <Alert variant="info">Nenalezeny žádné kategorie</Alert>
    </aside>  
    )
  }


  return (
    <aside className="sm:w-full lg:basis-1/5 flex flex-col gap-5">
      <h2 className="text-h2 font-bold">Kategorie</h2>
      <div className="flex flex-col gap-5 sm:grid sm:grid-cols-2 sm:grid-rows-auto">
        {collections.map((collection) => {
          const { title, handle } = collection;
          const products = collection?.products || [];
          const itemCount = products.length;

          return (
            <InternalLink
              href={`/${handle}`}
              removeClassNames
              className="group"
            >
              <div className="flex justify-between border-b border-default-color pb-2 w-full">
                <span className="group-hover:underline transition ease-in-out">
                  {title}
                </span>
                {!!itemCount && (
                  <span className="text-neutral-gray">{`(${itemCount})`}</span>
                )}
              </div>
            </InternalLink>
          );
        })}
      </div>
    </aside>
  );
};

export default SearchSidebar;
