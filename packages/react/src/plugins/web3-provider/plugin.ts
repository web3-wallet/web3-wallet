import type {
  BaseProvider,
  Networkish,
  Web3Provider,
} from '@ethersproject/providers';
import { useMemo } from 'react';

import type { CreatePlugin, Plugin, PluginName } from '../../types';
import { useImportWeb3Provider } from './useImportWeb3Provider';

const _name = '@web3-wallet/plugin-web3-provider-react';
export const name = _name as PluginName<typeof _name>;

export type Api = {
  hooks: {
    useProvider: <T extends BaseProvider = Web3Provider>(
      network?: Networkish,
    ) => T | undefined;
  };
};

export const create: CreatePlugin<undefined, Api> = () => {
  const createApi: Plugin<Api>['createApi'] = ({ wallet }) => {
    const { useIsConnected, useChainId, $getProvider } = wallet;

    const useProvider = <T extends BaseProvider = Web3Provider>(
      network?: Networkish,
    ) => {
      const isConnected = useIsConnected();
      const chainId = useChainId();
      const ImportedWeb3Provider = useImportWeb3Provider();

      return useMemo(() => {
        // to ensure connectors remain fresh, we condition re-renders
        // when ImportedWeb3Provider isConnected, chainId changed
        void isConnected && chainId;
        const provider = $getProvider();

        if (ImportedWeb3Provider && provider) {
          return new ImportedWeb3Provider(provider, network) as unknown as T;
        }

        return undefined;
      }, [ImportedWeb3Provider, isConnected, chainId, network]);
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
