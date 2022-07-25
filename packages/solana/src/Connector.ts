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

  public async detectProvider(detect?: () => T | undefined): Promise<T> {
    const provider = await detectProvider<T>(detect);

    if (!provider) {
      throw new ProviderNoFoundError();
    }

    this.provider = provider;

    return this.provider;
  }

  protected async lazyInitialize(): Promise<void> {
    await this.detectProvider();
    if (!this.provider) return;

    const onConnect = this.onConnect.bind(this);
    const onDisconnect = this.onDisconnect.bind(this);
    const onAccountChanged = this.onAccountChanged.bind(this);
    this.provider.on('connect', onConnect);
    this.provider.on('accountChanged', onAccountChanged);
    this.provider.on('disconnect', onDisconnect);
  }

  public async activate(): Promise<void> {
    await this.lazyInitialize();
    if (!this.provider) return;
    await this.provider.connect();
  }

  protected onDisconnect(): void {
    this.resetState();
  }

  protected onConnect(publicKey?: PublicKey) {
    publicKey = publicKey || this.provider?.publicKey;

    this.actions.update({
      account: publicKey?.toBase58(),
    });
  }

  public async deactivate(): Promise<void> {
    this.resetState();
    this.provider?.disconnect();
  }

  public async connectEagerly(): Promise<void> {
    this.provider?.connect({
      onlyIfTrusted: true,
    });
  }

  protected onAccountChanged(publicKey: PublicKey): void {
    if (publicKey) {
      this.actions.update({
        account: publicKey.toBase58(),
      });
    } else {
      // Attempt to reconnect to Phantom
      this.provider?.connect().catch((error) => {
        // Handle connection failure
        console.warn(error);
      });
    }
  }
}
