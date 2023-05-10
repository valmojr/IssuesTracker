export interface Task {
  id: number;
  task: string;
  isDone: boolean;
}

export default {
  tasksGenerator: (body: string): Task[] => {
    const tasks = body.split('\n');
    const result: Task[] = tasks.map((task, id) => {
      const isDone = task.startsWith('- [X]') || task.startsWith('- [x]');
      const cleanedTask = task
        .replace(/^- \[[xX]\] /, '')
        .replace(/^- \[ \] /, '');
      return { id, task: cleanedTask, isDone };
    });

    return result;
  },

  bodyGenerator: (tasks: Task[]) => {
    const body = '';

    tasks.forEach((task) => {
      task.isDone
        ? body.concat('- [x] ' + task.task + '\n')
        : body.concat('- [ ] ' + task.task + '\n');
    });

    return body;
  },
};
