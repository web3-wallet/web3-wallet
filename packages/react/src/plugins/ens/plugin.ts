import { useMemo } from 'react';

import type { CreatePlugin, Plugin, PluginName } from '../../plugin';
import { useENS } from './useENS';

const _name = '@web3-wallet/plugin-ens-react';
export const name = _name as PluginName<typeof _name>;

export type Api = {
  hooks: {
    useENSNames: () => (string | undefined)[];
    useENSName: () => undefined | string;
  };
};

export const createPlugin: CreatePlugin<undefined, Api> = () => {
  const createApi: Plugin<Api>['createApi'] = ({ wallet }) => {
    const { useProvider, useAccounts, useAccount } = wallet;

    const useENSNames: Api['hooks']['useENSNames'] = () => {
      const provider = useProvider();
      const accounts = useAccounts();
      return useENS(provider, accounts);
    };

    const useENSName: Api['hooks']['useENSName'] = () => {
      const provider = useProvider();
      const account = useAccount();
      const accounts = useMemo(
        () => (account === undefined ? [] : [account]),
        [account],
      );
      return useENS(provider, accounts)?.[0];
    };

    return {
      hooks: {
        useENSNames,
        useENSName,
      },
    };
  };

  return {
    name,
    createApi,
  };
};
