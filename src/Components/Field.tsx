import React, {memo, useState} from 'react';
import {IoAdd} from "react-icons/io5";
import {ITask} from "../interfaces/ITask";
import {TSetState} from "../types/TSetState";

interface IFieldProps {
  setTasks: TSetState<ITask[]>
}

function addTask(value: string, setTasks: TSetState<ITask[]>): void {
  if (value.trim().length === 0) {
    return;
  }

  setTasks((tasks) => {
    return [...tasks, {
      id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
      value: value.trim(),
      isReady: false,
      isEdit: false
    }];
  })
}

const Field: React.FC<IFieldProps> = memo(({setTasks}) => {
  const [value, setValue] = useState("");

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
  }

  function onClickHandler() {
    addTask(value, setTasks);
    setValue("");
  }

  function onKeyDownHandler(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.code !== "Enter") {
      return;
    }

    addTask(value, setTasks);
    setValue("");
  }

  return <div className="field">
    <input type="text" className="field__input"
           placeholder="Add task"
           value={value}
           onChange={onChangeHandler}
           onKeyDown={onKeyDownHandler}/>
    <button className="field__button" onClick={onClickHandler}>
      <IoAdd/>
    </button>
  </div>;
});

export default Field;