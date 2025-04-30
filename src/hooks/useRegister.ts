import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/components/Provider/AuthProvider/AuthProvider';

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { register } = useAuth();

  const registerServer = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    console.log('Tentando registrar usuário com os dados:', { name, email, password });

    try {
      const response = await axios.post('https://challenge-five-peach.vercel.app/create', { name, email, password });

      console.log('Resposta do servidor:', response.data);

      // register(response.data);
    } catch (err: any) {
      console.error('Erro ao registrar:', err);
      if (err.response) {
        console.error('Resposta do erro:', err.response.data);
        setError(err.response.data?.error || 'Erro ao realizar o registro');
      } else {
        setError('Erro de rede ou servidor fora do ar');
      }
    } finally {
      setLoading(false);
    }
  };

  return { registerServer, loading, error };
};
