import type {
  AsyncFetchResult,
  CreatePlugin,
  Plugin,
  PluginName,
} from '@web3-wallet/react';
import { useMemo } from 'react';

import { useBalances } from './useBalances';

const _name = '@web3-wallet/plugin-balance-react';
export const name = _name as PluginName<typeof _name>;

export type Api = {
  hooks: {
    useBalances: (
      precision?: number,
    ) => AsyncFetchResult<(number | undefined)[]>;
    useBalance: (precision?: number) => AsyncFetchResult<number | undefined>;
  };
};

export const create: CreatePlugin<undefined, Api> = () => {
  const createApi: Plugin<Api>['createApi'] = ({ wallet }) => {
    const { useProvider, useAccounts, useAccount } = wallet;

    const useBalance: Api['hooks']['useBalance'] = (precision) => {
      const provider = useProvider();
      const account = useAccount();
      const accounts = useMemo(
        () => (account === undefined ? [] : [account]),
        [account],
      );

      const { data, ...rest } = useBalances(provider, accounts, precision);
      return {
        ...rest,
        data: data?.[0],
      };
    };

    return {
      hooks: {
        useBalances: (precision) =>
          useBalances(useProvider(), useAccounts(), precision),
        useBalance,
      },
    };
  };

  return {
    name,
    createApi,
  };
};
