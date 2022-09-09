import type { Connector } from '@web3-wallet/core';
import { UserConnectionStatus } from '@web3-wallet/core';
import createReactStore from 'zustand';

import { getAugmentedHooks, getDerivedHooks, getStateHooks } from './hooks';
import type { Wallet } from './types';

/**
 * @typeParam C - The type of the `connector` returned from `f`.
 * @param f - A function which is called with `actions` bound to the returned `store`.
 * @returns Wallet - The created wallet api.
 */
export const createWallet = <C extends Connector>(connector: C): Wallet<C> => {
  const reactStore = createReactStore(connector.store);

  const stateHooks = getStateHooks(reactStore);
  const derivedHooks = getDerivedHooks(stateHooks);
  const augmentedHooks = getAugmentedHooks<C>(
    connector,
    stateHooks,
    derivedHooks,
  );

  const connect: Wallet['connect'] = async (...args) => {
    const result = await connector.connect(...args);

    connector.actions.update({
      userConnectionStatus: UserConnectionStatus.UserConnected,
    });

    return result;
  };

  const autoConnect: Wallet['autoConnect'] = async (...args) => {
    const result = await connector.autoConnect(...args);
    connector.actions.update({
      userConnectionStatus: UserConnectionStatus.UserConnected,
    });
    return result;
  };

  const autoConnectOnce: Wallet['autoConnectOnce'] = async (...args) => {
    const result = await connector.autoConnectOnce(...args);
    connector.actions.update({
      userConnectionStatus: UserConnectionStatus.UserConnected,
    });
    return result;
  };

  const disconnect: Wallet['disconnect'] = async (...args) => {
    const result = await connector.disconnect(...args);
    connector.actions.update({
      userConnectionStatus: UserConnectionStatus.UserDisconnected,
    });
    return result;
  };

  return {
    name: connector.name,
    connector,

    connect,
    autoConnect,
    autoConnectOnce,
    disconnect,

    ...stateHooks,
    ...derivedHooks,
    ...augmentedHooks,
  };
};
