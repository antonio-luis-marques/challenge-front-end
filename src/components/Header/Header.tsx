'use client'

import {
  Menu as MenuIcon,
  Search,
} from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState, MouseEvent } from 'react'
import ProfileCard from '../Profile/ProfileCard'
import { useAuth } from '../Provider/AuthProvider/AuthProvider'
import { Typography, Drawer, IconButton, Box, ThemeProvider, Paper, InputBase } from '@mui/material'
import theme from '../../../theme'
import { UserData, UserStorage } from '../../../lib/UserStorage'

export default function Header() {
  const [expanded, setExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };
  const [scrollDir, setScrollDir] = useState<string>('')
  const [lastScrollY, setLastScrollY] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [user, setUser] = useState<UserData | null>(null);


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollDir(currentScrollY > lastScrollY ? 'down' : 'up')
      setLastScrollY(currentScrollY)
    }


    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  useEffect(() => {
    const sessionUser = UserStorage.getSession();
    if (sessionUser) setUser(sessionUser);
  }, []);

  return (
    <div className={`flex h-16 border-b bg-white sticky z-40 w-full xl:px-24 px-4 transition-all duration-500 ${scrollDir === 'up' && lastScrollY != 0 ? 'top-0 shadow-sm' : 'md:-top-16 shadow-sm top-[-66px]'}`}>
      <div className='w-full flex justify-between items-center h-full'>
        {/* Logo */}
        <div className='flex items-center space-x-2'>
          <img
            src='/logo.png' 
            alt='Logo'
            className='h-12' 
          />
          <ThemeProvider theme={theme}>

            <Typography variant="h6" fontWeight="bold" sx={{ margin: 0, padding: 0 }}>
              <Link href='/'>
                GJUNGLE
              </Link>
            </Typography>
          </ThemeProvider>
        </div>

        {/* Desktop search and profile */}
        <div className='hidden md:flex items-center justify-end flex-1'>
          <form className='flex-1 pr-4'>
            <Box display="flex" alignItems="center" justifyContent="flex-end">
              <Paper
                onClick={handleToggle}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  px: 1,
                  py: 0.5,
                  width: expanded ? { xs: '100%', sm: 200 } : 40,
                  transition: 'width 0.3s ease, border 0.3s ease, background-color 0.3s ease',
                  overflow: 'hidden',
                  boxShadow: 'none',
                  border: expanded ? '1px solid green' : '1px solid transparent',
                  borderRadius: 2,
                  ...(expanded
                    ? {}
                    : {
                      '&:hover': {
                        border: '1px solid green',
                        backgroundColor: 'green',
                        cursor: 'pointer',
                      },
                    }),
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: expanded ? 'auto' : '40px',
                  }}
                >
                  <Search size={24} />
                </Box>
                <InputBase
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{
                    ml: 1,
                    flex: 1,
                    opacity: expanded ? 1 : 0,
                    transition: 'opacity 0.2s ease',
                  }}
                />
              </Paper>
            </Box>
          </form>
          {user ? (
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
            {user ? (
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