import { useIsMounted } from '@site/hooks';

export type NoSSRProps = {
  children: React.ReactNode;
  ssrPlaceholder?: React.ReactNode;
};

export const NoSSR = ({ children, ssrPlaceholder }: NoSSRProps) => {
  const isMounted = useIsMounted();

  if (isMounted) return <>{children}</>;

  return <>{ssrPlaceholder}</>;
};
