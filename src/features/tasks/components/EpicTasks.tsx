import EpicTaskItem from './EpicTaskItem';

const EpicTasks: React.FC = ({}) => {
  return (
    <section className="lg:border lg:border-slate-light/30 lg:rounded-lg lg:divide-y lg:divide-slate-light/30 flex flex-col gap-3 lg:gap-0">
      <EpicTaskItem />
    </section>
  );
};

export default EpicTasks;
