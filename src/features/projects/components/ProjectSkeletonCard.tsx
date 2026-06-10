const ProjectSkeletonCard: React.FC = ({}) => {
  return (
    <div className="rounded-8px p-24px bg-white flex flex-col gap-y-14px">
      <div className="w-full h-32 rounded-4px bg-slate-lighter animate-pulse"></div>
      <div className="w-3/4 h-6 rounded-4px bg-slate-lighter animate-pulse"></div>
      <div className="w-4/6 h-3.5 rounded-4px bg-slate-lighter animate-pulse"></div>
    </div>
  );
};

export default ProjectSkeletonCard;
