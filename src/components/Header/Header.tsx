'use client'

import {
  Menu as MenuIcon,
  Search,
  X,
} from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ProfileCard from '../Profile/ProfileCard'
import { Typography, Drawer, IconButton, Box, ThemeProvider, Paper, InputBase, Fade, ClickAwayListener } from '@mui/material'
import theme from '../../../theme'
import { UserData, UserStorage } from '../../../lib/UserStorage'

export default function Header() {
  const [expanded, setExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [scrollDir, setScrollDir] = useState<string>('')
  const [lastScrollY, setLastScrollY] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<UserData | null>(null);
  const [mobileSearchVisible, setMobileSearchVisible] = useState(false);


  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };

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

  const apiUrl = process.env.NEXT_PUBLIC_URL
  const dashUrl = process.env.NEXT_PUBLIC_URL_DASH

  return (
    <div className={`flex h-16 border-b bg-white sticky z-40 w-full xl:px-24 px-4 transition-all duration-500 ${scrollDir === 'up' && lastScrollY != 0 ? 'top-0 shadow-sm' : 'md:-top-16 shadow-sm top-[-66px]'}`}>
      <div className='w-full flex justify-between items-center h-full'>
        {/* Logo e título */}
        <div className='flex items-center space-x-2'>
          <img
            src='/logo.png'
            alt='Logo'
            className='h-8'
          />
          <ThemeProvider theme={theme}>
            <Typography fontWeight="bold" sx={{ margin: 0, padding: 0 }}>
              <Link href='/'>
                G.J
              </Link>
            </Typography>
          </ThemeProvider>
        </div>

        {/* Desktop search, instrutor e perfil */}
        <div className='hidden md:flex items-center justify-end flex-1 space-x-2'>
          <form className='flex-1 pr-4'>
            <Box display="flex" alignItems="center" justifyContent="flex-end">
              <Paper
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
                    cursor: 'pointer',
                  }}
                  onClick={handleToggle}
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
          <div className='flex items-center '>
            <Link
              href='#'
              target='_blank'
              rel='noopener noreferrer'
              className='ml-4 h-8 px-4 text-[#228B22] rounded-md transition hidden md:inline-flex items-center hover:text-white hover:bg-[#228B22]'
            >
              Instrutor
            </Link>
            <Link
              href={`${apiUrl}`}
              target='_blank'
              rel='noopener noreferrer'
              className='h-8 px-4 text-[#228B22] rounded-md transition hidden md:inline-flex items-center hover:text-white hover:bg-[#228B22]'
            >
              Marketplace
            </Link>
          </div>
          {user ? (
            <ProfileCard />
          ) : (
            <div className='flex items-center space-x-6 ml-4'>
              <Link href='/account/login' className='text-[#228B22]'>Entrar</Link>
              <Link href='/account/register' className='h-8 px-4 bg-[#228B22] flex justify-center items-center rounded-md text-white'>Registar</Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className='md:hidden ' >
          <IconButton onClick={() => setMobileSearchVisible((prev) => !prev)}>
            <Search />
          </IconButton>
          <IconButton onClick={() => setSidebarOpen(true)}>
            <MenuIcon />
          </IconButton>

          {mobileSearchVisible && (
            <ClickAwayListener onClickAway={() => setMobileSearchVisible(false)}>
              <Fade in={mobileSearchVisible}>
                <Paper
                  elevation={4}
                  sx={{
                    // width: '100%',
                    position: 'absolute',
                    top: '64px',
                    left: 0,
                    right: 0,
                    // mx: 2,
                    px: 2,
                    py: 1,
                    zIndex: 50,
                    display: 'flex',
                    alignItems: 'center',
                    // borderRadius: '9999px',
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    boxShadow: 'none'
                  }}
                >
                  <Search style={{ color: '#666' }} />
                  <InputBase
                    placeholder="Pesquisar cursos"
                    fullWidth
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ flex: 1 }}
                  />
                  <IconButton onClick={() => setMobileSearchVisible(false)}>
                    <X />
                  </IconButton>
                </Paper>
              </Fade>
            </ClickAwayListener>
          )}
        </div>

        {/* Sidebar para mobile */}
        <Drawer
          anchor="right"
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          PaperProps={{
            sx: {
              width: '100%',
              maxWidth: '100vw',
              backgroundColor: '#fff',
              height: '100vh',
            },
          }}
        >
          <Box sx={{ position: 'relative', p: 2, height: '100%' }}>
            {/* Botão de fechar no topo direito */}
            <IconButton
              onClick={() => setSidebarOpen(false)}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                border: '1px solid #228B22',
                color: '#228B22',
                width: 32,
                height: 32,
              }}
            >
              <X size={18} />
            </IconButton>

            {/* Espaço para conteúdo abaixo do botão */}
            <Box mt={4}>
              {/* Search no sidebar */}
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

              {/* Autenticação ou perfil */}
              {user ? (
                <ProfileCard />
              ) : (
                <div className='flex flex-col space-y-4'>
                  <Link href='/account/login' className='text-[#228B22] text-center p-2 border border-[#228b22] rounded'>Entrar</Link>
                  <Link href='/account/register' className='bg-[#228B22] text-white p-2 rounded text-center'>Registar</Link>
                </div>
              )}

              {/* Botões extras */}
              <div className='space-y-4 mt-4 flex-col flex'>
                <Link
                  href='#'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-[#228B22] text-center p-2 border border-[#228b22] rounded hover:bg-[#228B22] hover:text-white transition'
                >
                  Instrutor
                </Link>
                <Link
                  href={`${apiUrl}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-[#228B22] text-center p-2 border border-[#228b22] rounded hover:bg-[#228B22] hover:text-white transition'
                >
                  Marketplace
                </Link>
              </div>
            </Box>
          </Box>
        </Drawer>
      </div>
    </div>
  );
}