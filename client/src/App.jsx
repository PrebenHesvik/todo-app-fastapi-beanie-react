import { useSelector } from 'react-redux';
import { selectTheme } from './store/theme/themeSlice';

import Hero from './components/hero/Hero';
import AppContent from './components/app-content/AppContent';

import './app.scss';

function App() {
  const { theme } = useSelector(selectTheme);

  console.log('theme: ', theme);
  return (
    <div className={`theme-${theme}`}>
      <div className='app'>
        <Hero />
        <div className='app-content-div'>
          <AppContent />
        </div>
      </div>
    </div>
  );
}

export default App;
