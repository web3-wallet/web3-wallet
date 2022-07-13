type AccountProps = {
  account?: string;
  leadingChars?: number;
  tailingChars?: number;
};

export const Account = ({
  account: address,
  leadingChars = 2,
  tailingChars = 4,
}: AccountProps) => {
  if (!address) return null;

  return (
    <div>
      {address.slice(0, leadingChars)}...{address.slice(-tailingChars)}
    </div>
  );
};
