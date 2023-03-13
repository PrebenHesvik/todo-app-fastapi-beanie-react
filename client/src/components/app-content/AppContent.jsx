import Header from '../header/Header';
import Input from '../input/Input';
import Todos from '../todos/Todos';
import Filters from '../filters/Filters';

import './app-content.scss';

const AppContent = () => {
  return (
    <div className='app-content'>
      <Header />
      <Input />
      <Todos />
    </div>
  );
};

export default AppContent;
