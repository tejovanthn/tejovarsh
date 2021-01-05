import React from 'react';
import styled from 'styled-components';

import { NavBar } from '@/components/molecules/NavBar/NavBar';
import constants from '@/config/constants';

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
