import { ColorResolvable } from 'discord.js';
import { Task } from '../../../Util/ParseBody';

export default (tasks: Task[]): ColorResolvable => {
  const totalTasks = tasks.length;
  const totalCompletedTasks = tasks.filter((task) => task.isDone).length;
  const completedRatio = totalCompletedTasks / totalTasks;

  if (completedRatio <= 0.25) {
    return '#FF0000';
  } else if (completedRatio <= 0.5) {
    return '#FFA500';
  } else if (completedRatio <= 0.75) {
    return '#FFFF00';
  } else {
    return '#00FF00';
  }
};
