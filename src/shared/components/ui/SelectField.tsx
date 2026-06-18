'use client';

import React, { Ref } from 'react';
import Select, {
  Props as SelectProps,
  GroupBase,
  SelectInstance,
} from 'react-select';

export interface SelectOption {
  value: string | number;
  label: string;
  components?: Record<string, React.ComponentType<any>>;
  isEditing?: boolean;
}

interface IProps extends Omit<
  SelectProps<SelectOption, false, GroupBase<SelectOption>>,
  'theme'
> {
  variant?: 'default' | 'error';
  inputClassName?: string;
  ref?: Ref<SelectInstance<SelectOption, false, GroupBase<SelectOption>>>;
  isEditing?: boolean;
}

const SelectField = ({
  variant = 'default',
  inputClassName = '',
  options,
  className,
  styles,
  ref,
  components,
  isEditing = false,
  ...props
}: IProps) => {
  const selectVariants = {
    default:
      'bg-surface-high text-secondary focus-within:outline-primary focus-visible:outline-primary',
    error:
      'bg-error-background text-error-dark focus-within:outline-error-dark focus-visible:outline-error-dark',
  };

  const currentVariantClass = isEditing ? '' : selectVariants[variant];

  return (
    <div
      className={`w-full flex justify-between items-center gap-0.5 rounded-sm focus-within:outline-1 focus-visible:outline-1 ${currentVariantClass} ${className || ''}`}
    >
      <Select<SelectOption, false, GroupBase<SelectOption>>
        ref={ref}
        options={options}
        className={`w-full ${inputClassName}`}
        components={components}
        styles={{
          control: (base) => ({
            ...base,
            backgroundColor: 'transparent',
            border: 'none',
            boxShadow: 'none',
            minHeight: 'none',
            padding: '0px',
            borderRadius: '0px',
            cursor: 'pointer',
            '&:hover': {
              border: 'none',
            },
            disabled: {
              opacity: '0.6',
              cursor: 'default',
            },
          }),
          valueContainer: (base) => ({
            ...base,
            padding: isEditing ? '0px' : '14px 16px',
            margin: '0px',
            disabled: {
              opacity: '0.6',
              cursor: 'default',
            },
          }),
          singleValue: (base) => ({
            ...base,
            color: 'inherit',
            margin: '0px',
          }),
          input: (base) => ({
            ...base,
            color: 'inherit',
            margin: '0px',
            padding: '0px',
            disabled: {
              opacity: '0.6',
              cursor: 'default',
            },
          }),
          placeholder: (base) => ({
            ...base,
            color: 'var(--color-secondary-light)',
            margin: '0px',
                        disabled: {
              opacity: '0.6',
              cursor: 'default',
            },
          }),
          indicatorSeparator: () => ({
            display: 'none',
          }),
          dropdownIndicator: (base) => ({
            ...base,
            color: 'var(--color-secondary-light)',
            padding: '0px 16px 0px 0px',
            cursor: 'pointer',
            '&:hover': {
              color: 'var(--color-secondary)',
            },
                        disabled: {
              opacity: '0.6',
              cursor: 'default',
            },
          }),
          menu: (base) => ({
            ...base,
            padding: '0px',
            backgroundColor: 'var(--color-surface-low, #f1f3ff)',
            border: '1px solid var(--color-slate-light, #c3c6d6)',
            boxShadow: 'var(--app-shadow)',
            borderRadius: '2px',
          }),
          menuList: (base) => ({
            ...base,
            padding: '0px',
          }),
          option: (base, state) => ({
            ...base,
            padding: '14px 16px',
            backgroundColor: state.isSelected
              ? 'var(--color-primary, #003d9b)'
              : state.isFocused
                ? 'var(--color-surface-high, #d7e2ff)'
                : 'transparent',
            color: state.isSelected
              ? '#ffffff'
              : 'var(--color-secondary, #434654)',
            cursor: 'pointer',
            '&:active': {
              backgroundColor: 'var(--color-primary-container, #0052cc)',
            },
          }),
          ...styles,
        }}
        {...props}
      />
    </div>
  );
};

export default SelectField;
