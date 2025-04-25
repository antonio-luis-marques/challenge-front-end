// hooks/useLogin.ts
import { useState } from 'react';
import axios from 'axios';
// import { useAuth } from '@/components/Provider/AuthProvider/AuthProvider';
import { useRouter } from 'next/navigation';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // const { login} = useAuth();

  const router = useRouter()
  
  const loginServer = async (email: string) => {
    setLoading(true);
    try {
      const response = await axios.post('https://challenge-five-peach.vercel.app/login', {email});
      if (response.data) {
        const user = response.data;
        localStorage.setItem('sessionUser', JSON.stringify(user));
        router.push('/');

      }
      // login(response.data)
    } catch (err) {
      setError('Erro ao realizar login');
    } finally {
      setLoading(false);
    }
  };

  return { loginServer, loading, error };
};
