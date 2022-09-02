import type { Web3Provider } from '@ethersproject/providers';
import { useEffect, useMemo, useState } from 'react';

/**
 * Only try to import @ethersproject/providers once
 */
let flag = false;

let DynamicProvider: typeof Web3Provider | undefined;
async function importProvider(): Promise<typeof Web3Provider | undefined> {
  if (flag) return DynamicProvider;

  flag = true;
  try {
    const m = await import('@ethersproject/providers');
    DynamicProvider = m.Web3Provider;
  } catch {
    console.debug('@ethersproject/providers not available');
  }
}

export const useImportWeb3Provider = (): typeof Web3Provider | undefined => {
  const [loaded, setLoaded] = useState(DynamicProvider !== undefined);

  useEffect(() => {
    if (loaded) return;
    let stale = false;
    void importProvider().then(() => {
      if (stale) return;
      setLoaded(true);
    });
    return () => {
      stale = true;
    };
  }, [loaded]);

  return useMemo(() => {
    return DynamicProvider;
  }, [loaded]);
};
