import { useSelector } from 'react-redux';

import Todo from '../todo/Todo';
import Filters from '../filters/Filters';
import { selectDisplayedTodoItems } from '../../store/todo/todoSlice';
import './todos.scss';

const Todos = () => {
  const todos = useSelector(selectDisplayedTodoItems);

  return (
    <>
      <div className='todos'>
        {todos.length > 0 ? (
          todos.map((todo) => <Todo key={todo.id} todo={todo} />)
        ) : (
          <div className='todo'>No todos</div>
        )}
        <Filters />
      </div>
    </>
  );
};

export default Todos;
