import React from 'react';
import styled from 'styled-components';

import constants from '@/components/constants';
import { NavBar } from '@/components/molecules/NavBar/NavBar';

const LayoutPrimitive = styled('div')`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  main {
    padding: 1rem;
  }
  ${constants.devices.laptop} {
    main {
      padding: 3rem 20%;
    }
  }
`;

export const Layout: React.FC = ({ children }) => {
  return (
    <LayoutPrimitive>
      <NavBar />
      <main>{children}</main>
    </LayoutPrimitive>
  );
};

export default Layout;
