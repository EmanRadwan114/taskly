'use client';

import { InputHTMLAttributes, ReactNode } from 'react';
import Input from './Input';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import TextArea from './TextArea';
import AlertIcon from '@/assets/icons/alert.svg';

interface IProps<TFieldValues extends FieldValues = FieldValues>
  extends
    Omit<
      InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
      'defaultValue' | 'name'
    >,
    Omit<UseControllerProps<TFieldValues>, 'defaultValue'> {
  label: string;
  variant?: 'default' | 'error';
  fieldMsg?: string;
  containerClassName?: string;
  icon?: ReactNode;
  showPassIcon?: boolean;
  isTextArea?: boolean;
}

const FormField = <TFieldValues extends FieldValues = FieldValues>(
  props: IProps<TFieldValues>
) => {
  const { field, fieldState } = useController(props);
  const {
    label,
    variant = 'default',
    fieldMsg,
    containerClassName = '',
    control,
    rules,
    shouldUnregister,
    disabled,
    icon,
    showPassIcon = false,
    isTextArea = false,
    ...restHtmlProps
  } = props;

  const activeVariant = fieldState.error ? 'error' : variant;

  return (
    <div className={`flex flex-col gap-6px ${containerClassName}`}>
      {isTextArea ? (
        <TextArea
          id={label}
          variant={activeVariant}
          disabled={disabled}
          {...field}
          {...restHtmlProps}
        />
      ) : (
        <Input
          id={label}
          variant={activeVariant}
          disabled={disabled}
          {...field}
          {...restHtmlProps}
          icon={icon}
          showPassIcon={showPassIcon}
        />
      )}

      {/* Message feedback */}
      {fieldState.error ? (
        <div className="text-error flex gap-1">
          <AlertIcon className="size-3.25" />
          <p className="text-label">{fieldState.error.message}</p>
        </div>
      ) : (
        fieldMsg && <p className="text-slate-light text-label">{fieldMsg}</p>
      )}
    </div>
  );
};

export default FormField;
