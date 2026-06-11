import ProjectSkeletonCard from './ProjectSkeletonCard';

const LoadingProjects: React.FC = ({}) => {
  return (
    <section className="flex flex-col gap-16px">
      {/* header */}
      <header className="flex justify-between items-end">
        <div className="flex flex-col gap-4px">
          <h1 className="font-semibold text-[30px] text-slate-dark capitalize">
            Projects
          </h1>
          <p className="text-secondary">Manage and curate your projects</p>
        </div>
        {/* desktop add project btn */}
        <div className="w-52 h-10 rounded-4px bg-slate-lighter animate-pulse hidden lg:block"></div>
      </header>
      {/* skeleton */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-24px pb-10 lg:pb-20">
        {Array.from({ length: 12 })?.map((_, idx) => (
          <ProjectSkeletonCard key={idx} />
        ))}
      </section>
    </section>
  );
};

export default LoadingProjects;
