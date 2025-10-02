import { useState, useEffect } from 'react';
import { apiGet } from '../api';
import { parseError } from '../util';

export function useStudentDetail(studentId) {
  const [student, setStudent] = useState(null);
  const [checkins, setCheckins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = async (from = '', to = '') => {
    setLoading(true);
    setError('');
    try {
      const s = await apiGet(`/students/${encodeURIComponent(studentId)}`);
      setStudent(s);
      const qs = [];
      if (from) qs.push(`from=${from}`);
      if (to) qs.push(`to=${to}`);
      const query = qs.length ? `?${qs.join('&')}` : '';
      const c = await apiGet(`/students/${encodeURIComponent(studentId)}/checkins${query}`);
      setCheckins(c);
    } catch (e) {
      setError(parseError(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (studentId) {
      load();
    }
  }, [studentId]);

  return { student, checkins, loading, error, load };
}
