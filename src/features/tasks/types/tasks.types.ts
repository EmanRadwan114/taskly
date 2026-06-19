export enum TaskStatusEnum {
  TODO = 'TO_DO',
  IN_PROGRESS = 'IN_PROGRESS',
  BLOCKED = 'BLOCKED',
  IN_REVIEW = 'IN_REVIEW',
  READY_FOR_QA = 'READY_FOR_QA',
  REOPENED = 'REOPENED',
  READY_FOR_PRODUCTION = 'READY_FOR_PRODUCTION',
  DONE = 'DONE',
}

export interface ITask {
  id: string;
  project_id: string;
  epic_id: string;
  title: string;
  description: string;
  status: TaskStatusEnum;
  created_at: string;
  due_date: string;
  task_id: string;
  epic: {
    id: string;
    title: string;
    epic_id: string;
  };
  created_by: {
    id: string;
    name: string;
    email: string;
    department: string;
  };
  assignee: {
    id: string;
    name: string;
    email: string;
    department: string;
  };
}
