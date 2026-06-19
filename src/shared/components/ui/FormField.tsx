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
      InputHTMLAttributes<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
      'defaultValue' | 'name' | 'options' | 'components' | 'onChange'
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
  customOptionComponents?: Record<string, React.ComponentType<any>>;
  onChange?: (value: any) => void;
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
    customOptionComponents,
    options = [],
    children,
    isEditing,
    iconClassName = '',
    inputClassName = '',
    onChange,
    ...restHtmlProps
  } = props;

  const activeVariant = fieldState.error ? 'error' : variant;

  const containerStyle = `bg-transparent focus-within:outline-0! focus-visible:outline-0! p-0!`;

  const inputStyle = `py-0! px-0!`;

  return (
    <div className={`flex flex-col gap-1.5 w-full ${containerClassName}`}>
      {isTextArea ? (
        <TextArea
          id={label}
          variant={activeVariant}
          disabled={disabled}
          {...field}
          onChange={(e) => {
            field.onChange(e);
            if (onChange) onChange(e);
          }}
          inputClassName={`${isEditing ? `${inputStyle} field-sizing-content` : ''} ${isEditing ? inputClassName : ''}`}
          {...restHtmlProps}
          className={`${isEditing ? `${containerStyle}` : ''} ${restHtmlProps.className}`}
        />
      ) : isSelect ? (
        <SelectField
          id={label}
          variant={activeVariant}
          isDisabled={disabled}
          options={options}
          name={field.name}
          ref={field.ref}
          components={customOptionComponents}
          value={options.find((opt) => opt.value === field.value) || null}
          onChange={(val) => {
            const newValue = val ? val.value : '';
            field.onChange(newValue);
            if (onChange) onChange(newValue);
          }}
          onBlur={field.onBlur}
          isEditing={isEditing}
          inputClassName={`${isEditing ? inputStyle : ''} ${isEditing ? inputClassName : ''}`}
          className={`${isEditing ? containerStyle : ''} ${restHtmlProps.className || ''}`}
        />
      ) : (
        <Input
          id={label}
          variant={activeVariant}
          disabled={disabled}
          {...field}
          onChange={(e) => {
            field.onChange(e);
            if (onChange) onChange(e);
          }}
          icon={icon}
          showPassIcon={showPassIcon}
          inputClassName={`${isEditing ? inputStyle : ''} ${isEditing ? inputClassName : ''}`}
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
