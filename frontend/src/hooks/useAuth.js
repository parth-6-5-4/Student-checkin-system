import { useState, useEffect } from 'react';
import { apiGet, apiPost } from '../api';

export function useAuth() {
  const [admin, setAdmin] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const me = await apiGet('/admin/me');
        if (mounted) setAdmin(me);
      } catch (_) {
        if (mounted) setAdmin(null);
      } finally {
        if (mounted) setAuthLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const logout = async () => {
    try {
      await apiPost('/admin/logout', {});
    } catch (_) {}
    setAdmin(null);
  };

  return { admin, authLoading, logout };
}
