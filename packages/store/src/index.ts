import { getAddress } from '@ethersproject/address';
import type { Actions, State, StateUpdate, Store } from '@web3-wallet/types';
import { validateEvmChainId } from '@web3-wallet/utils';
import create from 'zustand/vanilla';

function validateAccount(account: string): string {
  return getAddress(account);
}

const DEFAULT_STATE: State = {
  chainId: undefined,
  accounts: undefined,
  activating: false,
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
  function startActivation(): () => void {
    const nullifierCached = ++nullifier;

    store.setState({ activating: true });

    // return a function that cancels the activation iff nothing else has happened
    return () => {
      if (nullifier === nullifierCached) store.setState({ activating: false });
    };
  }

  /**
   * Used to report a `stateUpdate` which is merged with existing state. The first `stateUpdate` that results in chainId
   * and accounts being set will also set activating to false, indicating a successful connection.
   *
   * @param stateUpdate - The state update to report.
   */
  function update(stateUpdate: StateUpdate): void {
    // validate chainId statically, independent of existing state
    if (stateUpdate.chainId !== undefined) {
      validateEvmChainId(stateUpdate.chainId);
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
      let activating = existingState.activating;
      if (activating && chainId && accounts) {
        activating = false;
      }

      return { chainId, accounts, activating };
    });
  }

  /**
   * Resets connector state back to the default state.
   */
  function resetState(): void {
    nullifier++;
    store.setState(DEFAULT_STATE);
  }

  return { store, actions: { startActivation, update, resetState } };
};
