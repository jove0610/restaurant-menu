import { useState, useEffect } from 'react';
import {
  getDatabase,
  ref,
  set,
  onValue,
  update,
  get,
  child,
} from 'firebase/database';

export const addMenu = async (name, category, options) => {
  const db = getDatabase();

  const snapshot = await get(child(ref(db), `menu/${name}`));
  if (snapshot.exists()) {
    throw new Error('Name already exist.');
  }

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

export const editMenu = async (oldData, newData) => {
  const db = getDatabase();

  const updates = {};
  updates[`/menu/${oldData.name}`] = null;
  updates[`/menu/${newData.name}`] = newData;
  updates[`/categories/${oldData.category}/menu/${oldData.name}`] = null;
  updates[`/categories/${newData.category}/menu/${newData.name}`] = true;

  const snapshot = await get(child(ref(db), `options/${oldData.name}`));
  if (snapshot.exists()) {
    updates[`/options/${oldData.name}`] = null;
    updates[`/options/${newData.name}`] = snapshot.val();
  }

  update(ref(db), updates);
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
