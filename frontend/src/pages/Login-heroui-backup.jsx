import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardFooter, Input, Button } from '@heroui/react';
import { apiPost } from '../api';
import { parseError } from '../util';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ adminId: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const body = form.adminId ? { adminId: form.adminId, password: form.password } : { email: form.email, password: form.password };
      await apiPost('/admin/login', body);
      const from = location.state?.from?.pathname || '/students';
      window.location.replace(from);
    } catch (e) {
      setError(parseError(e));
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <Card className="max-w-[480px] mx-auto mt-8">
        <CardHeader className="flex flex-col gap-1 items-start">
          <h2 className="text-2xl font-semibold">Admin Login</h2>
          <p className="text-small text-default-500">Login with Admin ID or Gmail + password</p>
        </CardHeader>
        <CardBody>
          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Admin ID"
                placeholder="admin123"
                value={form.adminId}
                onValueChange={(value) => setForm({ ...form, adminId: value })}
                variant="bordered"
              />
              <Input
                type="email"
                label="Gmail"
                placeholder="name@gmail.com"
                value={form.email}
                onValueChange={(value) => setForm({ ...form, email: value })}
                variant="bordered"
              />
            </div>
            <Input
              label="Password"
              placeholder="Enter your password"
              value={form.password}
              onValueChange={(value) => setForm({ ...form, password: value })}
              variant="bordered"
              type={showPassword ? "text" : "password"}
              isRequired
              minLength={6}
              endContent={
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="focus:outline-none"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5 text-default-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-default-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              }
            />
            <Button 
              type="submit" 
              color="primary" 
              isLoading={loading}
              className="w-full"
            >
              {loading ? 'Logging in…' : 'Login'}
            </Button>
          </form>
          {error && (
            <div className="mt-4 p-3 bg-danger-50 border border-danger-200 rounded-lg">
              <p className="text-danger text-small">{error}</p>
            </div>
          )}
        </CardBody>
        <CardFooter className="justify-center">
          <p className="text-small text-default-500">
            New here{' '}
            <Link to="/signup" className="text-primary font-medium hover:underline">
              Create an account
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
