import {
  type BaseProvider,
  type Networkish,
  Web3Provider,
} from '@ethersproject/providers';
import { useMemo } from 'react';

import type { CreatePlugin, Plugin, PluginApi, PluginName } from '../../types';

const _name = '@web3-wallet/plugin-web3-provider';
export const name = _name as PluginName<typeof _name>;

export interface Api extends PluginApi {
  hooks: {
    useProvider: <T extends BaseProvider = Web3Provider>(
      network?: Networkish,
    ) => T | undefined;
  };
}

export const create: CreatePlugin<undefined, Api> = () => {
  const createApi: Plugin<Api>['createApi'] = ({ wallet }) => {
    const { useAccount, useChainId, $getProvider } = wallet;

    const useProvider = <T extends BaseProvider = Web3Provider>(
      network?: Networkish,
    ) => {
      const account = useAccount();
      const chainId = useChainId();

      return useMemo(() => {
        // to ensure connectors remain fresh, we condition re-renders
        // when ImportedWeb3Provider account, chainId changed
        void account && chainId;
        const provider = $getProvider();

        if (provider) {
          return new Web3Provider(provider, network) as unknown as T;
        }

        return undefined;
      }, [account, chainId, network]);
    };

    return {
      hooks: {
        useProvider,
      },
    };
  };

  return {
    name,
    createApi,
  };
};
