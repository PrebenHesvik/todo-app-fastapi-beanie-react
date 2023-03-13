import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { setTheme } from '../../store/theme/themeSlice';
import { selectTheme } from '../../store/theme/themeSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import './header.scss';

const Header = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector(selectTheme);

  const toggleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className='header'>
      <h2 className='header__title'>TODO</h2>
      {theme === 'light' ? (
        <FontAwesomeIcon
          className='header__theme-toggle'
          icon={faMoon}
          onClick={toggleTheme}
        />
      ) : (
        <FontAwesomeIcon
          className='header__theme-toggle'
          icon={faSun}
          onClick={toggleTheme}
        />
      )}
    </div>
  );
};

export default Header;
