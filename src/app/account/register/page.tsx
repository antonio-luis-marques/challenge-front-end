'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { useAuth } from '@/components/Provider/AuthProvider/AuthProvider';
import { Typography } from '@mui/material';
import { z } from 'zod';
import { useRegister } from '@/hooks/useRegister';

// Schema com Zod
const userSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório."),
  email: z.string().email("E-mail inválido."),
  role: z.enum(['aluno', 'mentor'], {
    errorMap: () => ({ message: "Tipo de usuário deve ser 'aluno' ou 'mentor'." }),
  }),
});

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'aluno' | 'mentor'>('aluno');
  const [error, setError] = useState<string | null>(null);
  const { registerServer, loading, error: registerError } = useRegister();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = userSchema.safeParse({ name, email, role });

    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    setError(null); // limpa erro anterior
    await registerServer(name, email, role); 

  };

  return (
    <div className='h-screen w-full flex'>
      <div className='w-1/2 h-full overflow-hidden bg-[#014421] relative md:flex hidden justify-center items-center'>
        <p className='text-6xl text-white font-bold absolute z-20'>MentorConnect.</p>
      </div>
      <div className='space-y-2 px-4 flex-1 flex flex-col justify-center items-center h-full'>
        <div className='flex items-center space-x-4'>
          <Typography variant="h6" fontWeight="bold">
            <Link href='/'>
              MentorConnect<span className='text-[#228B22]'>.</span>
            </Link>
          </Typography>
        </div>
        <div className="md:w-96 w-full">
          <div className="flex flex-col p-6 rounded-lg overflow-hidden w-full space-y-6 bg-[#014421]">
            <p className="font-medium text-lg text-center text-white">Criar conta</p>

            <div className="flex justify-center gap-6 text-white">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="aluno"
                  checked={role === 'aluno'}
                  onChange={() => setRole('aluno')}
                  className="accent-[#21dda9]"
                />
                <span>Aluno</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="mentor"
                  checked={role === 'mentor'}
                  onChange={() => setRole('mentor')}
                  className="accent-[#21dda9]"
                />
                <span>Mentor</span>
              </label>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {registerError && <p className="text-red-500 text-sm">{registerError}</p>}
              <div className="relative">
                <input
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="block px-4 z-40 pb-2.5 h-12 pt-4 w-full text-sm text-white bg-transparent rounded-lg border border-[#21dda9] appearance-none focus:outline-none focus:ring-0 focus:border-[#21dda9] peer"
                  placeholder=" "
                />
                <label htmlFor="name" className="absolute text-sm text-white duration-300 z-10 transform -translate-y-4 scale-75 top-2 origin-[0] bg-[#014421] px-2 peer-focus:px-2 peer-focus:text-[#21dda9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">
                  Nome
                </label>
              </div>

              <div className="relative">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  id="email"
                  className="block px-4 pb-2.5 h-12 pt-4 w-full text-sm text-white bg-transparent rounded-lg border border-[#21dda9] appearance-none focus:outline-none focus:ring-0 focus:border-[#21dda9] peer"
                  placeholder=" "
                />
                <label htmlFor="email" className="absolute text-sm text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#014421] px-2 peer-focus:px-2 peer-focus:text-[#21dda9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">
                  E-mail
                </label>
              </div>

              <button type="submit" className="bg-[#21dda9] active:scale-95 focus:outline-none w-full h-12 font-semibold text-white rounded-md">
                {loading ? 'Carregando...' : 'Criar'}
              </button>
            </form>
          </div>

          <div className="flex-1 border rounded-lg py-4 mt-8 text-center bg-[#f4f4f4]">
            <p className="text-[#014421]">Já tens uma conta? <Link href="/account/login" className="font-medium text-[#228B22] underline">Entrar</Link></p>
          </div>
        </div>

        <p className='text-sm py-2 md:px-10 px-4'>© 2025 - MentorConnect. Todos direitos reservados. | Política de privacidade</p>
      </div>
    </div>
  );
}
