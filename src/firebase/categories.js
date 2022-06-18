import { useState, useEffect } from 'react';
import { getDatabase, ref, set, onValue, update } from 'firebase/database';

export const addCategory = ({ name }) => {
  const db = getDatabase();
  set(ref(db, `categories/${name}`), { name });
};

export const useCategories = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const db = getDatabase();
    onValue(ref(db, `categories`), (snapshot) => {
      setData(snapshot.val() || {});
    });
  }, []);

  return data;
};

export const editCategory = (oldData, newData) => {
  const db = getDatabase();
  const updates = {};
  updates[`/categories/${oldData.name}`] = null;
  updates[`/categories/${newData.name}`] = newData;

  update(ref(db), updates);
};

export const deleteCategory = (data) => {
  const db = getDatabase();
  const updates = {};
  updates[`/categories/${data.name}`] = null;

  update(ref(db), updates);
};
