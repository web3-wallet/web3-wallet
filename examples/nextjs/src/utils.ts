import type { AbstractConnector } from '@web3-wallet/abstract-connector';
import { MetaMask } from '@web3-wallet/metamask';

export function getName(connector: AbstractConnector) {
  if (connector instanceof MetaMask) return 'MetaMask';
  return 'Unknown';
}
