import React, {memo, useState} from 'react';
import {FaCheck} from "react-icons/fa";
import {CiEdit} from "react-icons/ci";
import {TiDeleteOutline} from "react-icons/ti";
import {ITask} from "../interfaces/ITask";
import {TSetState} from "../types/TSetState";

interface ITaskProps {
  task: ITask
  setTasks: TSetState<ITask[]>
}

const Task: React.FC<ITaskProps> = memo(({task, setTasks}) => {
  const [value, setValue] = useState(task.value);

  function onClickChangeIsReady(id: number) {
    setTasks((state) => {
      return state.map(task => {
        if (task.id === id) {
          return {...task, isReady: !task.isReady}
        }

        return task;
      })
    })
  }

  function onClickDelete(id: number) {
    setTasks((state) => {
      return state.filter(task => task.id !== id);
    })
  }

  function onClickChangeIsEdit(id: number) {
    setTasks((state) => {
      return state.map(task => {
        if (task.id === id) {
          return {...task, isEdit: !task.isEdit}
        }

        return task;
      })
    })
  }

  function onChangeValue(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
  }

  function onClickSaveStateToTasks(id: number) {
    if (value.trim().length === 0) {
      return;
    }

    setTasks((state) => {
      return state.map(task => {
        if (task.id === id) {
          return {...task, isEdit: false, value: value.trim()}
        }

        return task;
      });
    })
  }

  return <li className="tasks__item task">
    {!task.isEdit && <>
      <div className={task.isReady ? "task__checkbox task__checkbox_active" : "task__checkbox"}
           onClick={() => onClickChangeIsReady(task.id)}>
        <FaCheck/>
      </div>
      <label className="task__text"
             title={task.value} onClick={() => onClickChangeIsReady(task.id)}>
        {task.value}
      </label>
    </>}
    {task.isEdit && <input type="text"
                           className="task__input-text"
                           placeholder="Enter text"
                           value={value}
                           onChange={onChangeValue}/>}
    <div className="task__buttons">
      {!task.isEdit && <>
        <button className="task__button" onClick={() => onClickChangeIsEdit(task.id)}><CiEdit/></button>
        <button className="task__button" onClick={() => onClickDelete(task.id)}><TiDeleteOutline/></button>
      </>}
      {task.isEdit &&
        <button className="task__save-button" onClick={() => onClickSaveStateToTasks(task.id)}>Save</button>}
    </div>
  </li>;
});

export default Task;