'use client';

import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function GlobalNetworkGuard() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const verifyNetworkBeforeExecution = (event: Event) => {
      if (!navigator.onLine) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        toast.error("Network Error. You're Offline");
      }
    };

    window.addEventListener('click', verifyNetworkBeforeExecution, true);
    window.addEventListener('submit', verifyNetworkBeforeExecution, true);

    return () => {
      window.removeEventListener('click', verifyNetworkBeforeExecution, true);
      window.removeEventListener('submit', verifyNetworkBeforeExecution, true);
    };
  }, []);

  return null;
}
