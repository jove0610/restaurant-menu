import { useState, useEffect } from 'react';
import {
  getDatabase,
  ref,
  onValue,
  update,
  set,
  get,
  child,
} from 'firebase/database';

export const addOptionItem = async ({
  menuName,
  optionName,
  cost,
  price,
  stock,
}) => {
  const db = getDatabase();
  const path = `options/${menuName}/${optionName}`;

  const snapshot = await get(child(ref(db), path));
  if (snapshot.exists()) {
    throw new Error('Name already exist.');
  }

  set(ref(db, path), { name: optionName, cost, price, stock });
};

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

export const deleteOptionItem = (menuName, itemName) => {
  const db = getDatabase();
  const updates = {};
  updates[`/options/${menuName}/${itemName}`] = null;

  update(ref(db), updates);
};
