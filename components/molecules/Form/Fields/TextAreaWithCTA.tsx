import React from 'react';
import styled from 'styled-components';

import constants from '@/config/constants';

import { FieldInternalProps } from '../Form';

interface TextAreaProps extends FieldInternalProps {
  cta?: string;
}

const TextAreaPrimitive = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 12rem;
  height: auto;
  border: 1px solid ${constants.theme.colorA};
  border-radius: 0.5rem;
  padding: 0.5rem;
  background: ${constants.theme.white};

  label {
    display: none;
  }
  textarea {
    height: 100%;
    width: 100%;
    flex: 10;
    height: 10rem;
    resize: none;
    font-family: inherit;
    font-size: inherit;
  }
  input[type='submit'] {
    background: none;
    text-transform: uppercase;
    color: ${constants.theme.colorA};
    flex: 1;
    cursor: pointer;
    font-size: 0.75rem;
    font-family: 'Dancing Script', sanserif;
  }
  textarea,
  textarea:focus,
  input,
  input:focus {
    border: none;
    border-radius: inherit;
    outline: none;
  }
  textarea::placeholder {
    font-family: inherit;
    font-size: 1rem;
  }
`;

export const TextAreaWithCTA: React.FC<TextAreaProps> = ({
  id,
  placeholder,
  name,
  value,
  error,
  register,
  cta = 'submit'
}) => {
  return (
    <TextAreaPrimitive>
      <label htmlFor={id}>{name}</label>
      <textarea name={id} id={id} value={value} ref={register} placeholder={placeholder || name} />
      {error && <span>{error}</span>}
      <input type="submit" value={cta} />
    </TextAreaPrimitive>
  );
};
