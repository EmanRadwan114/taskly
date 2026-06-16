export default function Loading() {
  return (
    <header className="lg:justify-between lg:items-center flex gap-4 flex-col lg:flex-row mb-5 lg:mb-10 animate-pulse">
      {/*  breadcrumb Title skeleton & */}
      <div className="flex flex-col gap-4">
        <div className="h-5 bg-slate-200 rounded-md w-80 max-w-full" />
        <div className="h-10 bg-slate-200 rounded-md w-56 max-w-full" />
      </div>

      {/* new epic button skeleton */}
      <div className="h-12 bg-slate-200 rounded-md w-32 hidden lg:block" />
    </header>
  );
}
