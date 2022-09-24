export type TOCItem = {
  id: string;
  content: string;
  indent: number;
};

export type TOC = TOCItem[];
export type Docs = {
  content: string;
  toc: TOC;
};
