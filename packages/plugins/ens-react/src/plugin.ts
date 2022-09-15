import type {
  AsyncFetchResult,
  CreatePlugin,
  Plugin,
  PluginName,
} from '@web3-wallet/react';
import { useMemo } from 'react';

import { useEnsNames } from './useEnsNames';

const _name = '@web3-wallet/plugin-ens-react';
export const name = _name as PluginName<typeof _name>;

export type Api = {
  hooks: {
    useEnsNames: () => AsyncFetchResult<(string | undefined)[]>;
    useEnsName: () => AsyncFetchResult<string | undefined>;
  };
};

export const create: CreatePlugin<undefined, Api> = () => {
  const createApi: Plugin<Api>['createApi'] = ({ wallet }) => {
    const { useProvider, useAccounts, useAccount } = wallet;

    const useEnsName: Api['hooks']['useEnsName'] = () => {
      const provider = useProvider();
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
        useEnsNames: () => useEnsNames(useProvider(), useAccounts()),
        useEnsName,
      },
    };
  };

  return {
    name,
    createApi,
  };
};
