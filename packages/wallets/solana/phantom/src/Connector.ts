import { SolanaConnector, SolanaProvider } from '@web3-wallet/solana';

export interface PhantomWindow extends Window {
  phantom?: {
    solana?: PhantomProvider;
  };
}

export type PhantomProvider = SolanaProvider & {
  isPhantom: boolean;
};

declare const window: PhantomWindow;

export class PhantomConnector extends SolanaConnector<PhantomProvider> {
  public override async detectProvider(): Promise<PhantomProvider> {
    return await super.detectProvider(() => {
      if (window.phantom?.solana?.isPhantom) {
        return window.phantom?.solana;
      }
    });
  }
}
