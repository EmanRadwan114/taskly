'use client';

import Select, { GroupBase, Props as SelectProps } from 'react-select';

export interface SelectOption {
  value: string | number;
  label: string;
}

interface IProps extends Omit<
  SelectProps<SelectOption, false, GroupBase<SelectOption>>,
  'theme'
> {
  variant?: 'default' | 'error';
  inputClassName?: string;
}

const SelectField = ({
  variant = 'default',
  inputClassName = '',
  ...props
}: IProps) => {
  const selectVariants = {
    default:
      'bg-surface-high text-secondary focus-within:outline-primary focus-visible:outline-primary',
    error:
      'bg-error-background text-error-dark focus-within:outline-error-dark focus-visible:outline-error-dark',
  };

  return (
    <div
      className={`w-full flex justify-between items-center gap-0.5 rounded-sm focus-within:outline-1 focus-visible:outline-1 ${selectVariants[variant]} ${props.className || ''}`}
    >
      <Select
        className={`w-full ${inputClassName}`}
        styles={{
          container: (base) => ({
            ...base,
            width: '100%',
            padding: '14px 16px',
            borderRadius: '4px',
            disabled: {
              opacity: '0.2',
              cursor: 'default',
            },
          }),
          control: (base) => ({
            ...base,
            backgroundColor: 'transparent',
            border: 'none',
            boxShadow: 'none',
            minHeight: 'none',
            borderRadius: '0px',
            padding: '0px',
            cursor: 'pointer',
            '&:hover': {
              border: 'none',
            },
            disabled: {
              opacity: '0.2',
              cursor: 'default',
            },
          }),
          valueContainer: (base) => ({
            ...base,
            margin: '0px',
            padding: '0px',
            disabled: {
              opacity: '0.2',
              cursor: 'default',
            },
          }),
          singleValue: (base) => ({
            ...base,
            color: 'inherit',
            margin: '0px',
            padding: '0px',
          }),
          input: (base) => ({
            ...base,
            color: 'inherit',
            margin: '0px',
            padding: '0px',
            disabled: {
              opacity: '0.2',
              cursor: 'default',
            },
          }),
          placeholder: (base) => ({
            ...base,
            color: 'var(--color-secondary-light)',
            margin: '0px',
            disabled: {
              opacity: '0.2',
              cursor: 'default',
            },
          }),
          indicatorSeparator: () => ({
            display: 'none',
            padding: '0',
          }),
          indicatorsContainer: (base) => ({
            ...base,
            padding: '0',
          }),
          dropdownIndicator: (base) => ({
            ...base,
            color: 'var(--color-secondary-light)',
            padding: '0',
            cursor: 'pointer',
            width: '16px',
            '&:hover': {
              color: 'var(--color-secondary)',
            },
            disabled: {
              opacity: '0.2',
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
            padding: '8px 12px',
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
        }}
        {...props}
      />
    </div>
  );
};

export default SelectField;
