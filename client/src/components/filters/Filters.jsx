import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  selectTodoItemsCount,
  selectTodoItemsFilter,
  clearCompletedTodoItems,
  setTodoFilter,
} from '../../store/todo/todoSlice';
import './filters.scss';

const Filters = () => {
  const dispatch = useDispatch();
  const itemsCount = useSelector(selectTodoItemsCount);
  const todoFilter = useSelector(selectTodoItemsFilter);

  // console.log('todoFilter: ', todoFilter);

  const filterTodoItemsHandler = (filter) => {
    dispatch(setTodoFilter(filter));
  };

  const clearCompletedTodoItemsHandler = () => {
    dispatch(clearCompletedTodoItems());
  };

  return (
    <div className='filters'>
      <div className='filters__counter-div'>
        <p className='filters__counter-text'>
          <span>{itemsCount}</span> items left
        </p>
      </div>
      <div className='filters__filters-div'>
        <p
          className={`filters__filters-selector ${
            todoFilter === 'All' ? 'active' : ''
          }`}
          onClick={() => filterTodoItemsHandler('All')}
        >
          All
        </p>
        <p
          className={`filters__filters-selector ${
            todoFilter === 'Active' ? 'active' : ''
          }`}
          onClick={() => filterTodoItemsHandler('Active')}
        >
          Active
        </p>
        <p
          className={`filters__filters-selector ${
            todoFilter === 'Completed' ? 'active' : ''
          }`}
          onClick={() => filterTodoItemsHandler('Completed')}
        >
          Completed
        </p>
      </div>
      <div className='filters__clear-completed-div'>
        <p
          className='filters__clear-completed'
          onClick={clearCompletedTodoItemsHandler}
        >
          Clear completed
        </p>
      </div>
    </div>
  );
};

export default Filters;
