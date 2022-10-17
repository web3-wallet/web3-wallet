import { formatEther } from '@ethersproject/units';
import type { Plugin, PluginName, WrappedUseQuery } from '@web3-wallet/react';
import { useQuery } from '@web3-wallet/react';

const _name = '@web3-wallet/plugin-balance';
export const name = _name as PluginName<typeof _name>;

type Balance = number;
type Balances = Balance[];

export interface Api {
  useBalances: WrappedUseQuery<
    Balances,
    unknown,
    Balances,
    [precision?: number, ...rest: unknown[]]
  >;
  useBalance: WrappedUseQuery<
    Balance,
    unknown,
    Balance,
    [precision?: number, ...rest: unknown[]]
  >;
}

const plugin: Plugin<Api> = ({ wallet }) => {
  const { useProvider, useAccounts, useAccount } = wallet;

  const useBalances: Api['useBalances'] = (queryKey = [], options) => {
    const provider = useProvider();
    const accounts = useAccounts();

    return useQuery(
      [...queryKey, `${name}/useBalances`, accounts] as typeof queryKey,
      async () => {
        if (!provider) throw new Error(`provider don't exists`);
        if (!accounts || !accounts.length)
          throw new Error(`accounts don't exist`);

        const balances = await Promise.all(
          accounts.map((account) => provider.getBalance(account)),
        );

        return balances.map((v) =>
          Number(Number(formatEther(v)).toFixed(queryKey[0] ?? 4)),
        );
      },
      { enabled: !!provider && !!accounts && !!accounts.length, ...options },
    );
  };

  const useBalance: Api['useBalance'] = (queryKey = [], options) => {
    const provider = useProvider();
    const account = useAccount();
    return useQuery(
      [...queryKey, `${name}/useBalance`, account] as typeof queryKey,
      async () => {
        if (!provider) throw new Error(`provider don't exists`);
        if (!account) throw new Error(`accounts don't exist`);

        const balance = await provider.getBalance(account);

        return Number(Number(formatEther(balance)).toFixed(queryKey[0] ?? 4));
      },
      {
        enabled: provider && !!account,
        context: wallet.queryContext,
        ...options,
      },
    );
  };

  return {
    useBalances,
    useBalance,
  };
};

plugin.pluginName = name;
export const create = () => plugin;
