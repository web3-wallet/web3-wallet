import type { StoreApi } from 'zustand/vanilla';

export type Provider = object;

export type State = object & {
  isActivating: boolean;
};

export type Store<T extends State> = StoreApi<T>;

export interface Actions<S extends State> {
  startActivation: () => () => void;
  resetState: () => void;
  update: (stateUpdate: Partial<Omit<S, 'isActivating'>>) => void;
}

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
  public abstract detectProvider(...args: unknown[]): Promise<P | undefined>;
  protected abstract lazyInitialize(): Promise<void>;
  public abstract activate(...args: unknown[]): Promise<void>;
  public abstract connectEagerly(...args: unknown[]): Promise<void>;
  public abstract deactivate(...args: unknown[]): Promise<void>;
}

export interface Wallet<
  P extends Provider = Provider,
  S extends State = State,
> {
  store: Store<S>;
  connector: Connector<P, S>;
}
