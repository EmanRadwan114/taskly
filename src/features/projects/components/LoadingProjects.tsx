import ProjectSkeletonCard from './ProjectSkeletonCard';

const LoadingProjects: React.FC = ({}) => {
  return (
    <section className="flex flex-col gap-16px">
      {/* page header skeleton */}
      <header className="lg:justify-between lg:items-center flex gap-16px flex-col lg:flex-row mb-5 lg:mb-10 animate-pulse">
        {/* Title skeleton */}
        <div className="h-10 bg-slate-200 rounded-md w-56 max-w-full" />

          {/* new epic button skeleton */}
          <div className="h-12 bg-slate-200 rounded-md w-32 hidden lg:block" />
      </header>
      {/* skeleton */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-24px pb-10 lg:pb-20">
        {Array.from({ length: 12 })?.map((_, idx) => (
          <ProjectSkeletonCard key={idx} />
        ))}
      </section>
    </section>
  );
};

export default LoadingProjects;
