import React from 'react';
import { FieldError, useForm, UseFormMethods } from 'react-hook-form';
import styled from 'styled-components';

import { TextAreaWithCTA } from './Fields/TextAreaWithCTA';
import { TextField } from './Fields/TextField';
import { TextFieldWithCTA } from './Fields/TextFieldWithCTA';

export interface FieldProps {
  id: string;
  name: string;
  value?: string;
  placeholder?: string;
  type: 'text' | 'number' | 'textWithCTA' | 'textareaWithCTA';
  cta?: string;
}

export interface FieldInternalProps extends FieldProps {
  error?: FieldError;
  register: UseFormMethods['register'];
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
  register: UseFormMethods['register'],
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
    case 'textareaWithCTA':
      return <TextAreaWithCTA {...props} />;
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
