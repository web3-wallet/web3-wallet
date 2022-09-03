import type { DetailedHTMLProps, HTMLAttributes } from 'react';

export type BoxProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
export const Box = (props: BoxProps) => {
  return <div {...props} />;
};
