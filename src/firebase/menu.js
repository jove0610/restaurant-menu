import { useState, useEffect } from 'react';
import { getDatabase, ref, set, onValue, update } from 'firebase/database';

export const addMenu = ({ name, category, options }) => {
  const db = getDatabase();

  const newOptions = {};
  options.forEach((option) => {
    const optionName = option.name || '_defaultOptionName';
    newOptions[optionName] = {
      name: optionName,
      price: option.price,
      cost: option.cost,
      stock: option.stock,
    };
  });

  set(ref(db, `menu/${name}`), { name, category });
  set(ref(db, `options/${name}`), newOptions);
  set(ref(db, `categories/${category}/menu/${name}`), true);
};

export const useMenu = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const db = getDatabase();
    onValue(ref(db, 'menu'), (snapshot) => {
      setData(snapshot.val() || {});
    });
  }, []);

  return data;
};

export const deleteMenu = (data) => {
  const db = getDatabase();
  const updates = {};
  updates[`/menu/${data.name}`] = null;
  updates[`/options/${data.name}`] = null;

  if ('category' in data) {
    updates[`/category/${data.category}/menu/${data.name}`] = null;
  }
  updates[`/categories/${data.name}`] = null;

  update(ref(db), updates);
};
