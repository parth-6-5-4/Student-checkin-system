export function parseError(e) {
  try {
    const obj = JSON.parse(e.message);
    if (obj?.message) return obj.message;
    if (obj?.errors?.length) return obj.errors.map(x => x.msg || x.path).join(', ');
  } catch (_) {}
  return e.message || 'Request failed';
}

export function formatDate(d) {
  if (!d) return '';
  const date = new Date(d);
  return date.toLocaleString();
}
