import { useState } from 'react';

function useToggleBtn(initialState) {

  const [isChecked, setIsChecked] = useState(initialState === "false" ? false : true);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return [isChecked, handleToggle];
}

export default useToggleBtn