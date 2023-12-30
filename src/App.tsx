import React, {useCallback, useRef, useState} from 'react';
import "./css/normalize.css";
import "./css/style.css";
import Field from "./Components/Field";
import {ITask} from "./interfaces/ITask";
import Tasks from "./Components/Tasks";
import {useLocalStorage} from "./hooks/useLocalStorage";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const tasksRef = useRef<ITask[]>(tasks);
  tasksRef.current = tasks;

  useLocalStorage<ITask[]>("tasks", setTasks, tasksRef)

  const setTasksCallback = useCallback(setTasks, []);

  return <div className="wrapper">
    <Field setTasks={setTasksCallback}/>
    <Tasks tasks={tasksRef} setTasks={setTasksCallback}/>
  </div>;
};

export default App;