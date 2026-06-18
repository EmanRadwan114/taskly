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
import Select from './Select';

interface IProps<TFieldValues extends FieldValues = FieldValues>
  extends
    Omit<
      InputHTMLAttributes<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
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
  isSelect?: boolean;
  inputClassName?: string;
  iconClassName?: string;
}

const EditableFormField = <TFieldValues extends FieldValues = FieldValues>(
  props: IProps<TFieldValues>
) => {
  const { field, fieldState } = useController(props);
  const {
    label,
    variant = 'default',
    fieldMsg,
    containerClassName = '',
    inputClassName = '',
    iconClassName = '',
    control,
    rules,
    shouldUnregister,
    disabled,
    icon,
    showPassIcon = false,
    isTextArea = false,
    isSelect = false,
    ...restHtmlProps
  } = props;

  const activeVariant = fieldState.error ? 'error' : variant;

  const containerStyle = `bg-transparent focus-within:outline-0! focus-visible:outline-0! p-0!`;

  const inputStyle = `py-0! px-0!`;

  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {isTextArea ? (
        <TextArea
          id={label}
          variant={activeVariant}
          disabled={disabled}
          {...field}
          inputClassName={`${inputStyle} ${inputClassName}`}
          rows={2}
          {...restHtmlProps}
          className={`${containerStyle} ${restHtmlProps.className}`}
        />
      ) : isSelect ? (
        <Select
          id={label}
          variant={activeVariant}
          disabled={disabled}
          {...field}
          inputClassName={`${inputStyle} ${inputClassName}`}
          {...restHtmlProps}
          className={`${containerStyle} ${restHtmlProps.className}`}
        >
          {props.children}
        </Select>
      ) : (
        <Input
          id={label}
          variant={activeVariant}
          disabled={disabled}
          {...field}
          icon={icon}
          showPassIcon={showPassIcon}
          inputClassName={`${inputStyle} ${inputClassName}`}
          iconClassName={iconClassName}
          {...restHtmlProps}
          className={`${containerStyle} ${restHtmlProps.className}`}
        />
      )}

      {/* Message feedback */}
      {fieldState.error && (
        <div className="text-error flex gap-1 items-center">
          <AlertIcon className="size-3" />
          <p className="text-label">{fieldState.error.message}</p>
        </div>
      )}
    </div>
  );
};

export default EditableFormField;
