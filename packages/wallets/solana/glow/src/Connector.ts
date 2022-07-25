import { SolanaConnector, SolanaProvider } from '@web3-wallet/solana';

export type GlowProvider = SolanaProvider & {
  isGlow: boolean;
};

export interface GlowWindow extends Window {
  glowSolana?: GlowProvider;
}

declare const window: GlowWindow;

export class GlowConnector extends SolanaConnector<GlowProvider> {
  public override async detectProvider(): Promise<GlowProvider> {
    return (await super.detectProvider(() => {
      if (window.glowSolana?.isGlow) {
        return window.glowSolana;
      }
    })) as GlowProvider;
  }
}
