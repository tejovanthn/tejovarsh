import React from 'react';
import styled from 'styled-components';

import constants from '@/config/constants';

import { FieldInternalProps } from '../Form';

interface TextFieldProps extends FieldInternalProps {
  cta?: string;
}

const TextFieldPrimitive = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 12rem;
  height: 3rem;
  border: 1px solid ${constants.theme.colorA};
  border-radius: 0.5rem;
  padding: 0.5rem;
  background: ${constants.theme.white};

  label {
    display: none;
  }
  input[type='text'] {
    height: 100%;
    width: 100%;
    flex: 10;
  }
  input[type='submit'] {
    background: none;
    text-transform: uppercase;
    color: ${constants.theme.colorA};
    flex: 1;
    cursor: pointer;
    font-size: 0.75rem;
  }
  input,
  input:focus {
    border: none;
    border-radius: inherit;
    outline: none;
  }
`;

export const TextFieldWithCTA: React.FC<TextFieldProps> = ({
  id,
  name,
  value,
  error,
  register,
  cta = 'submit'
}) => {
  return (
    <TextFieldPrimitive>
      <label htmlFor={id}>{name}</label>
      <input type="text" name={id} id={id} value={value} ref={register} placeholder={name} />
      {error && <span>{error}</span>}
      <input type="submit" value={cta} />
    </TextFieldPrimitive>
  );
};
