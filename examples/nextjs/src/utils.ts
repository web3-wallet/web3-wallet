import type { Connector } from '@web3-wallet/connector';
import { MetaMask } from '@web3-wallet/metamask';

export function getName(connector: Connector) {
  if (connector instanceof MetaMask) return 'MetaMask';
  return 'Unknown';
}
