import { useState, useEffect } from 'react';
import { apiGet, apiPost } from '../api';
import { parseError } from '../util';

export function useStudents(searchQuery = '') {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = async (query) => {
    setLoading(true);
    setError('');
    try {
      const qp = query && query.trim() ? `?q=${encodeURIComponent(query.trim())}` : '';
      const data = await apiGet(`/students${qp}`);
      setStudents(data);
    } catch (e) {
      setError(parseError(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(searchQuery);
  }, [searchQuery]);

  const addStudent = async (form) => {
    setError('');
    try {
      await apiPost('/students', form);
      await load(searchQuery);
      return true;
    } catch (e) {
      setError(parseError(e));
      return false;
    }
  };

  return { students, loading, error, load, addStudent };
}
