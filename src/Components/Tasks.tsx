import React from 'react';
import {ITask} from "../interfaces/ITask";
import Task from "./Task";
import {TSetState} from "../types/TSetState";

interface ITasksProps {
  tasks: {current:ITask[]}
  setTasks:TSetState<ITask[]>
}

const Tasks: React.FC<ITasksProps> = ({tasks,setTasks}) => {
  return <div className="tasks">
    <h1 className="tasks__title">{tasks.current.length > 0 ? "Tasks" : "List is empty"}</h1>
    <ul className="tasks__items">
      {tasks.current.map(task => {
        return <Task key={task.id} task={task} setTasks={setTasks}/>
      })}
    </ul>
  </div>;
};

export default Tasks;