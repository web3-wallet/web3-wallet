import { PublicKey } from '@solana/web3.js';
import { SolanaConnector, SolanaProvider } from '@web3-wallet/solana';

export type SlopProvider = Omit<SolanaProvider, 'connect' | 'disconnect'> & {
  isSlop: boolean;
  connect(): Promise<{
    msg: string;
    data: {
      publicKey?: string;
    };
  }>;
  disconnect(): Promise<{ msg: string }>;
  signTransaction(message: string): Promise<{
    msg: string;
    data: {
      publicKey?: string;
      signature?: string;
    };
  }>;
  signAllTransactions(messages: string[]): Promise<{
    msg: string;
    data: {
      publicKey?: string;
      signatures?: string[];
    };
  }>;
  signMessage(message: Uint8Array): Promise<{ data: { signature: string } }>;
};

export interface SlopWindow extends Window {
  Slope?: {
    new (): SlopProvider;
  };
  slopeApp?: unknown;
}

declare const window: SlopWindow;

export class SlopConnector extends SolanaConnector<SlopProvider> {
  public override async detectProvider(): Promise<SlopProvider> {
    return await super.detectProvider(() => {
      if (typeof window.Slope === 'function') {
        return new window.Slope();
      }
    });
  }

  public override async connect(): Promise<void> {
    if (!this.provider) return;
    const { data } = await this.provider.connect();

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const publicKey = new PublicKey(data.publicKey!);

    this.onConnect(publicKey);
  }
}
