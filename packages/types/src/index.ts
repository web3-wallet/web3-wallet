import type { StoreApi } from 'zustand/vanilla';

export type Provider = object;

export type State = {
  isActivating: boolean;
  chainId?: number | string;
  accounts?: string[];
};

export type Store<T extends State> = StoreApi<T>;

export type Hooks<S extends State> = {
  useChainId: () => S['chainId'];
  useAccounts: () => S['accounts'];
  useIsActivating: () => S['isActivating'];
};

export interface Actions<S extends State> {
  startActivation: () => () => void;
  resetState: () => void;
  update: (stateUpdate: Partial<Omit<S, 'isActivating'>>) => void;
}

export type ProviderFilter<P> = (provider: P) => boolean;

export abstract class Connector<P extends Provider, S extends State> {
  public abstract provider?: P;
  public actions: Actions<S>;
  public onError?(...args: unknown[]): Promise<void>;
  constructor(
    actions: Actions<S>,
    onError?: (...args: unknown[]) => Promise<void>,
  ) {
    this.actions = actions;
    this.onError = onError;
  }
  public abstract detectProvider(
    providerFilter?: ProviderFilter<P>,
  ): Promise<P>;
  public abstract activate(...args: unknown[]): Promise<void>;
  public abstract connectEagerly(...args: unknown[]): Promise<void>;
  public abstract deactivate(...args: unknown[]): Promise<void>;
  public abstract watchAsset(...args: unknown[]): void;
  protected abstract updateChainId(chainId: unknown): void;
  protected abstract updateAccounts(accounts: unknown[]): void;
  protected abstract lazyInitialize(): Promise<void>;
  protected abstract switchChain(chainId: unknown): Promise<void>;
  protected abstract addChain(...args: unknown[]): Promise<void>;
  protected abstract requestChainId(): Promise<string>;
  protected abstract requestAccounts(): Promise<string[]>;
  protected abstract onConnect(...args: unknown[]): void;
  protected abstract onDisconnect(...args: unknown[]): void;
  protected abstract onChainChanged(chainId: unknown): void;
  protected abstract onAccountsChanged(accounts: unknown[]): void;
}

export interface Wallet<
  T extends Connector<Provider, S>,
  S extends State,
  H extends Hooks<S>,
> {
  connector: T;
  store: Store<S>;
  hooks: H;
}
