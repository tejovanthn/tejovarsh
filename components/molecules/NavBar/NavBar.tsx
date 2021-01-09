import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

import constants from '@/config/constants';

const NavBarPrimitive = styled('nav')`
  width: 100%;
  h1 {
    background-color: ${constants.theme.colorA};
    padding: 1rem 0;
    text-align: center;
    margin: 0;
    font-size: 3rem;
  }
  ul {
    background: ${constants.theme.colorB};
    margin: 0 auto;
    padding: 0 1rem;
    display: grid;
    grid-template-columns: repeat(${constants.nav.length}, 1fr);
  }
  li {
    display: block;
    width: 100%;
    text-align: center;
    border-bottom: 0.25rem solid rgba(0, 0, 0, 0);
    font-family: 'Dancing Script', sanserif;
  }
  li.active {
    border-bottom: 0.25rem solid ${constants.theme.colorA};
  }
  a {
    min-width: 100%;
    display: block;
    padding: 0.5rem;
  }
  ${constants.devices.laptop} {
    ul {
      padding: 0 20%;
    }
  }
`;

export const NavBar: React.FC = () => {
  const router = useRouter();

  return (
    <NavBarPrimitive>
      <h1>{constants.title}</h1>
      <ul>
        {constants.nav.map((nav) => (
          <li key={nav.title} className={router.pathname === nav.path ? 'active' : ''}>
            <Link href={nav.path}>
              <a>{nav.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </NavBarPrimitive>
  );
};
