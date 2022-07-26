import {
  PublicKey,
  SendOptions,
  Transaction,
  TransactionSignature,
} from '@solana/web3.js';

import { detectProvider } from './detectProvider';
import { Connector, Provider, ProviderNoFoundError } from './types';

type connectOptions = {
  onlyIfTrusted: boolean;
};

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
  connect(options?: connectOptions): Promise<void>;
  disconnect(): void;
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
    } else {
      this.provider.addListener('connect', onConnect);
      this.provider.addListener('disconnect', onDisconnect);
      this.provider.addListener('accountsChanged', onAccountChanged);
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

  public async activate(): Promise<void> {
    const cancelActivation = this.actions.startActivation();
    try {
      await this.lazyInitialize();

      if (!this.provider) return;

      await this.provider.connect();
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

  public async deactivate(): Promise<void> {
    this.resetState();
    this.provider?.disconnect();
  }

  public override async connectEagerly(): Promise<void> {
    const cancelActivation = this.actions.startActivation();

    try {
      await this.lazyInitialize();
      await this.provider?.connect({
        onlyIfTrusted: true,
      });
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
