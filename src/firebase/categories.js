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

export const addCategory = async (name) => {
  const db = getDatabase();
  const path = `categories/${name}`;

  const snapshot = await get(child(ref(db), path));
  if (snapshot.exists()) {
    throw new Error('Name already exist.');
  }

  set(ref(db, path), { name });
};

export const useCategories = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const db = getDatabase();
    onValue(ref(db, 'categories'), (snapshot) => {
      setData(snapshot.val() || {});
    });
  }, []);

  return data;
};

export const editCategory = async (oldName, newName) => {
  const db = getDatabase();

  const snapshot = await get(child(ref(db), `categories/${newName}`));
  if (snapshot.exists()) {
    throw new Error('Name already exist.');
  }

  const updates = {};
  updates[`/categories/${oldName}`] = null;
  updates[`/categories/${newName}/name`] = newName;
  update(ref(db), updates);
};

export const deleteCategory = (data) => {
  const db = getDatabase();
  const updates = {};
  updates[`/categories/${data.name}`] = null;

  if ('menu' in data) {
    Object.keys(data.menu).forEach((menuName) => {
      updates[`/menu/${menuName}/category`] = null;
    });
  }
  updates[`/categories/${data.name}`] = null;

  update(ref(db), updates);
};
