export type Post = {
  title: string;
  date: string;
  categories: Array<string>;
  link: string;
  image: string;
  author: string;
  style?: Record<string, unknown>;
};
