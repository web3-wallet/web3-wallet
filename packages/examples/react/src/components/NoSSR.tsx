import { useIsMounted } from '@example-react/hooks';

export type NoSSRProps = {
  children: React.ReactNode;
  ssrPlaceholder?: React.ReactNode;
};

export const NoSSR = ({ children, ssrPlaceholder }: NoSSRProps) => {
  const isMounted = useIsMounted();

  if (isMounted) return <>{children}</>;

  return <>{ssrPlaceholder}</>;
};
