
import { CollectionsNavbar } from "@/types/types";
import { useRouter } from "next/router";

import React, { FC } from "react";
import { Collection } from "shopify-buy";

import InternalLink from "../atoms/InternalLink";
import Container from "../layouts/Container";

interface SearchSidebarProps {
  collections: CollectionsNavbar[]
}

const SearchSidebar: FC<SearchSidebarProps> = ({ collections }) => {

  const {query} = useRouter()

  if(!collections?.length) return null


  return (
    <Container role="navigation" className="border-default-color border-b">
      <ul className="flex font-medium items-center py-5 overflow-x-auto hide-scrollbar w-full ">
        {collections.map((collection) => {
          const { title, handle } = collection;
         const isActive = query?.collection === handle

          return (
            <InternalLink
              href={`/${handle}`}
              removeClassNames
              key={title}
            >
              <div className="relative">
                <span className="px-5">
                  {title}
                </span>
                {!!isActive && <hr className="w-full border-2 border-neutral-black absolute top-[2.7rem]" />}
              </div>
            </InternalLink>
          );
        })}
      </ul>
    </Container>
  );
};

export default SearchSidebar;
