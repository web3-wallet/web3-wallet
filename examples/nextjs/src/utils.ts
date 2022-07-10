import { MetaMask } from '@vvswallet/metamask';
import type { Connector } from '@vvswallet/types';

export function getName(connector: Connector) {
  if (connector instanceof MetaMask) return 'MetaMask';
  return 'Unknown';
}
