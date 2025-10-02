import React, { useState } from 'react';
import { useStudents } from '../hooks/useStudents';
import { SearchInput } from '../components/SearchInput';
import { StudentForm } from '../components/StudentForm';
import { StudentsTable } from '../components/StudentsTable';

export function StudentsPage() {
  const [q, setQ] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { students, loading, error, addStudent } = useStudents(q);

  const handleAddStudent = async (form) => {
    setSubmitting(true);
    const success = await addStudent(form);
    setSubmitting(false);
    return success;
  };

  return (
    <>
      <section className="card">
        <h2>Add New Student</h2>
        <div className="form-section">
          <StudentForm onSubmit={handleAddStudent} submitting={submitting} />
          {error && <p className="error">{error}</p>}
        </div>
      </section>

      <section className="card">
        <h2>All Students</h2>
        <div className="filter-section">
          <SearchInput
            value={q}
            onChange={setQ}
            placeholder="Filter by name or Student ID"
          />
        </div>

        {loading && <p className="muted">Loading students…</p>}

        <StudentsTable students={students} loading={loading} />
      </section>
    </>
  );
}
