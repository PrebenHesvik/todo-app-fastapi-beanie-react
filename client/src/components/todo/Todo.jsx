import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';

import { removeTodoItem, toggleIsCompleted } from '../../store/todo/todoSlice';

import Checkbox from '../checkbox/Checkbox';

import './todo.scss';

const Todo = ({ todo }) => {
  const { id, text, isCompleted } = todo;
  const dispatch = useDispatch();

  console.log('TDO CHECKED??', todo.isCompleted);

  const toggleIsCompletedHandler = () => {
    dispatch(toggleIsCompleted(todo));
  };

  const removeTodoHandler = () => {
    dispatch(removeTodoItem(todo));
  };

  return (
    <div className='todo'>
      <div className='todo__is-completed-div'>
        <Checkbox
          isChecked={todo.isCompleted}
          toggleIsCompletedHandler={toggleIsCompletedHandler}
        />
      </div>
      <div className='todo__text-div'>
        <p className='todo__text'>{text}</p>
      </div>
      <div className='todo__delete-todo-div'>
        <FontAwesomeIcon
          className='header__theme-toggle'
          icon={faXmark}
          onClick={removeTodoHandler}
        />
      </div>
    </div>
  );
};

export default Todo;
