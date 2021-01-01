import React, { LegacyRef } from 'react';
import { FieldError, useForm } from 'react-hook-form';
import styled from 'styled-components';

import { TextField } from './Fields/TextField';
import { TextFieldWithCTA } from './Fields/TextFieldWithCTA';

export interface FieldProps {
  id: string;
  name: string;
  value?: string;
  type: 'text' | 'number' | 'textWithCTA';
  cta?: string;
}

export interface FieldInternalProps extends FieldProps {
  error?: FieldError;
  register: LegacyRef<HTMLInputElement>;
}

export interface FormProps<T = Record<string, unknown>> {
  fields: FieldProps[];
  onSubmit: (data: T) => void;
  type?: 'inline';
}
export type FormInternalProps = Pick<FormProps, 'type'>;

const FormPrimitive = styled('form')<FormInternalProps>`
  display: flex;
  flex-direction: column;
`;

const renderFields = (
  field: FieldProps,
  register: LegacyRef<HTMLInputElement>,
  error: FieldError
) => {
  const props = {
    ...field,
    error: error,
    register: register,
    key: field.id
  };
  switch (field.type) {
    case 'text':
      return <TextField {...props} />;
    case 'textWithCTA':
      return <TextFieldWithCTA {...props} />;
  }
};

export const Form: React.FC<FormProps> = ({ fields, onSubmit, type }) => {
  const { register, handleSubmit, errors } = useForm();

  return (
    <FormPrimitive onSubmit={handleSubmit(onSubmit)} type={type}>
      {fields.map((field) => renderFields(field, register, errors[field.id]))}
      {type !== 'inline' && <input type="submit" />}
    </FormPrimitive>
  );
};
