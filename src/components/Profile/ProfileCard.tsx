import { Bell, History, LogOut, Settings, User } from 'lucide-react'
import Link from 'next/link'
import React, { MouseEvent, useEffect, useRef, useState } from 'react'
// import { useAuth } from '../Provider/AuthProvider/AuthProvider'
import { useRouter } from 'next/navigation';


export default function ProfileCard() {
    const bellRef = useRef<HTMLDivElement>(null)
    const nameRef = useRef<HTMLDivElement>(null);
    const [profileClick, setProfileClick] = useState(false)
    const [scrollDir, setScrollDir] = useState<string>('')
    const [lastScrollY, setLastScrollY] = useState(0)
    const profileOption = useRef<HTMLDivElement>(null)

    const router = useRouter()

    // const { logout } = useAuth()

    const sessionUser = JSON.parse(localStorage.getItem('sessionUser') || '{}');


    const handleLogout = () => {
        localStorage.removeItem('sessionUser');
        router.push('/');
    }

    const handleClickProfile = () => {
        setProfileClick(!profileClick)
        if (nameRef.current) {
            nameRef.current.style.display = 'none';
        }
    }

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
        if (profileOption.current && !profileOption.current.contains(event.target as Node)) {
            setProfileClick(false);
        }
    };

    useEffect(() => {
        const handleClickOutsideWrapper = (event: Event) => handleClickOutside(event as MouseEvent | TouchEvent);

        document.addEventListener('mousedown', handleClickOutsideWrapper);
        document.addEventListener('touchstart', handleClickOutsideWrapper);

        return () => {
            document.removeEventListener('mousedown', handleClickOutsideWrapper);
            document.removeEventListener('touchstart', handleClickOutsideWrapper);
        };
    }, []);



    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY

            if (currentScrollY > lastScrollY) {
                setScrollDir('down')
            } else if (currentScrollY < lastScrollY) {
                setScrollDir('up')
            }

            setLastScrollY(currentScrollY)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [lastScrollY])

    return (
        <div className={'items-center md:relative flex text-[#161616]'}>
            <div ref={profileOption}
                className='p-2 relative  md:flex hidden justify-center items-center rounded-full bg-zinc-50'
                onClick={handleClickProfile}
            >
                <User />
                <div className={' select-none divide-y min-w-72 shadow-sm border bg-white text-[15px] absolute right-0 top-10  rounded-lg ' + (!profileClick && 'hidden')}>
                    <div className='p-2 font-normal'>
                        <Link href={`/profile?id=${sessionUser.name}`} className='flex hover:bg-zinc-50 p-1 items-center space-x-2'>
                            <div className='p-2 rounded-full bg-zinc-50'>
                                <User size={16} />
                            </div>
                            <span className='whitespace-nowrap'>{sessionUser.name || 'Perfil'}</span>
                        </Link>
                    </div>
                    <div className='p-2 px-4 font-normal'>
                        <button
                            onClick={handleLogout}
                            className='flex w-full hover:bg-zinc-50 p-1 items-center space-x-2'>
                            <LogOut size={16} /><span>Sair</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-full divide-y md:hidden divide-[#014421] text-sm text-[#014421] select-none rounded-lg shadow-md overflow-hidden bg-white">
                {/* Link para perfil */}
                <div className="p-3">
                    <Link
                        href={`#`}
                        className="flex items-center space-x-3 rounded-md hover:bg-[#e6f5ea] transition-colors p-2"
                    >
                        <div className="bg-[#e6f5ea] p-2 rounded-full">
                            <User size={18} className="text-[#014421]" />
                        </div>
                        <span className="font-semibold truncate">{sessionUser.name || 'Perfil'}</span>
                    </Link>
                </div>

                {/* Botão de sair */}
                <div className="p-3">
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 text-[#014421] hover:bg-[#e6f5ea] transition-colors p-2 rounded-md w-full"
                    >
                        <LogOut size={18} className="text-[#014421]" />
                        <span className="font-semibold">Sair</span>
                    </button>
                </div>
            </div>

        </div>
    )
}
