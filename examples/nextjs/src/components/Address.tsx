import { forwardRef, Ref } from 'react';

export type AddressProps = {
  address: string;
  leadingChars?: number;
  tailingChars?: number;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const Address = forwardRef(
  (
    { address, leadingChars = 2, tailingChars = 4, ...rest }: AddressProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    if (!address) return null;

    return (
      <div ref={ref} {...rest}>
        {address.slice(0, leadingChars)}...{address.slice(-tailingChars)}
      </div>
    );
  },
);
