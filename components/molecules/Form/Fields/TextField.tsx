import React from 'react';
import styled from 'styled-components';

import constants from '@/config/constants';

import { FieldInternalProps } from '../Form';

type TextFieldProps = FieldInternalProps;

const TextFieldPrimitive = styled('div')`
  display: flex;
  flex-direction: column;

  width: 8rem;
  height: 3rem;
  border: 1px solid ${constants.theme.colorA};
  border-radius: 0.5rem;

  label {
    display: none;
  }
  input {
    height: 100%;
    width: 100%;
  }
  input,
  input:focus {
    border: none;
    border-radius: inherit;
  }
`;

export const TextField: React.FC<TextFieldProps> = ({ id, name, value, type, error, register }) => {
  return (
    <TextFieldPrimitive>
      <label htmlFor={id}>{name}</label>
      <input type={type} name={id} id={id} value={value} ref={register} placeholder={name} />
      {error && <span>{error}</span>}
    </TextFieldPrimitive>
  );
};
