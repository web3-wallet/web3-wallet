/**
 * EIP-6963
 * @see https://metamask.io/news/developers/how-to-implement-eip-6963-support-in-your-web3-dapp/
 * @see https://eips.ethereum.org/EIPS/eip-6963
 */

import type { Provider } from '.';

export interface EIP6963ProviderInfo {
  // Unique identifier for the wallet e.g io.metamask, io.metamask.flask, io.rabby
  rdns: string;
  // Globally unique ID to differentiate between provider sessions for the lifetime of the page
  uuid: string;
  // Human-readable name of the wallet
  name: string;
  // URL to the wallet's icon
  icon: string;
}

export interface EIP6963ProviderDetail {
  info: EIP6963ProviderInfo;
  provider: Provider;
}

interface EIP6963AnnounceProviderEvent {
  detail: {
    info: EIP6963ProviderInfo;
    provider: Provider;
  };
}

export function detectEip6963ProviderDetails(timeout = 200) {
  return new Promise<EIP6963ProviderDetail[]>((resolve) => {
    let providerDetails: EIP6963ProviderDetail[] = [];

    const onAnnouncement = (event: EIP6963AnnounceProviderEvent) => {
      if (providerDetails.some((p) => p.info.uuid === event.detail.info.uuid))
        return;
      providerDetails = [...providerDetails, event.detail];
    };

    setTimeout(() => {
      window.removeEventListener(
        'eip6963:announceProvider',
        onAnnouncement as unknown as EventListener,
      );
      resolve(providerDetails);
    }, timeout);

    window.addEventListener(
      'eip6963:announceProvider',
      onAnnouncement as unknown as EventListener,
    );
    window.dispatchEvent(new Event('eip6963:requestProvider'));
  });
}
