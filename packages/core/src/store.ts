import create from 'zustand/vanilla';

import type { Actions, State, Store } from './types';
import { validateAccount, validateChainId } from './utils';

export const DEFAULT_STATE: State = {
  chainId: undefined,
  accounts: undefined,
  isConnecting: false,
};

export const createStore = (): {
  store: Store;
  actions: Actions;
} => {
  const store = create<State>()(() => DEFAULT_STATE);

  // flag for tracking updates so we don't clobber data when cancelling activation
  let nullifier = 0;

  /**
   * Sets activating to true, indicating that an update is in progress.
   *
   * @returns cancelActivation - A function that cancels the activation by setting activating to false,
   * as long as there haven't been any intervening updates.
   */
  function startConnection(): () => void {
    const nullifierCached = ++nullifier;

    store.setState({ isConnecting: true });

    // return a function that cancels the activation iff nothing else has happened
    return () => {
      if (nullifier === nullifierCached)
        store.setState({ isConnecting: false });
    };
  }

  /**
   * Used to report a `stateUpdate` which is merged with existing state. The first `stateUpdate` that results in chainId
   * and accounts being set will also set activating to false, indicating a successful connection.
   *
   * @param stateUpdate - The state update to report.
   */
  function update(stateUpdate: Partial<State>): void {
    // validate chainId statically, independent of existing state
    if (stateUpdate.chainId !== undefined) {
      validateChainId(stateUpdate.chainId);
    }

    // validate accounts statically, independent of existing state
    if (stateUpdate.accounts !== undefined) {
      for (let i = 0; i < stateUpdate.accounts.length; i++) {
        stateUpdate.accounts[i] = validateAccount(stateUpdate.accounts[i]);
      }
    }

    nullifier++;

    store.setState((existingState): State => {
      // determine the next chainId and accounts
      const chainId = stateUpdate.chainId ?? existingState.chainId;
      const accounts = stateUpdate.accounts ?? existingState.accounts;

      // ensure that the activating flag is cleared when appropriate
      let isConnecting = existingState.isConnecting;
      if (isConnecting && chainId && accounts) {
        isConnecting = false;
      }

      return { chainId, accounts, isConnecting: isConnecting };
    });
  }

  /**
   * Resets connector state back to the default state.
   */
  function resetState(): void {
    nullifier++;
    store.setState(DEFAULT_STATE);
  }

  return { store, actions: { startConnection, update, resetState } };
};
