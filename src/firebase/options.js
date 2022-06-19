import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';

export const useOptionsByName = (name = null) => {
  if (name === null) {
    return {};
  }
  const [data, setData] = useState({});

  useEffect(() => {
    const db = getDatabase();

    onValue(ref(db, `options/${name}`), (snapshot) => {
      setData(snapshot.val() || {});
    });
  }, []);

  return data;
};
