'use client'

import {
  Menu as MenuIcon,
  Search,
} from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState, MouseEvent } from 'react'
import ProfileCard from '../Profile/ProfileCard'
import { useAuth } from '../Provider/AuthProvider/AuthProvider'
import { Typography, Drawer, IconButton, Box } from '@mui/material'

export default function Header() {
  const [expandSearch, setExpandSearch] = useState(false)
  const [scrollDir, setScrollDir] = useState<string>('')
  const [lastScrollY, setLastScrollY] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // const { user } = useAuth()
  const sessionUserRaw = localStorage.getItem('sessionUser');
  const sessionUser = sessionUserRaw ? JSON.parse(sessionUserRaw) : null;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollDir(currentScrollY > lastScrollY ? 'down' : 'up')
      setLastScrollY(currentScrollY)
    }


    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <div className={`flex h-16 border-b bg-white sticky z-40 w-full xl:px-24 px-4 transition-all duration-500 ${scrollDir === 'up' && lastScrollY != 0 ? 'top-0 shadow-sm' : 'md:-top-16 shadow-sm top-[-66px]'}`}>
      <div className='w-full flex justify-between items-center h-full'>
        {/* Logo */}
        <div className='flex items-center space-x-4'>
          <Typography variant="h6" fontWeight="bold">
            <Link href='/'>
              MentorConnect<span className='text-[#228B22] text-lg'>.</span>
            </Link>
          </Typography>
        </div>

        {/* Desktop search and profile */}
        <div className='hidden md:flex items-center justify-end flex-1'>
          <form  className='flex-1 pr-4'>
            <div className='w-full relative flex h-14 items-center space-x-4'>
              <div className='left-8 text-slate-600 absolute cursor-pointer z-50'>
                <Search />
              </div>
              <div className={`h-10 items-center flex opacity-0 lg:opacity-100 w-0 pl-12 border transition-all duration-500 rounded-full flex-1 overflow-hidden ${expandSearch ? 'opacity-100 w-full' : ''}`}>
                <input
                  type="search"
                  className='w-full h-full text-slate-500 text-sm border-0 focus:outline-none bg-transparent'
                  placeholder='Pesquisar cursos'
                />
              </div>
            </div>
          </form>
          {sessionUser ? (
            <ProfileCard />
          ) : (
            <div className='flex items-center space-x-6'>
              <Link href='/account/login' className='text-[#228B22]'>Entrar</Link>
              <Link href='/account/register' className='h-8 px-4 bg-[#228B22] flex justify-center items-center rounded-md text-white'>Registar</Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className='md:hidden'>
          <IconButton onClick={() => setSidebarOpen(true)}>
            <MenuIcon />
          </IconButton>
        </div>

        {/* Sidebar for mobile */}
        <Drawer anchor="right" open={sidebarOpen} onClose={() => setSidebarOpen(false)}>
          <Box sx={{ width: 300, p: 2 }}>
            {/* Search in sidebar */}
            <div className='mb-4'>
              <div className='flex items-center space-x-2 border rounded-full p-2'>
                <Search className='text-slate-600' />
                <input
                  type="search"
                  className='flex-1 text-sm border-0 focus:outline-none bg-transparent'
                  placeholder='Pesquisar cursos'
                />
              </div>
            </div>

            {/* Auth or Profile */}
            {sessionUser ? (
              <ProfileCard />
            ) : (
              <div className='flex flex-col space-y-4'>
                <Link href='/account/login' className='text-[#228B22] text-center p-2 border border-[#228b22] rounded'>Entrar</Link>
                <Link href='/account/register' className='bg-[#228B22] text-white p-2 rounded text-center'>Registar</Link>
              </div>
            )}
          </Box>
        </Drawer>
      </div>
    </div>
  )
}