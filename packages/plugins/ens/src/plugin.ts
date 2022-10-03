import type {
  AsyncFetchResult,
  CreatePlugin,
  Plugin,
  PluginApi,
  PluginName,
  Wallet,
} from '@web3-wallet/react';
import { useMemo } from 'react';

import { useEnsNames } from './useEnsNames';

const _name = '@web3-wallet/plugin-ens';
export const name = _name as PluginName<typeof _name>;

export interface Api extends PluginApi {
  hooks: {
    useEnsNames: (
      network?: Parameters<Wallet['useProvider']>[0],
    ) => AsyncFetchResult<(string | undefined)[]>;
    useEnsName: (
      network?: Parameters<Wallet['useProvider']>[0],
    ) => AsyncFetchResult<string | undefined>;
  };
}

export const create: CreatePlugin<never, Api> = (network) => {
  const createApi: Plugin<Api>['createApi'] = ({ wallet }) => {
    const { useProvider, useAccounts, useAccount } = wallet;

    const useEnsName: Api['hooks']['useEnsName'] = () => {
      const provider = useProvider(network);
      const account = useAccount();
      const accounts = useMemo(
        () => (account === undefined ? [] : [account]),
        [account],
      );

      const { data, ...rest } = useEnsNames(provider, accounts);
      return {
        ...rest,
        data: data?.[0],
      };
    };

    return {
      hooks: {
        useEnsNames: (network) => {
          const provider = useProvider(network);
          const accounts = useAccounts();
          return useEnsNames(provider, accounts);
        },
        useEnsName,
      },
    };
  };

  return {
    name,
    createApi,
  };
};
