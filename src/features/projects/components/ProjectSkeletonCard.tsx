const ProjectSkeletonCard: React.FC = ({}) => {
  return (
    <div className="rounded-lg p-6 bg-white flex flex-col gap-y-3.5">
      <div className="w-full h-32 rounded-sm bg-slate-lighter animate-pulse"></div>
      <div className="w-3/4 h-6 rounded-sm bg-slate-lighter animate-pulse"></div>
      <div className="w-4/6 h-3.5 rounded-sm bg-slate-lighter animate-pulse"></div>
    </div>
  );
};

export default ProjectSkeletonCard;
