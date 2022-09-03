type AccountProps = {
  account?: string;
  leadingChars?: number;
  tailingChars?: number;
};

export const Account = ({
  account: address,
  leadingChars = 4,
  tailingChars = 4,
}: AccountProps) => {
  if (!address) return null;

  return (
    <span>
      {address.slice(0, leadingChars)}...{address.slice(-tailingChars)}
    </span>
  );
};
