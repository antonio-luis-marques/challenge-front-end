'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { Avatar, Box, Stack, ThemeProvider, Typography } from '@mui/material';
import { z } from 'zod';
// import { useLogin } from '@/hooks/useLogin';
import Image from 'next/image';
import theme from '../../../../theme';
import { Eye, EyeOff } from 'lucide-react';
import { UserStorage } from '../../../../lib/UserStorage';
import { useRouter } from 'next/navigation';

// Schema com Zod para validar o e-mail e senha
const loginSchema = z.object({
    email: z.string().email("E-mail inválido."),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // const { loginServer, loading, error: loginError } = useLogin();

    const router = useRouter()
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = loginSchema.safeParse({ email, password });

        if (!result.success) {
            setError(result.error.errors[0].message);
            return;
        }

        setError(null);
        const user = UserStorage.login(email, password);
        if (user) {
            UserStorage.setSession(user);
            router.push('/')
        } else {
            setError('Credenciais inválidas');
        }

    };

    return (
        <div className='h-screen w-full flex bg-[#0A1E14]'>
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

                    <div className="flex flex-col p-6 rounded-lg overflow-hidden w-full bg-[#122C22]">
                        <div>
                            <ThemeProvider theme={theme}>

                                <Link href="/" passHref>
                                    <Stack
                                        direction="row"
                                        spacing={2}
                                        alignItems="center"
                                        mb={4}
                                        className="cursor-pointer"
                                    >
                                        <Avatar
                                            alt="Logo Jungle Mídia"
                                            src="/logo.png"
                                            sx={{ width: 56, height: 56 }}
                                        />
                                        <Box>
                                            <Typography variant="h5" fontWeight="bold" color="white">
                                                Grupo Jungle
                                            </Typography>
                                            <Typography variant="subtitle2" color="#90A99F">
                                                Acesse sua conta na Grupo Jungle
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Link>
                            </ThemeProvider>
                        </div>

                        <form onSubmit={handleSubmit} action="" method="post" className="space-y-6">
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            {/* {loginError && <p className="text-red-500 text-sm">{loginError}</p>} */}

                            {/* E-mail */}
                            <div className="relative">
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    type="email"
                                    className="block px-4 z-40 pb-2.5 h-12 pt-4 w-full text-sm text-white bg-[#1A3A2F] rounded-lg appearance-none focus:outline-none focus:ring-0 border border-[#1F4033] focus:border-[#58C287] peer"
                                    placeholder=" "
                                />
                                <label className="absolute text-sm text-[#B0D6C5] duration-300 z-10 transform -translate-y-4 scale-75 top-2 origin-[0] bg-[#1A3A2F] px-2 peer-focus:px-2 peer-focus:text-[#58C287] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">
                                    E-mail
                                </label>
                            </div>

                            {/* Senha */}
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block px-4 z-40 pb-2.5 h-12 pt-4 w-full text-sm text-white bg-[#1A3A2F] rounded-lg appearance-none focus:outline-none focus:ring-0 border border-[#1F4033] focus:border-[#58C287] peer"
                                    placeholder=" "
                                />
                                <label className="absolute text-sm text-[#B0D6C5] duration-300 z-10 transform -translate-y-4 scale-75 top-2 origin-[0] bg-[#1A3A2F] px-2 peer-focus:px-2 peer-focus:text-[#58C287] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">
                                    Senha
                                </label>
                                <button
                                    type="button"
                                    className="absolute right-3 top-3 text-white"
                                    onClick={() => setShowPassword(prev => !prev)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>

                            {/* Botão de login */}
                            <button
                                type="submit"
                                className="bg-[#228B22] active:scale-95 focus:outline-none w-full h-12 font-semibold text-white rounded-md"
                            >
                                Entrar
                            </button>
                        </form>
                    </div>

                    <div className="flex-1 rounded-lg py-4 mt-8 text-center bg-[#122C22]">
                        <p className="text-white">
                            Não tens uma conta?{' '}
                            <Link href="/account/register" className="font-medium text-[#228B22] underline">
                                Registar
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}