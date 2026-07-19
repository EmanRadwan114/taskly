'use client';

import AllProjectsStats from './AllProjectsStats';
import { addDays } from 'date-fns';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  tasksCalendarSchema,
  TTasksCalendarInput,
} from '../validation/statistics.validation';
import 'react-day-picker/dist/style.css'; // Ensure style loads for popover
import AlertIcon from '@/assets/icons/alert.svg';
import WarningIcon from '@/assets/icons/warning.svg';
import CalendarIcon from '@/assets/icons/calender.svg';
import { useState, useRef, useEffect } from 'react';
import { ITasksStatsRequest } from '../types/statistics.types';
import { DayPicker, type DateRange } from 'react-day-picker';
import { format, addWeeks, subWeeks, startOfWeek, endOfWeek } from 'date-fns';
import {
  useFetchAllProjects,
  useFetchTasksCalendar,
} from '../hooks/statistics.hooks';
import FormField from '@/shared/components/ui/FormField';
import { taskStatusOptions } from '@/features/tasks/data/tasks.data';
import { TaskStatusEnum } from '@/features/tasks/types/tasks.types';
import ChevronLeftIcon from '@/assets/icons/chevron-left.svg';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg';
import TasksIcon from '@/assets/icons/total-tasks.svg';
import StatsCard from './StatsCard';
import Check from '@/assets/icons/check.svg';
import TasksStatsChart from './TasksStatsChart';
import StatsCalenderDay from './StatsCalenderDay';
import { useMobile } from '@/shared/hooks/shared.hooks';
import Button from '@/shared/components/ui/Button';
import LoadingStatistics from './LoadingStatistics';

const TasksStatistics: React.FC = () => {
  const today = new Date();
  const sevenDaysFromToday = addDays(today, 6);

  const [isOpen, setIsOpen] = useState(true);
  const popoverRef = useRef<HTMLDivElement>(null);

  const [anchorDate, setAnchorDate] = useState<Date>(
    (sevenDaysFromToday as Date) || new Date()
  );

  const [formValues, setFormValues] = useState<ITasksStatsRequest>({
    p_end_date: format(sevenDaysFromToday as Date, 'yyyy-MM-dd'),
    p_start_date: format(today as Date, 'yyyy-MM-dd'),
    p_project_id: null,
    p_status: null,
  });

  const { isMobile } = useMobile(1024);

  const { data: statsData, isLoading: tasksIsLoading } =
    useFetchTasksCalendar(formValues);
  const { data: projectsData, isLoading: projectsIsLoading } =
    useFetchAllProjects();

  const projects = projectsData?.response?.data;
  const stats = statsData?.response?.data;

  const {
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<TTasksCalendarInput>({
    resolver: zodResolver(tasksCalendarSchema),
    mode: 'onBlur',
    defaultValues: {
      dateRange: {
        from: today as Date,
        to: sevenDaysFromToday as Date,
      },
      p_project_id: '',
      p_status: '',
    },
  });

  // handlers
  const onHandleTasksFilter = (updatedRange?: DateRange) => {
    const targetFrom = updatedRange?.from || getValues('dateRange.from');
    const targetTo = updatedRange?.to || getValues('dateRange.to');

    const payload = {
      p_start_date: format(targetFrom as Date, 'yyyy-MM-dd'),
      p_end_date: format(targetTo as Date, 'yyyy-MM-dd'),
      p_project_id: getValues('p_project_id') || null,
      p_status: (getValues('p_status') as TaskStatusEnum) || null,
    };

    setFormValues(payload);
  };

  const handleWeekChange = (direction: 'prev' | 'next') => {
    const newAnchor =
      direction === 'prev' ? subWeeks(anchorDate, 1) : addWeeks(anchorDate, 1);
    setAnchorDate(newAnchor);

    const newFrom = startOfWeek(newAnchor, { weekStartsOn: 6 });
    const newTo = endOfWeek(newAnchor, { weekStartsOn: 6 });
    const nextRange = { from: newFrom, to: newTo };

    setValue('dateRange', nextRange, { shouldValidate: true });
    onHandleTasksFilter(nextRange);
  };

  if (tasksIsLoading || projectsIsLoading) {
    return <LoadingStatistics />;
  }

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    ...taskStatusOptions,
  ];

  const projectsOptions = [
    { value: '', label: isMobile ? 'All Active Projects' : 'All Projects' },
    ...(projects?.map((project) => ({
      value: project?.id,
      label: project?.name,
    })) || []),
  ];

  const inputContentStyle = `font-medium text-secondary leading-5 focus:outline-0! focus-within:outline-0! focus-visible:outline-0!`;

  const statusSelectField = (
    <FormField
      control={control}
      name="p_status"
      id="p_status"
      isSelect
      isEditing
      disabled={tasksIsLoading}
      className={`${inputContentStyle} bg-transparent! p-0!`}
      containerClassName={`bg-surface-low lg:bg-white! py-2! px-4! rounded-md w-fit! lg:min-w-40`}
      onChange={() => onHandleTasksFilter()}
      options={statusOptions}
    />
  );

  const projectSelectField = (
    <FormField
      control={control}
      name="p_project_id"
      id="p_project_id"
      isSelect
      isEditing
      disabled={tasksIsLoading}
      className={`${inputContentStyle} bg-transparent! p-0!`}
      containerClassName={`bg-surface-low lg:bg-white! py-2! px-4! rounded-md w-full lg:min-w-40`}
      onChange={() => onHandleTasksFilter()}
      options={projectsOptions}
    />
  );

  const calendarField = (
    <div className="flex flex-col gap-1.5 flex-1 lg:flex-0" ref={popoverRef}>
      <Controller
        name="dateRange"
        control={control}
        render={({ field }) => {
          const fromDate = field.value?.from;
          const toDate = field.value?.to;

          return (
            <>
              {/* date desktop view */}
              <div className="items-center gap-1 hidden lg:flex">
                {/* Prev Chevron */}
                <button
                  type="button"
                  disabled={tasksIsLoading}
                  onClick={() => handleWeekChange('prev')}
                  className="p-2 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50 cursor-pointer"
                >
                  <ChevronLeftIcon className="w-1 text-secondary" />
                </button>

                {/* Clickable Date Text Label */}
                <div
                  onClick={() => !tasksIsLoading && setIsOpen(!isOpen)}
                  className="text-sm font-semibold px-2 text-secondary whitespace-nowrap cursor-pointer hover:text-primary transition-colors py-1 rounded select-none"
                >
                  {fromDate && toDate ? (
                    <>
                      {format(fromDate, 'MMM d, yyyy')} –{' '}
                      {format(toDate, 'MMM d, yyyy')}
                    </>
                  ) : (
                    'Select Week'
                  )}
                </div>

                {/* Next Chevron */}
                <button
                  type="button"
                  disabled={tasksIsLoading}
                  onClick={() => handleWeekChange('next')}
                  className="p-2 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50 cursor-pointer"
                >
                  <ChevronRightIcon className="w-1 text-secondary" />
                </button>
              </div>
              {/* date mobile view */}
              <div className="items-center gap-1 flex lg:hidden bg-surface-low rounded-lg">
                {/* Clickable Date Text Label */}
                <div
                  onClick={() => !tasksIsLoading && setIsOpen(!isOpen)}
                  className="text-sm font-semibold px-2 text-secondary whitespace-nowrap cursor-pointer hover:text-primary transition-colors py-1 rounded select-none flex gap-2 items-center"
                >
                  <CalendarIcon className="text-secondary size-3" />
                  {fromDate && toDate ? (
                    <>
                      {format(fromDate, 'MMM d')} - {format(toDate, 'MMM d')}
                    </>
                  ) : (
                    'Select Week'
                  )}
                </div>
              </div>

              {/* dayPicker popover */}
              {isOpen && (
                <div className="absolute top-full left-0 mt-2 z-50 bg-white border border-gray-200 rounded-lg p-3 shadow-xl backdrop-blur-xs">
                  <DayPicker
                    mode="range"
                    selected={field.value}
                    weekStartsOn={6} // Saturday
                    classNames={{
                      day_button: 'size-6 cursor-pointer',
                      chevron: 'fill-secondary-light',
                      range_start: 'bg-primary/20 text-primary rounded-xs',
                      range_end: 'bg-primary/20 text-primary rounded-xs',
                      range_middle: 'bg-primary/20 text-primary rounded-xs',
                      today: 'text-primary',
                      selected: 'text-body-sm font-bold',
                    }}
                    onSelect={(value) => {
                      field.onChange(value);
                      if (value?.from) setAnchorDate(value.from);
                    }}
                    disabled={tasksIsLoading}
                    min={2}
                    max={6}
                  />
                  <div className="flex flex-col lg:flex-row gap-2 pt-2 border-t border-t-secondary-light/10 mt-5">
                    <Button
                      variant="ghost"
                      className="text-secondary!"
                      onClick={() => {
                        setIsOpen(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {
                        onHandleTasksFilter({
                          from: getValues('dateRange.from'),
                          to: getValues('dateRange.to'),
                        });
                        setIsOpen(false);
                      }}
                    >
                      Apply Range
                    </Button>
                  </div>
                </div>
              )}
            </>
          );
        }}
      />
      {errors.dateRange && (
        <div className="text-error flex gap-1 items-start">
          <AlertIcon className="size-3" />
          <p className="text-label">
            {errors.dateRange.message ||
              errors.dateRange.from?.message ||
              errors.dateRange.to?.message}
          </p>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* desktop filters */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="justify-between items-center gap-2 w-full lg:px-4 py-3 lg:bg-surface-low rounded-lg hidden lg:flex relative"
      >
        {calendarField}

        {/* Select Filters Dropdown */}
        <div className="-order-1 lg:order-0 flex-1 lg:flex-0">
          <div className="flex flex-col lg:flex-row items-center gap-4">
            {projectSelectField}
            {statusSelectField}
          </div>
        </div>
      </form>
      {/* mobile filters */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="gap-2 w-full lg:px-4 py-3 lg:bg-surface-low rounded-lg flex flex-col lg:hidden relative"
      >
        {projectSelectField}

        {/* Select Filters Dropdown */}
        <div className="">
          <div className="flex items-center gap-3">
            {statusSelectField}
            {calendarField}
          </div>
        </div>
      </form>

      {/* cards */}
      <div className="flex flex-col gap-3">
        {isMobile && (
          <h2 className="capitalize text-secondary font-bold text-body-xs leading-3.75">
            quick overview
          </h2>
        )}

        <div className="flex items-center gap-6 overflow-x-auto scrollbar-none">
          <StatsCard
            tasksLength={stats?.total_tasks}
            title="Total Tasks"
            icon={<TasksIcon className="size-3.75 lg:size-5 text-primary" />}
            iconBgColor="bg-primary-container/10"
          />

          <StatsCard
            tasksLength={stats?.done_tasks}
            title="Completed Tasks"
            icon={<Check className="size-3.75 lg:size-5 text-success-text" />}
            iconBgColor="bg-success-dark/20"
          />

          <StatsCard
            tasksLength={stats?.overdue_tasks}
            title="overdue Tasks"
            icon={<WarningIcon className="w-3.75 lg:w-5 text-error-dark" />}
            iconBgColor="bg-error-background/40"
            titleColor="text-error-dark"
          />
        </div>
      </div>

      {/* calendar */}
      <div className="flex flex-col lg:flex-row gap-6 scrollbar-none">
        {isMobile && (
          <h2 className="capitalize text-slate-dark font-bold text-heading-6 leading-7">
            Calendar
          </h2>
        )}
        {stats?.daily.map((day, index) => (
          <StatsCalenderDay key={index} dailyStats={day} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isMobile && (
          <h2 className="capitalize text-slate-dark font-bold text-heading-6 leading-7">
            Task Statistics
          </h2>
        )}
        <TasksStatsChart
          totals={stats?.totals}
          totalTasks={stats?.total_tasks}
        />
        <AllProjectsStats />
      </div>
    </>
  );
};

export default TasksStatistics;
