export type Route = {
  label: string;
  slug: string[];
  path: string;
  // default to 1
  indent?: number;
  // default to false
  isHidden?: boolean;
};
