import type { ConnectorOptions, Provider, WalletName } from '@web3-wallet/core';
import { Connector } from '@web3-wallet/core';

export type ImTokenProvider = Provider & {
  isImToken?: boolean;
};

export type ImTokenOptions = ConnectorOptions;

const _name = 'imToken';
export const name = _name as WalletName<typeof _name>;

const providerFilter = (p: ImTokenProvider) => !!p.isImToken;

export class ImToken extends Connector<ImTokenProvider, ImTokenOptions> {
  /** {@inheritdoc Connector.constructor} */
  constructor(options?: ImTokenOptions) {
    super(name, options);
  }

  /** {@inheritdoc Connector.detectProvider} */
  public override async detectProvider(): Promise<ImTokenProvider> {
    return await super.detectProvider(providerFilter);
  }
}
