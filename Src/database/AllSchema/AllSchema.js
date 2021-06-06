import { v4 as uuidv4 } from 'uuid';
export const TASK_LIST_SCHEMA = 'TaskList';
export const TASK_SCHEMA = 'Task';
export const TaskSchema = {
  name: TASK_LIST_SCHEMA,
  primaryKey: '_id',
  properties: {
    _id: 'string',
    name: 'string',
    status: 'string?',
  },
};
