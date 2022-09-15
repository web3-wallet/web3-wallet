import type { WalletState } from '@web3-wallet/core';
import { useMemo } from 'react';

import type { CreatePlugin, Plugin, PluginName } from '../../types';

const _name = '@web3-wallet/plugin-core-hooks-react';
export const name = _name as PluginName<typeof _name>;

export type Api = {
  hooks: {
    useIsConnecting: () => WalletState['isConnecting'];
    useChainId: () => WalletState['chainId'];
    useAccounts: () => WalletState['accounts'];
    useAccount: () => string | undefined;
    useIsConnected: () => boolean;
  };
};

const computeIsConnected = ({
  chainId,
  accounts,
  isConnecting,
}: Pick<WalletState, 'chainId' | 'accounts' | 'isConnecting'>) => {
  return Boolean(chainId && accounts?.length && !isConnecting);
};

const ACCOUNTS_EQUALITY_CHECKER: (
  a: WalletState['accounts'],
  b: WalletState['accounts'],
) => boolean = (oldAccounts, newAccounts) => {
  if (oldAccounts === undefined && newAccounts === undefined) return true;
  if (oldAccounts === undefined && newAccounts !== undefined) return false;
  if (oldAccounts !== undefined && newAccounts === undefined) return false;
  if (oldAccounts?.length !== newAccounts?.length) return false;

  return !!oldAccounts?.every(
    (oldAccount, i) => oldAccount === newAccounts?.[i],
  );
};

export const create: CreatePlugin<undefined, Api> = () => {
  const createApi: Plugin<Api>['createApi'] = ({ wallet }) => {
    const { $getStore } = wallet;

    const useStore = $getStore();

    const useIsConnecting: Api['hooks']['useIsConnecting'] = () => {
      return useStore((s) => s.isConnecting);
    };

    const useChainId: Api['hooks']['useChainId'] = () => {
      return useStore((s) => s.chainId);
    };

    const useAccounts: Api['hooks']['useAccounts'] = () => {
      return useStore((s) => s.accounts, ACCOUNTS_EQUALITY_CHECKER);
    };

    const useIsConnected: Api['hooks']['useIsConnected'] = () => {
      const isConnecting = useIsConnecting();
      const chainId = useChainId();
      const accounts = useAccounts();

      return useMemo(
        () =>
          computeIsConnected({
            isConnecting,
            chainId,
            accounts,
          }),
        [isConnecting, chainId, accounts],
      );
    };

    const useAccount: Api['hooks']['useAccount'] = () => {
      return useAccounts()?.[0];
    };

    return {
      hooks: {
        useIsConnecting,
        useChainId,
        useAccounts,
        useIsConnected,
        useAccount,
      },
    };
  };

  return {
    name,
    createApi,
  };
};
