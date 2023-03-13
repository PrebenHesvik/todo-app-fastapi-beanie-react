import { useState } from 'react';

import './checkbox.scss';

const Checkbox = ({ label, isChecked, toggleIsCompletedHandler, ...props }) => {
  //const defaultChecked = checked ? checked : false;
  //const [isChecked, setIsChecked] = useState(defaultChecked);

  return (
    <div className='checkbox-wrapper'>
      <label>
        <input
          type='checkbox'
          checked={isChecked}
          onChange={toggleIsCompletedHandler}
          className={isChecked ? 'checked' : ''}
          {...props}
        />
        <span>{label}</span>
      </label>
    </div>
  );
};
export default Checkbox;
