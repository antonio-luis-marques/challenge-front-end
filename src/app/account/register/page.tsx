'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { ThemeProvider, Typography } from '@mui/material';
import { z } from 'zod';
import Image from 'next/image';
import theme from '../../../../theme';
import { Eye, EyeOff } from 'lucide-react';
import { UserStorage } from '../../../../lib/UserStorage';
import { useRouter } from 'next/navigation';

const userSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório."),
  email: z.string().email("E-mail inválido."),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
});

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = userSchema.safeParse({ name, email, password });

    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    setError(null);
    const success = UserStorage.register({ name, email, password });
    if (success) router.push('/')
  };

  return (
    <div className='h-screen w-full flex bg-[#34c75945]'>
      <div className='w-1/2 h-full overflow-hidden bg-[#014421] relative md:flex hidden justify-center items-center'>
        <div className='z-20 px-20 flex flex-col items-center justify-center text-white'>
          <ThemeProvider theme={theme}>
            <Typography variant="h5" fontWeight="bold">
              Aprenda o que o mercado precisa.
            </Typography>
            <Typography variant="h6" fontWeight="bold" sx={{ mt: 1, fontStyle: 'italic' }}>
              Formação. Certificação. Conexões.
            </Typography>
          </ThemeProvider>
        </div>
        <div className='absolute z-10 opacity-75'>
          <Image
            src={'https://res.cloudinary.com/dt0vpc25d/image/upload/v1745917966/grupo%20jungle/login-register/cover1.jpg'}
            alt={''}
            width={600}
            height={400}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            unoptimized
          />
        </div>
      </div>

      <div className='space-y-2 px-4 flex-1 flex flex-col justify-center items-center h-full'>
        <div className="md:w-96 w-full">
          <div className="flex flex-col p-6 rounded-lg overflow-hidden w-full space-y-6 bg-[#014421]">
            <div>
              <div className='flex items-center w-full space-x-2 mb-4 justify-center text-center'>
                <img
                  src='/logo.png'
                  alt='Logo'
                  className='h-8'
                />
                <ThemeProvider theme={theme}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ color: 'white', margin: 0, padding: 0 }}
                  >
                    <Link href='/' className="text-white">GJUNGLE</Link>
                  </Typography>
                </ThemeProvider>
              </div>
              <ThemeProvider theme={theme}>
                <Typography
                  sx={{
                    color: 'white',
                    fontSize: '14px', // Tamanho pequeno para o texto
                    textAlign: 'center', // Centraliza o texto
                  }}
                >
                  Junte-se a nós
                </Typography>
              </ThemeProvider>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
              {error && <p className="text-red-500 text-sm">{error}</p>}

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

              <div className="relative">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="block px-4 pb-2.5 h-12 pt-4 w-full text-sm text-white bg-transparent rounded-lg border border-[#21dda9] appearance-none focus:outline-none focus:ring-0 focus:border-[#21dda9] peer"
                  placeholder=" "
                />
                <label htmlFor="password" className="absolute text-sm text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#014421] px-2 peer-focus:px-2 peer-focus:text-[#21dda9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">
                  Senha
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <button type="submit" className="bg-[#228B22] active:scale-95 focus:outline-none w-full h-12 font-semibold text-white rounded-md">
                Criar
              </button>
            </form>
          </div>

          <div className="flex-1 border rounded-lg py-4 mt-8 text-center bg-[#014421]">
            <p className="text-white">Já tens uma conta? <Link href="/account/login" className="font-medium text-[#228B22] underline">Entrar</Link></p>
          </div>
        </div>

        <p className='text-sm py-2 md:px-10 px-4'>© 2025 - GRUPO JUNGLE. Todos direitos reservados. | Política de privacidade</p>
      </div>
    </div>
  );
}