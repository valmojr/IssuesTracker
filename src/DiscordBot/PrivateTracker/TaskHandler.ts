import { DMChannel, MessageCreateOptions } from 'discord.js';
import { Task } from '../../Util/ParseBody';

const TaskMessage = (task: Task): MessageCreateOptions => {
  //const button = task.isDone ? DoButton : DoneButton;

  return {
    content: task.task,
  };
};

export default (tasks: Task[], targetChannel: DMChannel) => {
  tasks.forEach((task) => {
    targetChannel.send(TaskMessage(task));
  });
};
