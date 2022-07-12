import { parseEvmChainId } from '@web3-wallet/utils';
import type { EventEmitter } from 'node:events';
import { StoreApi } from 'zustand/vanilla';

export interface State {
  chainId?: number;
  accounts?: string[];
  activating: boolean;
}

export type Store = StoreApi<State>;

export type StateUpdate =
  | {
      chainId: number;
      accounts: string[];
    }
  | {
      chainId: number;
      accounts?: never;
    }
  | {
      chainId?: never;
      accounts: string[];
    };

export interface Actions {
  startActivation: () => () => void;
  update: (stateUpdate: StateUpdate) => void;
  resetState: () => void;
}

// per EIP-1193
export interface RequestArguments {
  readonly method: string;
  readonly params?: readonly unknown[] | object;
}

// per EIP-1193
export interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

// per EIP-1193
export interface Provider extends EventEmitter {
  request<T>(args: RequestArguments): Promise<T>;
}

// per EIP-1193
export interface ProviderConnectInfo {
  readonly chainId: string;
}

export class ProviderNoFoundError extends Error {
  public constructor(message = 'Provider not found') {
    super(message);
    this.name = ProviderNoFoundError.name;
    Object.setPrototypeOf(this, ProviderNoFoundError.prototype);
  }
}

// per EIP-3085
export interface AddEthereumChainParameter {
  chainId: number;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string; // 2-6 characters long
    decimals: 18;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[]; // Currently ignored.
}

// per EIP-747
export interface WatchAssetParameters {
  address: string; // The address that the token is at.
  symbol: string; // A ticker symbol or shorthand, up to 5 chars.
  decimals: number; // The number of decimals in the token
  image: string; // A string url of the token logo
}

const isChainId = (
  chainIdOrChainParameter?: number | AddEthereumChainParameter,
): chainIdOrChainParameter is number => {
  return typeof chainIdOrChainParameter === 'number';
};

const isAddChainParameter = (
  chainIdOrChainParameter?: number | AddEthereumChainParameter,
): chainIdOrChainParameter is AddEthereumChainParameter => {
  return !isChainId(chainIdOrChainParameter);
};

const providerNotFoundError = new ProviderNoFoundError('Provider not found');

export abstract class Connector {
  /**
   * An
   * EIP-1193 ({@link https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md}) and
   * EIP-1102 ({@link https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1102.md}) compliant provider.
   * May also comply with EIP-3085 ({@link https://github.com/ethereum/EIPs/blob/master/EIPS/eip-3085.md}).
   * This property must be defined while the connector is active, unless a customProvider is provided.
   */
  public provider?: Provider;

  /**
   * Provider is usually loaded asynchronously. Connector consumers may want to known the provider load state.
   * This property is used to expose the provider load state to the Connector consumers.
   *
   * Resolve with the Provider if loaded successfully, and reject if failed to load the provider for any reason
   */
  public abstract readonly detectProvider: () => Promise<Provider>;

  protected readonly actions: Actions;

  private initialized = false;

  /**
   * An optional handler which will report errors thrown from event listeners. Any errors caused from
   * user-defined behavior will be thrown inline through a Promise.
   */
  protected onError?: (error: ProviderRpcError) => void;

  /**
   * @param actions - Methods bound to a zustand store that tracks the state of the connector.
   * @param onError - An optional handler which will report errors thrown from event listeners.
   * Actions are used by the connector to report changes in connection status.
   */
  constructor(actions: Actions, onError?: (error: Error) => void) {
    this.actions = actions;
    this.onError = onError;
  }

  protected readonly lazyInitialize = async (): Promise<void> => {
    if (this.initialized) return;
    try {
      await this.detectProvider();
      this.addEventListener();
    } finally {
      this.initialized = true;
    }
  };

  /**
   * Reset the state of the connector without otherwise interacting with the connection.
   */
  public resetState(): Promise<void> | void {
    this.actions.resetState();
  }

  /**
   * provider may not support switch chain
   */
  protected abstract switchChain?(chainId: number): Promise<void>;
  /**
   * provider may not support add chain
   */
  protected abstract addChain?(
    addChainParameter: AddEthereumChainParameter,
  ): Promise<void>;
  protected abstract addEventListener(): void;
  protected abstract removeEventListener(): void;
  protected abstract requestChainId(): Promise<string>;
  protected abstract requestAccounts(): Promise<string[]>;

  protected onConnect = ({ chainId }: ProviderConnectInfo): void => {
    this.actions.update({ chainId: parseEvmChainId(chainId) });
  };

  protected onDisconnect = (error?: ProviderRpcError) => {
    this.resetState();
    error && this.onError?.(error);
  };

  protected onChainIdChanged = (chainId: number | string): void => {
    this.actions.update({ chainId: parseEvmChainId(chainId) });
  };

  protected onAccountsChanged = (accounts: string[]): void => {
    this.actions.update({ accounts });
  };

  public async connectEagerly(): Promise<void> {
    const cancelActivation = this.actions.startActivation();

    await this.lazyInitialize();

    try {
      const [chainId, accounts] = await Promise.all([
        this.requestChainId(),
        this.requestAccounts(),
      ]);
      if (!accounts.length) throw new Error('No accounts returned');
      this.actions.update({ chainId: parseEvmChainId(chainId), accounts });
    } catch (error) {
      cancelActivation();
      throw error;
    }
  }
  /**
   * Initiates a connection.
   *
   * @param chainIdOrChainParameter - If defined, indicates the desired chain to connect to. If the user is
   * already connected to this chain, no additional steps will be taken. Otherwise, the user will be prompted to switch
   * to the chain, if one of two conditions is met: either they already have it added in their extension, or the
   * argument is of type AddEthereumChainParameter, in which case the user will be prompted to add the chain with the
   * specified parameters first, before being prompted to switch.
   */
  public async activate(
    chainIdOrChainParameter?: number | AddEthereumChainParameter,
  ): Promise<void> {
    try {
      await this.lazyInitialize();
    } catch (_) {
      throw providerNotFoundError;
    }

    let cancelActivation: () => void = () => {};
    cancelActivation = this.actions.startActivation();

    try {
      const [chainId, accounts] = await Promise.all([
        this.requestChainId(),
        this.requestAccounts(),
      ]);

      const receivedChainId = parseEvmChainId(chainId);
      const desiredChainId =
        typeof chainIdOrChainParameter === 'number'
          ? chainIdOrChainParameter
          : chainIdOrChainParameter?.chainId;

      // if there's no desired chain, or it's equal to the received, update
      if (!desiredChainId || receivedChainId === desiredChainId) {
        return this.actions.update({ chainId: receivedChainId, accounts });
      }

      if (!this.switchChain) return;

      try {
        await this.switchChain(desiredChainId);
        return this.actions.update({ chainId: receivedChainId, accounts });
      } catch (err: unknown) {
        const error = err as ProviderRpcError;
        const shouldTryToAddChain =
          isAddChainParameter(chainIdOrChainParameter) &&
          (error.code === 4902 || error.code === -32603);

        if (shouldTryToAddChain && this.addChain) {
          /**
           * if we're here, we can try to add a new network
           */
          await this.addChain(chainIdOrChainParameter);

          /**
           * chain added, activate the added chainId again
           */
          this.activate(chainIdOrChainParameter.chainId);
        } else {
          /**
           * can't handle the error, throw it again
           */
          throw error;
        }
      }
    } catch (error) {
      cancelActivation?.();
      throw error;
    }
  }
  /**
   * Un-initiate a connection. Only needs to be defined if a connection requires specific logic on disconnect.
   */
  public deactivate = async (): Promise<void> => {
    this.removeEventListener();
    this.resetState();
    this.provider = undefined;
  };

  /**
   * Attempt to add an asset per EIP-747.
   */
  public abstract watchAsset?(params: WatchAssetParameters): Promise<true>;
}
