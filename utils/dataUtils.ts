import { Collection } from "@/types/types";

export const parseNavCollection = (collections: Collection[]) => {
  return collections.map(({ title, slug }) => {
    return { title, slug };
  });
};


