import { MetaMask } from '@web3-wallet/metamask';
import type { Connector } from '@web3-wallet/types';

export function getName(connector: Connector) {
  if (connector instanceof MetaMask) return 'MetaMask';
  return 'Unknown';
}
