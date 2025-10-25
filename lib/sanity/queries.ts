import { groq } from 'next-sanity';

export const problemsQuery = groq`
  *[_type == "problem"] | order(order asc) {
    _id,
    title,
    description,
    icon,
    image,
    order
  }
`;

export const solutionsQuery = groq`
  *[_type == "solution"] | order(order asc) {
    _id,
    title,
    description,
    detailedContent,
    icon,
    image,
    category,
    order
  }
`;

export const solutionsByCategoryQuery = groq`
  *[_type == "solution" && category == $category] | order(order asc) {
    _id,
    title,
    description,
    detailedContent,
    icon,
    image,
    category,
    order
  }
`;
