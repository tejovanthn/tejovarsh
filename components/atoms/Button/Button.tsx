import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  kind: 'primary' | 'secondary';
}

const ButtonPrimitive = styled('button')<ButtonProps>`
  width: 8rem;
  height: 3rem;
  border: 1px solid teal;
  border-radius: 0.5rem;
  color: ${(props) => (props.kind === 'primary' ? 'white' : 'teal')};
  background-color: ${(props) => (props.kind === 'primary' ? 'teal' : 'white')};
`;

export const Button: React.FC<ButtonProps> = ({ children, kind = 'primary' }) => {
  return <ButtonPrimitive kind={kind}>{children}</ButtonPrimitive>;
};
