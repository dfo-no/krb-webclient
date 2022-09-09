import { useEffect, useState } from 'react';

export const useFeatureFlags = () => {
  const [items, setItems] = useState(['']);

  useEffect(() => {
    const key = 'feature_flags';

    try {
      const featureFlags = JSON.parse(localStorage.getItem(key) ?? '""');
      if (featureFlags) {
        setItems(featureFlags);
      } else {
        localStorage.setItem(key, JSON.stringify([]));
      }
    } catch (e) {
      localStorage.setItem(key, JSON.stringify([]));
    }
  }, []);

  return items;
};
