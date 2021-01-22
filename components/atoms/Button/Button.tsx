import React from 'react';
import styled from 'styled-components';

import constants from '@/config/constants';

interface ButtonProps {
  kind: 'primary' | 'secondary';
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const ButtonPrimitive = styled('button')<ButtonProps>`
  width: 8rem;
  height: 3rem;
  border: 1px solid ${constants.theme.colorA};
  border-radius: 0.5rem;
  color: ${(props) => (props.kind === 'primary' ? constants.theme.white : constants.theme.colorA)};
  background-color: ${(props) =>
    props.kind === 'primary' ? constants.theme.colorA : constants.theme.white};
`;

export const Button: React.FC<ButtonProps> = ({ children, onClick, kind = 'primary' }) => {
  return (
    <ButtonPrimitive kind={kind} onClick={(e) => onClick(e)}>
      {children}
    </ButtonPrimitive>
  );
};
