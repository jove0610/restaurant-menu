import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { updateTitle } from '../redux/appSlice';

// This hook will change the title found on the AppBar (Top Menu)
const useTitle = (newTitle) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateTitle(newTitle));
  }, []);
};

export default useTitle;
