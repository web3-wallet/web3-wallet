import type {
  Plugin,
  PluginName,
  Wallet,
  WrappedUseQuery,
} from '@web3-wallet/react';
import { useQuery } from '@web3-wallet/react';

const _name = '@web3-wallet/plugin-ens';
export const name = _name as PluginName<typeof _name>;

type EnsName = string | null;
type EnsNames = EnsName[];

export interface Api {
  useEnsNames: WrappedUseQuery<
    EnsNames,
    unknown,
    EnsNames,
    [network?: Parameters<Wallet['useProvider']>[0], ...rest: unknown[]]
  >;
  useEnsName: WrappedUseQuery<
    EnsName,
    unknown,
    EnsName,
    [network?: Parameters<Wallet['useProvider']>[0], ...rest: unknown[]]
  >;
}

const plugin: Plugin<Api> = ({ wallet }) => {
  const { useProvider, useAccounts, useAccount, useChainId } = wallet;

  const useEnsNames: Api['useEnsNames'] = (queryKey = [], options) => {
    const chainId = useChainId();
    const accounts = useAccounts();
    const provider = useProvider(queryKey[0]);

    return useQuery(
      [
        ...queryKey,
        `${name}/useEnsNames`,
        accounts,
        chainId,
      ] as typeof queryKey,
      async () => {
        if (!provider) throw new Error(`provider don't exists`);
        if (!accounts || !accounts.length)
          throw new Error(`accounts don't exist`);

        const ensNames = await Promise.all(
          accounts.map((account) => provider.lookupAddress(account)),
        );

        return ensNames;
      },
      {
        enabled: !!provider && !!accounts && !!accounts.length,
        context: wallet.queryContext,
        ...options,
      },
    );
  };

  const useEnsName: Api['useEnsName'] = (queryKey = [], options) => {
    const chainId = useChainId();
    const account = useAccount();
    const provider = useProvider(queryKey[0]);

    return useQuery(
      [...queryKey, `${name}/useEnsNames`, account, chainId] as typeof queryKey,
      async () => {
        if (!provider) throw new Error(`provider don't exists`);
        if (!account) throw new Error(`accounts don't exist`);

        return await provider.lookupAddress(account);
      },
      {
        enabled: !!provider && !!account,
        context: wallet.queryContext,
        ...options,
      },
    );
  };
  return {
    useEnsNames,
    useEnsName,
  };
};

plugin.pluginName = name;
export const create = () => plugin;
