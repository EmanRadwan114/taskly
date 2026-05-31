import Button from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="container mx-auto flex flex-col gap-2 w-52">
      <h1 className="text-display-lg gap-1.75">Taskly</h1>
      <h2 className="text-headline-lg">Taskly</h2>
      <h3 className="text-title-md">Taskly</h3>
      <p className="text-body-md">Taskly</p>
      <p className="text-label-sm">Taskly</p>
      <button className="primary-gradient rounded-4px p-8px">btn</button>
      <Button>button</Button>
      <Button variant="secondary">button</Button>
      <Button variant="ghost">button</Button>
    </div>
  );
}
