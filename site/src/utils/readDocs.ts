import type { Docs } from '@site/types/Docs';
import type { PathLike } from 'fs';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import toc from 'markdown-toc';
import { readFile } from 'node:fs/promises';

type OriginToc = {
  highest: number;
  json: {
    content: string;
    slug: string;
    lvl: number;
  }[];
};

export const readDocs = async (filePath: PathLike): Promise<Docs> => {
  const content = await readFile(filePath, 'utf-8');
  const { json, highest } = toc(content) as OriginToc;

  return {
    content,
    toc: json
      /**
       * exclude h1
       */
      .filter((v) => v.lvl !== highest)
      .map(({ content, lvl, slug }) => ({
        id: slug,
        indent: lvl - highest,
        content,
      })),
  };
};
