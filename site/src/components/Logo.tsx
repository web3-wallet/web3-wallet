import logo from '@public/logos/logo.svg';
import Image from 'next/image';

import { Link } from './Link';

export const Logo = () => {
  return (
    <Link chakraLinkProps={{ flexShrink: 0 }} href="/">
      <Image width="32px" height="32px" src={logo} alt="web3 wallet logo" />
    </Link>
  );
};
