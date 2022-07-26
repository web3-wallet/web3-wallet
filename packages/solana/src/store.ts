import create from 'zustand/vanilla';

import type { Actions, State, Store } from './types';
import { validateAccount } from './utils';

const DEFAULT_STATE: State = {
  isActivating: false,
  account: undefined,
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

    store.setState({ isActivating: true });

    // return a function that cancels the activation iff nothing else has happened
    return () => {
      if (nullifier === nullifierCached)
        store.setState({ isActivating: false });
    };
  }

  /**
   * Used to report a `stateUpdate` which is merged with existing state. The first `stateUpdate` that results in chainId
   * and accounts being set will also set activating to false, indicating a successful connection.
   *
   * @param stateUpdate - The state update to report.
   */
  function update(stateUpdate: Partial<State>): void {
    // validate accounts statically, independent of existing state
    if (stateUpdate.account !== undefined) {
      stateUpdate.account = validateAccount(stateUpdate.account);
    }

    nullifier++;

    store.setState((existingState): State => {
      const account = stateUpdate.account ?? existingState.account;

      // ensure that the activating flag is cleared when appropriate
      let isActivating = existingState.isActivating;
      if (isActivating && account) {
        isActivating = false;
      }

      return { account, isActivating };
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
