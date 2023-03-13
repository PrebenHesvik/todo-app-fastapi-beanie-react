import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addTodoItem, selectNextTodoId } from '../../store/todo/todoSlice';

import './input.scss';
const Input = () => {
  const dispatch = useDispatch();
  const [todoText, setTodoText] = useState('');
  const nextId = useSelector(selectNextTodoId);

  console.log('NEWXT ID: ', nextId);

  const changeHandler = (event) => {
    const todoText = event.target.value;
    setTodoText(todoText);
  };

  const clickHandler = (event) => {
    if (event.key === 'Enter' && todoText !== '') {
      const todoItem = { id: nextId, text: todoText, isCompleted: false };
      dispatch(addTodoItem(todoItem));
      setTodoText('');
    }
  };

  return (
    <input
      type='text'
      name=''
      placeholder='Add todo'
      id='todo-input'
      value={todoText}
      onChange={(event) => changeHandler(event)}
      onKeyDown={(event) => clickHandler(event)}
    />
  );
};

export default Input;
