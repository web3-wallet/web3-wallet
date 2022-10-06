import { getAddress, isAddress } from '@ethersproject/address';
import create from 'zustand/vanilla';

import type { WalletState, WalletStore, WalletStoreActions } from './types';
import { isValidChainId } from './utils';

export const DEFAULT_WALLET_STATE: WalletState = {
  isConnecting: false,
  chainId: undefined,
  accounts: undefined,
};

/**
 * Create a vanilla zustand store and wallet actions for managing the WalletState
 *
 * @returns { store: WalletStore, actions: WalletStoreActions }
 */
export const createWalletStoreAndActions = (): {
  /**
   * {@link WalletStore}
   */
  store: WalletStore;
  /**
   * {@link WalletStoreActions}
   */
  actions: WalletStoreActions;
} => {
  const store = create<WalletState>()(() => DEFAULT_WALLET_STATE);

  // flag for tracking updates so we don't clobber data when cancelling activation
  let nullifier = 0;

  /**
   * Sets isConnecting to true, indicating that an connection is in progress.
   *
   * @returns endConnection - the paired endConnection function
   */
  function startConnection(): () => void {
    const nullifierCached = ++nullifier;

    store.setState({ isConnecting: true });

    const endConnection = () => {
      if (nullifier === nullifierCached)
        store.setState({ isConnecting: false });
    };

    /**
     * No matter the connection succeed or fail, should always finally call startConnection and endConnection in pair.
     */
    return endConnection;
  }

  /**
   * Used to report a `stateUpdate` which is merged with existing state. The first `stateUpdate` that results in chainId
   * and accounts being set will also set isConnecting to false, indicating a successful connection.
   *
   * @param stateUpdate - The state update to report.
   * @returns void
   */
  function update(stateUpdate: Partial<WalletState>): void {
    // validate chainId statically, independent of existing state
    if (stateUpdate.chainId !== undefined) {
      if (!isValidChainId(stateUpdate.chainId)) {
        // reset state and return immediately if chainId is invalid
        resetState();
        return;
      }
    }

    // validate accounts statically, independent of existing state
    if (stateUpdate.accounts !== undefined) {
      for (let i = 0; i < stateUpdate.accounts.length; i++) {
        // throw is account is not a valid ethereum address
        const account = stateUpdate.accounts[i];

        if (isAddress(account)) {
          stateUpdate.accounts[i] = getAddress(stateUpdate.accounts[i]);
        } else {
          resetState();
          // reset state and return immediately if account is invalid
          return;
        }
      }
    }

    nullifier++;

    store.setState((existingState): WalletState => {
      // determine the next chainId and accounts
      const chainId = stateUpdate.chainId ?? existingState.chainId;
      const accounts = stateUpdate.accounts ?? existingState.accounts;

      // ensure that the isConnecting flag is cleared when appropriate
      let isConnecting = existingState.isConnecting;
      if (isConnecting && chainId && accounts) {
        isConnecting = false;
      }

      return {
        chainId,
        accounts,
        isConnecting,
      };
    });
  }

  const resetState = (): void => {
    store.setState({
      ...DEFAULT_WALLET_STATE,
    });
  };

  return {
    store,
    actions: { startConnection, update, resetState },
  };
};
