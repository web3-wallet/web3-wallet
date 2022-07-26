import Link from 'next/link';
import { useRouter } from 'next/router';

import { Tag } from './Tag';

const routes = [
  { path: '/', name: 'All' },
  { path: '/ethereum', name: 'Ethereum' },
  { path: '/solana', name: 'Solana' },
];

export const Menu = () => {
  const pathName = useRouter().pathname;

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
      }}
    >
      {routes.map(({ path, name }) => (
        <Link key={name} href={path} passHref>
          <a>
            <Tag style={{ minWidth: '50px' }} isActive={path === pathName}>
              {name}
            </Tag>
          </a>
        </Link>
      ))}
    </div>
  );
};
