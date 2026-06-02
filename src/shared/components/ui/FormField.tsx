'use client';

import React, { InputHTMLAttributes, ReactNode } from 'react';
import Input from './Input';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import Label from './Label';

interface IProps<TFieldValues extends FieldValues = FieldValues>
  extends
    Omit<InputHTMLAttributes<HTMLInputElement>, 'defaultValue' | 'name'>,
    Omit<UseControllerProps<TFieldValues>, 'defaultValue'> {
  label: string;
  variant?: 'default' | 'error';
  fieldMsg?: string;
  isOptional?: boolean;
  containerClassName?: string;
  icon?: ReactNode;
}

const FormField = <TFieldValues extends FieldValues = FieldValues>(
  props: IProps<TFieldValues>
) => {
  const { field, fieldState } = useController(props);
  const {
    label,
    variant = 'default',
    fieldMsg,
    isOptional = false,
    containerClassName = '',
    control,
    rules,
    shouldUnregister,
    disabled,
    icon,
    ...restHtmlProps
  } = props;

  const activeVariant = fieldState.error ? 'error' : variant;

  return (
    <div className={`flex flex-col gap-6px ${containerClassName}`}>
      <Input
        id={label}
        variant={activeVariant}
        disabled={disabled}
        {...field}
        {...restHtmlProps}
        icon={icon}
      />

      {/* Message feedback */}
      {fieldState.error ? (
        <p className="text-error text-label">{fieldState.error.message}</p>
      ) : (
        fieldMsg && <p className="text-slate-light text-label">{fieldMsg}</p>
      )}
    </div>
  );
};

export default FormField;
