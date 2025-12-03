import { useState } from 'react';

export default function useLoading(delay = 500) {
  const [loading, setLoading] = useState(false);

  const withLoading = (action) => {
    setLoading(true);
    setTimeout(() => {
      action();
      setLoading(false);
    }, delay);
  };

  return { loading, withLoading };
}