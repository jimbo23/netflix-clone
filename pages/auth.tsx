import { Input } from '@components/Input';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { ChangeEvent, SyntheticEvent, useCallback, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const Auth = () => {
  const [formValue, setFormValue] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [variant, setVariant] = useState<'login' | 'register'>('login');

  const toggleVariant = useCallback(() => {
    setVariant((prev) => (prev === 'login' ? 'register' : 'login'));
  }, []);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      setFormValue((prev) => ({
        ...prev,
        [e.target.id]: e.target.value,
      })),
    []
  );

  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email: formValue.email,
        password: formValue.password,
        callbackUrl: '/profiles',
      });
    } catch (err) {
      console.log({ err });
    }
  }, [formValue.email, formValue.password]);

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        ...formValue,
        callbackUrl: '/profiles',
      });
      login();
    } catch (error) {
      console.log({ error });
    }
  }, [formValue, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="Logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === 'login' ? 'Sign In' : 'Register'}
            </h2>

            <div className="flex flex-col gap-4">
              {variant === 'register' && (
                <Input
                  label="Username"
                  onChange={handleChange}
                  id="username"
                  value={formValue.username}
                />
              )}
              <Input
                label="Email"
                onChange={handleChange}
                id="email"
                type="email"
                value={formValue.email}
              />
              <Input
                label="Password"
                onChange={handleChange}
                id="password"
                type="password"
                value={formValue.password}
              />
            </div>
            <button
              onClick={variant === 'login' ? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === 'login' ? 'Login' : 'Sign Up'}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div
                onClick={() => signIn('google', { callbackUrl: '/profiles' })}
                className="
                  w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition
                "
              >
                <FcGoogle size={30} />
              </div>
              <div
                onClick={() => signIn('github', { callbackUrl: '/profiles' })}
                className="
                  w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition
                "
              >
                <FaGithub size={30} />
              </div>
            </div>

            <p className="text-neutral-500 mt-12">
              {variant === 'login'
                ? 'First time using Netflix?'
                : 'Already have an account?'}
              <span
                className="text-white ml-1 hover:underline cursor-pointer"
                onClick={toggleVariant}
              >
                {variant === 'login' ? 'Create an account' : 'Login'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
