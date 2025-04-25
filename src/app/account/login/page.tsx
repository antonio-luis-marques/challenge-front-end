'use client';

import { ArrowLeft, Facebook, Home } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { z } from 'zod';
import { useLogin } from '@/hooks/useLogin';

// Schema com Zod para validar o e-mail
const loginSchema = z.object({
    email: z.string().email("E-mail inválido."),
});

export default function Login() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);

    const { loginServer, loading, error: loginError } = useLogin();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validando o e-mail com o Zod
        const result = loginSchema.safeParse({ email });

        if (!result.success) {
            setError(result.error.errors[0].message);
            return;
        }

        setError(null);
        await loginServer(email); 
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
                        <p className="font-medium text-lg text-center text-white">Entrar na sua conta</p>
                        <form onSubmit={handleSubmit} action="" method="post" className="space-y-6">
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
                            <div className="relative">
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    id="floating_outlined"
                                    className="block px-4 z-40 pb-2.5 h-12 pt-4 w-full text-sm text-white bg-transparent rounded-lg border border-[#21dda9] appearance-none focus:outline-none focus:ring-0 focus:border-[#21dda9] peer"
                                    placeholder=" "
                                />
                                <label className="absolute text-sm text-white duration-300 z-10 transform -translate-y-4 scale-75 top-2 origin-[0] bg-[#014421] px-2 peer-focus:px-2 peer-focus:text-[#21dda9] peer-focus:dark:text-[#21dda9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                                    E-mail
                                </label>
                            </div>
                            <button type="submit" className="bg-[#21dda9] active:scale-95 focus:outline-none w-full h-12 font-semibold text-white rounded-md">
                            {loading ? 'Carregando...' : 'Entrar'}
                            </button>
                        </form>
                    </div>
                    <div className="flex-1 border rounded-lg py-4 mt-8 text-center bg-[#f4f4f4]">
                        <p className="text-[#014421]">Não tens uma conta? <Link href="/account/register" className="font-medium text-[#228B22] underline">Registar</Link></p>
                    </div>
                </div>
                <div className='pt-4'>
                    <p className='font-medium text-lg text-center'>Baixe o app</p>
                    <div className='w-full space-x-4 flex justify-center'>
                        <button className='bg-zinc-950 flex justify-center items-center space-x-1 px-2 py-2 text-white rounded-md focus:outline-none font-bold'>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0,0,256,256">
                                <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" ><g transform="scale(5.12,5.12)"><path d="M44.52734,34.75c-1.07812,2.39453 -1.59766,3.46484 -2.98437,5.57813c-1.94141,2.95313 -4.67969,6.64063 -8.0625,6.66406c-3.01172,0.02734 -3.78906,-1.96484 -7.87891,-1.92969c-4.08594,0.01953 -4.9375,1.96875 -7.95312,1.9375c-3.38672,-0.03125 -5.97656,-3.35156 -7.91797,-6.30078c-5.42969,-8.26953 -6.00391,-17.96484 -2.64844,-23.12109c2.375,-3.65625 6.12891,-5.80469 9.65625,-5.80469c3.59375,0 5.85156,1.97266 8.82031,1.97266c2.88281,0 4.63672,-1.97656 8.79297,-1.97656c3.14063,0 6.46094,1.71094 8.83594,4.66406c-7.76562,4.25781 -6.50391,15.34766 1.33984,18.31641zM31.19531,8.46875c1.51172,-1.94141 2.66016,-4.67969 2.24219,-7.46875c-2.46484,0.16797 -5.34766,1.74219 -7.03125,3.78125c-1.52734,1.85938 -2.79297,4.61719 -2.30078,7.28516c2.69141,0.08594 5.47656,-1.51953 7.08984,-3.59766z"></path></g></g>
                            </svg>
                            <span>App Store</span>
                        </button>
                        <button className='bg-zinc-950 flex items-center px-2 py-2 text-white justify-center space-x-1 rounded-md focus:outline-none font-bold'>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                                <linearGradient id="jFdG-76_seIEvf-hbjSsaa_rZwnRdJyYqRi_gr1" x1="1688.489" x2="1685.469" y1="-883.003" y2="-881.443" gradientTransform="matrix(11.64 0 0 22.55 -19615.32 19904.924)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#047ed6"></stop><stop offset="1" stop-color="#50e6ff"></stop></linearGradient><path fill="url(#jFdG-76_seIEvf-hbjSsaa_rZwnRdJyYqRi_gr1)" fill-rule="evenodd" d="M7.809,4.608c-0.45,0.483-0.708,1.227-0.708,2.194	v34.384c0,0.967,0.258,1.711,0.725,2.177l0.122,0.103L27.214,24.2v-0.433L7.931,4.505L7.809,4.608z" clip-rule="evenodd"></path><linearGradient id="jFdG-76_seIEvf-hbjSsab_rZwnRdJyYqRi_gr2" x1="1645.286" x2="1642.929" y1="-897.055" y2="-897.055" gradientTransform="matrix(9.145 0 0 7.7 -15001.938 6931.316)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffda1c"></stop><stop offset="1" stop-color="#feb705"></stop></linearGradient><path fill="url(#jFdG-76_seIEvf-hbjSsab_rZwnRdJyYqRi_gr2)" fill-rule="evenodd" d="M33.623,30.647l-6.426-6.428v-0.45l6.428-6.428	l0.139,0.086l7.603,4.321c2.177,1.227,2.177,3.249,0,4.493l-7.603,4.321C33.762,30.561,33.623,30.647,33.623,30.647z" clip-rule="evenodd"></path><linearGradient id="jFdG-76_seIEvf-hbjSsac_rZwnRdJyYqRi_gr3" x1="1722.978" x2="1720.622" y1="-889.412" y2="-886.355" gradientTransform="matrix(15.02 0 0 11.5775 -25848.943 10324.73)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d9414f"></stop><stop offset="1" stop-color="#8c193f"></stop></linearGradient><path fill="url(#jFdG-76_seIEvf-hbjSsac_rZwnRdJyYqRi_gr3)" fill-rule="evenodd" d="M33.762,30.561l-6.565-6.567L7.809,43.382	c0.708,0.761,1.9,0.847,3.232,0.103L33.762,30.561" clip-rule="evenodd"></path><linearGradient id="jFdG-76_seIEvf-hbjSsad_rZwnRdJyYqRi_gr4" x1="1721.163" x2="1722.215" y1="-891.39" y2="-890.024" gradientTransform="matrix(15.02 0 0 11.5715 -25848.943 10307.886)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#33c481"></stop><stop offset="1" stop-color="#61e3a7"></stop></linearGradient><path fill="url(#jFdG-76_seIEvf-hbjSsad_rZwnRdJyYqRi_gr4)" fill-rule="evenodd" d="M33.762,17.429L11.041,4.522	c-1.33-0.761-2.524-0.658-3.232,0.103l19.386,19.369L33.762,17.429z" clip-rule="evenodd"></path>
                            </svg>
                            <span> Play Store</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
