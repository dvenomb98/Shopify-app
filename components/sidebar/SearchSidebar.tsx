
import { URLS } from "@/consts/globals";
import { CollectionsNavbar } from "@/types/types";
import { useRouter } from "next/router";

import React, { FC } from "react";

import InternalLink from "../atoms/InternalLink";
import Container from "../layouts/Container";

interface SearchSidebarProps {
  collections: CollectionsNavbar[]
}

const SearchSidebar: FC<SearchSidebarProps> = ({ collections }) => {

  const {query} = useRouter()

  if(!collections?.length) return null


  return (
    <nav className="bg-neutral-graylight3 shadow-inner">
    <Container role="navigation">
      <ul className="flex items-center p-5 overflow-x-auto hide-scrollbar w-full">
        {collections.map((collection) => {
          const { title, slug } = collection;
         const isActive = query?.slug === slug

          return (
            <InternalLink
              href={`${URLS.CATEGORY}/${slug}`}
              removeClassNames
              key={title}
            >
              <div className="relative">
                <span className="px-5">
                  {title}
                </span>
                {!!isActive && <hr className="w-full border-2 border-primary-black absolute top-[2.35rem]" />}
              </div>
            </InternalLink>
          );
        })}
      </ul>
    </Container>
    </nav>
  );
};

export default SearchSidebar;
