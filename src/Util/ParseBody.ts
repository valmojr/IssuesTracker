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
        .replace(/^- \[ \] /, '')
        .replace(/\r/g, '');
      return { id, task: cleanedTask, isDone };
    });

    return result;
  },

  bodyGenerator: (tasks: Task[]) => {
    let body = '';

    tasks.forEach((task) => {
      task.isDone
        ? (body = body.concat('- [x] ' + task.task + '\r\n'))
        : (body = body.concat('- [ ] ' + task.task + '\r\n'));
    });

    return body;
  },
};
