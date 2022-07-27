import {
  PublicKey,
  SendOptions,
  Transaction,
  TransactionSignature,
} from '@solana/web3.js';

import { detectProvider } from './detectProvider';
import { Connector, Provider, ProviderNoFoundError } from './types';

const providerNotFoundError = new ProviderNoFoundError();
export interface SolanaProvider extends Provider {
  publicKey?: PublicKey;
  isConnected: boolean;
  signTransaction(transaction: Transaction): Promise<Transaction>;
  signAllTransactions(transactions: Transaction[]): Promise<Transaction[]>;
  signAndSendTransaction(
    transaction: Transaction,
    options?: SendOptions,
  ): Promise<{ signature: TransactionSignature }>;
  signMessage(message: Uint8Array): Promise<{ signature: Uint8Array }>;
  connect(...args: unknown[]): Promise<unknown>;
  disconnect(...args: unknown[]): Promise<unknown>;
}

export abstract class SolanaConnector<
  T extends SolanaProvider = SolanaProvider,
> extends Connector {
  public provider?: T;
  protected initialized = false;

  public async detectProvider(detect?: () => T | undefined): Promise<T> {
    if (this.provider) return this.provider;

    const provider = await detectProvider<T>(detect);

    if (!provider) throw providerNotFoundError;

    this.provider = provider;

    return this.provider;
  }

  private addEventListeners(): void {
    if (!this.provider) throw providerNotFoundError;

    const onConnect = this.onConnect.bind(this);
    const onDisconnect = this.onDisconnect.bind(this);
    const onAccountChanged = this.onAccountChanged.bind(this);

    if (typeof this.provider.on === 'function') {
      this.provider.on('connect', onConnect);
      this.provider.on('disconnect', onDisconnect);
      this.provider.on('accountsChanged', onAccountChanged);
    } else if (typeof this.provider.addListener === 'function') {
      this.provider.addListener('connect', onConnect);
      this.provider.addListener('disconnect', onDisconnect);
      this.provider.addListener('accountsChanged', onAccountChanged);
    } else {
      // Does not support add event listeners
    }
  }

  protected async lazyInitialize(): Promise<void> {
    if (this.initialized) return;

    try {
      await this.detectProvider();
      this.addEventListeners();
    } finally {
      this.initialized = true;
    }
  }

  protected async connect(): Promise<void> {
    this.provider?.connect();
  }

  public async activate(): Promise<void> {
    const cancelActivation = this.actions.startActivation();
    try {
      await this.lazyInitialize();

      if (!this.provider) return;

      await this.connect();
    } finally {
      cancelActivation();
    }
  }

  protected onDisconnect(): void {
    this.resetState();
  }

  protected onConnect(publicKey?: PublicKey): void {
    publicKey = publicKey || this.provider?.publicKey;

    this.actions.update({
      account: publicKey?.toBase58(),
    });
  }

  protected async disconnect(): Promise<void> {
    this.provider?.disconnect();
  }

  public async deactivate(): Promise<void> {
    this.resetState();
    this.disconnect();
  }

  public async connectEagerly(): Promise<void> {
    const cancelActivation = this.actions.startActivation();

    try {
      await this.lazyInitialize();
      await this.connect();
    } finally {
      cancelActivation();
    }
  }

  protected onAccountChanged(publicKey: PublicKey): void {
    if (publicKey) {
      this.actions.update({
        account: publicKey.toBase58(),
      });
    } else {
      this.provider?.connect().catch((error) => {
        console.warn(error);
      });
    }
  }
}
