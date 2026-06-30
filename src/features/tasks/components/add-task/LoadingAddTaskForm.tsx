const LoadingAddTaskForm: React.FC = () => {
  return (
    <div className="lg:bg-white rounded-lg lg:shadow-primary lg:px-9 lg:py-10 flex flex-col gap-9 animate-pulse">
      {/* form fields */}
      <div className="flex flex-col gap-8">
        {/* title */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <div className="h-5 w-12 bg-slate-200 rounded" />
          <div className="h-12 w-full bg-slate-200 rounded-md" />
        </div>

        {/* status & assignee row */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* status */}
          <div className="flex flex-col gap-1.5 w-full">
            <div className="h-5 w-14 bg-slate-200 rounded" />
            <div className="h-12 w-full bg-slate-200 rounded-md" />
          </div>
          {/* assignee */}
          <div className="flex flex-col gap-1.5 w-full">
            <div className="h-5 w-18 bg-slate-200 rounded" />
            <div className="h-12 w-full bg-slate-200 rounded-md" />
          </div>
        </div>

        {/* epic */}
        <div className="flex flex-col gap-1.5">
          <div className="h-5 w-10 bg-slate-200 rounded" />
          <div className="h-12 w-full bg-slate-200 rounded-md" />
        </div>

        {/* due date */}
        <div className="flex flex-col gap-1.5">
          <div className="h-5 w-20 bg-slate-200 rounded" />
          <div className="h-12 w-full bg-slate-200 rounded-md" />
        </div>

        {/* description */}
        <div className="flex flex-col gap-1.5">
          <div className="h-5 w-24 bg-slate-200 rounded" />
          <div className="h-32 w-full bg-slate-200 rounded-md" />
        </div>

        {/* action buttons */}
        <div className="flex flex-col lg:flex-row justify-end items-end gap-4 mt-6">
          <div className="h-12 w-full lg:w-24 bg-slate-200 rounded-md order-1 lg:order-0" />
          <div className="h-12 w-full lg:w-32 bg-slate-200 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default LoadingAddTaskForm;
