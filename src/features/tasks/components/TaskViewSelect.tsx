'use client';

import Select from 'react-select';
import BoardIcon from '@/assets/icons/board.svg';
import ListIcon from '@/assets/icons/list.svg';

const TaskViewSelect: React.FC = ({}) => {
  const options = [
    {
      label: 'Board View',
      value: 'board',
      icon: <BoardIcon className="text-slate-dark w-3.5" />,
    },
    {
      label: 'List View',
      value: 'list',
      icon: <ListIcon className="text-primary w-2.75" />,
    },
  ];
  return (
    <Select
      options={options}
      className="w-44"
      classNamePrefix="custom"
      isSearchable={false}
      defaultValue={options[0]}
      components={{
        IndicatorSeparator: () => null,
      }}
      styles={{
        control: (provided) => ({
          ...provided,
          backgroundColor: 'white',
          border: '1px solid #C3C6D633',
          boxShadow: 'var(--app-shadow)',
          padding: '4px 8px',
          borderRadius: '4px',
          alignItems: 'center',
        }),
        indicatorsContainer: (provided) => ({
          ...provided,
          color: 'var(--slate-dark)',
        }),
      }}
      formatOptionLabel={({ label, icon }) => (
        <div className="flex items-center gap-2">
          <span>{icon}</span>
          <span className="text-body font-medium text-slate-dark leading-5 capitalize">
            {label}
          </span>
        </div>
      )}
    />
  );
};

export default TaskViewSelect;
