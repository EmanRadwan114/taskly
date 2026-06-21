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
import SelectField, { SelectOption } from './SelectField';

interface IProps<TFieldValues extends FieldValues = FieldValues>
  extends
    Omit<
      InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
      'defaultValue' | 'name' | 'value' | 'onChange' | 'onBlur'
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
  options?: SelectOption[];
  isEditing?: boolean;
  iconClassName?: string;
  inputClassName?: string;
  formatOptionLabel?: (
    option: { label: string; icon: ReactNode },
    labelMeta: unknown
  ) => ReactNode;
  onChange?: (...args: unknown[]) => void;
  onBlur?: (...args: unknown[]) => void;
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
    isSelect = false,
    options = [],
    children,
    isEditing,
    iconClassName = '',
    inputClassName = '',
    onChange: customOnChange,
    onBlur: customOnBlur,
    name,
    ...restHtmlProps
  } = props;

  const activeVariant = fieldState.error ? 'error' : variant;

  const containerStyle = `bg-transparent focus-within:outline-0! focus-visible:outline-0! p-0!`;

  const inputStyle = `py-0! px-0!`;

  return (
    <div className={`flex flex-col gap-1.5 w-full ${containerClassName}`}>
      {isTextArea && (
        <TextArea
          id={label}
          variant={activeVariant}
          disabled={disabled}
          {...field}
          onChange={(e) => {
            field.onChange(e);
            customOnChange?.(e);
          }}
          onBlur={(e) => {
            field.onBlur();
            customOnBlur?.(e);
          }}
          inputClassName={`${isEditing ? inputStyle + ' ' + 'field-sizing-content' + ' ' + inputClassName : ''}`}
          {...restHtmlProps}
          className={`${isEditing ? containerStyle : ''} ${restHtmlProps.className}`}
        />
      )}

      {isSelect && (
        <SelectField
          id={label}
          variant={activeVariant}
          isDisabled={disabled}
          options={options}
          name={field.name}
          ref={field.ref}
          value={options?.find((opt) => opt.value === field.value) || null}
          onChange={(val) => {
            field.onChange((val as SelectOption)?.value);
            customOnChange?.(val);
          }}
          onBlur={() => {
            field.onBlur();
            customOnBlur?.();
          }}
          inputClassName={`${isEditing ? inputStyle + ' ' + inputClassName : ''}`}
          className={`${isEditing ? containerStyle : ''} ${restHtmlProps.className || ''}`}
          {...(restHtmlProps as any)}
        />
      )}

      {!isSelect && !isTextArea && (
        <Input
          id={label}
          variant={activeVariant}
          disabled={disabled}
          {...field}
          onChange={(e) => {
            field.onChange(e);
            customOnChange?.(e);
          }}
          onBlur={(e) => {
            field.onBlur();
            customOnBlur?.(e);
          }}
          icon={icon}
          showPassIcon={showPassIcon}
          inputClassName={`${isEditing ? inputStyle + ' ' + inputClassName : ''}`}
          iconClassName={iconClassName}
          {...restHtmlProps}
          className={`${isEditing ? containerStyle : ''} ${restHtmlProps.className}`}
        />
      )}

      {/* Message feedback */}
      {fieldState.error ? (
        <div className="text-error flex gap-1 items-start">
          <AlertIcon className="size-3" />
          <p className="text-label">{fieldState.error.message}</p>
        </div>
      ) : (
        fieldMsg && <p className="text-slate-light text-label">{fieldMsg}</p>
      )}
    </div>
  );
};

export default FormField;
