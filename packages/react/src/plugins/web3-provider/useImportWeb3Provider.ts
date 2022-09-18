import type { Web3Provider } from '@ethersproject/providers';
import { useEffect, useState } from 'react';

/**
 * Only try to import @ethersproject/providers once
 *
 * Tracking wether we have already tried to imported @ethersproject/providers
 */
let tried = false;

let DynamicWeb3Provider: typeof Web3Provider | undefined;

/**
 * Dynamic import the Web3Provider
 *
 * @returns -
 *  1. resolve with the imported Web3Provider,
 *  2. or reject with undefined, if failed to imported the Web3Provider
 */
async function importWeb3Provider(): Promise<typeof Web3Provider | undefined> {
  if (tried) return DynamicWeb3Provider;

  tried = true;
  try {
    const m = await import('@ethersproject/providers');
    DynamicWeb3Provider = m.Web3Provider;
  } catch {
    console.debug('@ethersproject/providers not available');
  }

  return undefined;
}

export const useImportWeb3Provider = (): typeof Web3Provider | undefined => {
  const [loaded, setLoaded] = useState(DynamicWeb3Provider !== undefined);

  useEffect(() => {
    if (loaded) return;
    let stale = false;
    void importWeb3Provider().then(() => {
      if (stale) return;
      setLoaded(true);
    });
    return () => {
      stale = true;
    };
  }, [loaded]);

  return DynamicWeb3Provider;
};
