import { Bell, History, LogOut, Settings, User } from 'lucide-react'
import Link from 'next/link'
import React, { MouseEvent, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { UserData, UserStorage } from '../../../lib/UserStorage'

export default function ProfileCard() {
    const [openNotifications, setOpenNotifications] = useState(false)
    const bellRef = useRef<HTMLDivElement>(null)
    const nameRef = useRef<HTMLDivElement>(null)
    const notificationModalRef = useRef<HTMLDivElement>(null)
    const [profileClick, setProfileClick] = useState(false)
    const [scrollDir, setScrollDir] = useState<string>('')
    const [lastScrollY, setLastScrollY] = useState(0)
    const profileOption = useRef<HTMLDivElement>(null)
    const [user, setUser] = useState<UserData | null>(null)

    const router = useRouter()

    useEffect(() => {
        const sessionUser = UserStorage.getSession()
        if (sessionUser) setUser(sessionUser)
    }, [])

    const logout = () => {
        UserStorage.logout()
        setUser(null)
        router.push('/')
    }

    const handleClickProfile = () => {
        setProfileClick(!profileClick)
        if (nameRef.current) {
            nameRef.current.style.display = 'none'
        }
    }

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
        if (notificationModalRef.current && !notificationModalRef.current.contains(event.target as Node)) {
            setOpenNotifications(false)
        }
        if (profileOption.current && !profileOption.current.contains(event.target as Node)) {
            setProfileClick(false)
        }
    }

    useEffect(() => {
        const handleClickOutsideWrapper = (event: Event) => handleClickOutside(event as MouseEvent | TouchEvent)
        document.addEventListener('mousedown', handleClickOutsideWrapper)
        document.addEventListener('touchstart', handleClickOutsideWrapper)
        return () => {
            document.removeEventListener('mousedown', handleClickOutsideWrapper)
            document.removeEventListener('touchstart', handleClickOutsideWrapper)
        }
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY
            if (currentScrollY > lastScrollY) setScrollDir('down')
            else if (currentScrollY < lastScrollY) setScrollDir('up')
            setLastScrollY(currentScrollY)
            setOpenNotifications(false)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [lastScrollY])

  const dashUrl = process.env.NEXT_PUBLIC_URL_DASH

    return (
        <div className='items-center md:relative flex text-[#161616]'>
            {/* Desktop Profile */}
            <div
                ref={profileOption}
                className='p-2 relative md:flex hidden justify-center items-center rounded-full bg-zinc-50'
                onClick={handleClickProfile}
            >
                <User />
                <div className={`select-none text-[#014421] text-sm min-w-72 shadow-sm border bg-white absolute right-0 top-10 rounded-lg ${!profileClick && 'hidden'}`}>
                    {/* Perfil */}
                    <Link href={`/`} className='flex items-center gap-3 p-3 hover:bg-[#e6f5ea] transition-colors'>
                        <div className='bg-[#e6f5ea] p-2 rounded-full'><User size={16} /></div>
                        <span className='truncate font-semibold'>{user?.name || 'Perfil'}</span>
                    </Link>
                    {/* Dashboard */}
                    <Link href={`${dashUrl}`} className='flex items-center gap-3 p-3 hover:bg-[#e6f5ea] transition-colors'>
                        <div className='bg-[#e6f5ea] p-2 rounded-full'><Settings size={16} /></div>
                        <span className='font-semibold'>Dashboard</span>
                    </Link>
                    {/* Sair */}
                    <button onClick={logout} className='w-full flex items-center gap-3 p-3 hover:bg-[#e6f5ea] transition-colors'>
                        <div className='bg-[#e6f5ea] p-2 rounded-full'><LogOut size={16} /></div>
                        <span className='font-semibold'>Sair</span>
                    </button>
                </div>
            </div>

            {/* Mobile Card */}
            <div className="w-full divide-y divide-[#014421] md:hidden text-sm text-[#014421] select-none rounded-lg shadow-md overflow-hidden bg-white">
                {/* Perfil */}
                <div className="p-3">
                    <Link href={`/`} className="flex items-center gap-3 hover:bg-[#e6f5ea] transition-colors p-2">
                        <div className="bg-[#e6f5ea] p-2 rounded-full"><User size={18} /></div>
                        <span className="font-semibold truncate">{user?.name || 'Perfil'}</span>
                    </Link>
                </div>
                {/* Dashboard */}
                <div className="p-3">
                    <Link href={`${dashUrl}`} className="flex items-center gap-3 hover:bg-[#e6f5ea] transition-colors p-2">
                        <div className="bg-[#e6f5ea] p-2 rounded-full"><Settings size={18} /></div>
                        <span className="font-semibold">Dashboard</span>
                    </Link>
                </div>
                {/* Sair */}
                <div className="p-3">
                    <button onClick={logout} className="flex items-center gap-3 hover:bg-[#e6f5ea] transition-colors p-2 w-full">
                        <div className="bg-[#e6f5ea] p-2 rounded-full"><LogOut size={18} /></div>
                        <span className="font-semibold">Sair</span>
                    </button>
                </div>
            </div>
        </div>
    )
}