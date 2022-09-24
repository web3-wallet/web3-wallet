import mintedImage from '@public/images/showcase/minted.jpg';
import type { StaticImageData } from 'next/image';

export type ShowcaseItem = {
  name: string;
  description: string;
  url: string;
  image: string | StaticImageData;
};

export const showCaseList: ShowcaseItem[] = [
  {
    name: 'Minted Network',
    description:
      'Minted is a digital bazaar of wonders, letting you discover, trade, and unearth NFT gems.  List and trade your NFTs and receive MTD token rewards!',
    url: 'https://minted.network',
    image: mintedImage,
  },
];
