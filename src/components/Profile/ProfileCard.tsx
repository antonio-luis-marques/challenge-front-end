import { Bell, History, LogOut, Settings, User } from 'lucide-react'
import Link from 'next/link'
import React, { MouseEvent, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation';
import { UserData, UserStorage } from '../../../lib/UserStorage'


export default function ProfileCard() {
    const [openNotifications, setOpenNotifications] = useState(false)
    const bellRef = useRef<HTMLDivElement>(null)
    const nameRef = useRef<HTMLDivElement>(null);
    const notificationModalRef = useRef<HTMLDivElement>(null)
    const [profileClick, setProfileClick] = useState(false)
    const [scrollDir, setScrollDir] = useState<string>('')
    const [lastScrollY, setLastScrollY] = useState(0)
    const profileOption = useRef<HTMLDivElement>(null)
    const [user, setUser] = useState<UserData | null>(null);


    const router = useRouter()

    useEffect(() => {
        const handleScroll = () => {
            setOpenNotifications(false)
        };

        const handleAlert = () => console.log('hello')
        if (bellRef.current) {
            bellRef.current.addEventListener('click', handleAlert, false)
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, [])

    useEffect(() => {
        const sessionUser = UserStorage.getSession();
        if (sessionUser) setUser(sessionUser);
    }, []);


    // const handleMouseEnter = () => {
    //     if (!profileClick) {
    //         if (nameRef.current) {
    //             nameRef.current.style.display = 'block';
    //         }
    //     }
    // };

    const logout = () => {
        UserStorage.logout();
        setUser(null);
        router.push('/');
    };


    // const handleMouseLeave = () => {

    //     if (nameRef.current) {
    //         nameRef.current.style.display = 'none';
    //     }
    // };

    const handleClickProfile = () => {
        setProfileClick(!profileClick)
        if (nameRef.current) {
            nameRef.current.style.display = 'none';
        }
    }

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
        if (notificationModalRef.current && !notificationModalRef.current.contains(event.target as Node)) {
            setOpenNotifications(false);
        }
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

        window.addEventListener('scroll', () => setOpenNotifications(false));
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('scroll', () => setOpenNotifications(false))
        }
    }, [lastScrollY])

    return (
        <div className={'items-center md:relative flex text-[#161616]'}>
            <div ref={profileOption}
                className='p-2 relative  md:flex hidden justify-center items-center rounded-full bg-zinc-50'
                onClick={handleClickProfile}
            >
                <User />
                <div className={' select-none divide-y divide-[#014421] text-[#014421]  min-w-72 shadow-sm border bg-white text-[15px] absolute right-0 top-10  rounded-lg ' + (!profileClick && 'hidden')}>
                    <div className='p-2 font-normal'>
                        <Link href={``} 
                            className="flex items-center space-x-3 text-[#014421] hover:bg-[#e6f5ea] transition-colors p-1 rounded-md w-full"                            >
                            <div className='p-2 rounded-full bg-zinc-50'>
                                <User size={16} className="text-[#014421]"/>
                            </div>
                            <span className='whitespace-nowrap'>{user?.name}</span>
                        </Link>
                    </div>
                    <div className='p-2 font-normal'>
                        <button onClick={logout}
                            className="flex items-center space-x-3 text-[#014421] hover:bg-[#e6f5ea] transition-colors p-2 rounded-md w-full"
                        >
                            <LogOut size={16} className="text-[#014421]" /><span>Sair</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-full divide-y divide-[#014421] md:hidden text-sm text-[#014421] select-none rounded-lg shadow-md overflow-hidden bg-white">
                {/* Link para perfil */}
                <div className="p-3">
                    <Link
                        href={``}
                        className="flex items-center space-x-3 rounded-md hover:bg-[#e6f5ea] transition-colors p-2"
                    >
                        <div className="bg-[#e6f5ea] p-2 rounded-full">
                            <User size={18} className="text-[#014421]" />
                        </div>
                        <span className="font-semibold truncate">{user?.name || 'Perfil'}</span>
                    </Link>
                </div>

                {/* Botão de sair */}
                <div className="p-3">
                    <button
                        onClick={logout}
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
