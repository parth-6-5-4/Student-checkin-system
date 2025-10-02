import { useState, useEffect } from 'react';
import { apiGet, apiPost } from '../api';
import { parseError } from '../util';

export function useCheckins() {
  const [checkins, setCheckins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [todayCount, setTodayCount] = useState(null);

  const load = async (from = '', to = '') => {
    setLoading(true);
    setError('');
    try {
      const qs = [];
      if (from) qs.push(`from=${from}`);
      if (to) qs.push(`to=${to}`);
      const query = qs.length ? `?${qs.join('&')}` : '';
      const data = await apiGet(`/checkins${query}`);
      setCheckins(data);
      const today = await apiGet('/checkins/todayCount');
      setTodayCount(today?.count ?? 0);
    } catch (e) {
      setError(parseError(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const checkIn = async (studentId) => {
    setError('');
    try {
      await apiPost('/checkin', { studentId: studentId.trim() });
      await load();
      return true;
    } catch (e) {
      setError(parseError(e));
      return false;
    }
  };

  return { checkins, loading, error, todayCount, load, checkIn };
}
