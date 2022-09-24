import type { ConnectorOptions, Provider, WalletName } from '@web3-wallet/core';
import { Connector } from '@web3-wallet/core';

export type ImTokenProvider = Provider & {
  isImToken?: boolean;
};

const providerFilter = (p: ImTokenProvider) => !!p.isImToken;

export type ImTokenOptions = ConnectorOptions;

const _name = 'imToken';
export const name = _name as WalletName<typeof _name>;

export class ImToken extends Connector<ImTokenOptions> {
  public override providerFilter = providerFilter;

  /** {@inheritdoc Connector.constructor} */
  constructor(options?: ImTokenOptions) {
    super(name, options);
  }
}
