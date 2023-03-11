import slugify from "slugify";

export const createSlug = (title: string): string => {
  const slug = slugify(title, {
    lower: true,
    remove: /[*+~.()'"!:@]/g,
    locale: 'cs',
  });

  return slug;
};