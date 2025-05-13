'use client';

import { ArrowRight, BookOpen, BadgeCheck, Store, Search, FileX } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import theme from '../../../theme';
import { ThemeProvider } from '@mui/material/styles';
import { UserData, UserStorage } from '../../../lib/UserStorage';


const slides = [
  {
    title: 'Formação',
    description: 'Aprenda na prática: domine programação, design e automação com cursos moldados para o mercado digital.',
    icon: BookOpen,
    imageUrl: 'https://res.cloudinary.com/dt0vpc25d/image/upload/v1746038625/grupo%20jungle/cover1.jpg',
  },
  {
    title: 'Certificação',
    description: 'Valide suas habilidades com certificações reconhecidas e feedback personalizado de especialistas da área.',
    icon: BadgeCheck,
    imageUrl: 'https://res.cloudinary.com/dt0vpc25d/image/upload/v1746038625/grupo%20jungle/cover1.jpg',
  },
  {
    title: 'Marketplace',
    description: 'Conecte-se a oportunidades reais: ofereça serviços ou contrate talentos certificados em nossa plataforma exclusiva.',
    icon: Store,
    imageUrl: 'https://res.cloudinary.com/dt0vpc25d/image/upload/v1746038625/grupo%20jungle/cover1.jpg',
  },
];

export default function IntroCard() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState<UserData | null>(null)



  useEffect(() => {
    const sessionUser = UserStorage.getSession()
    if (sessionUser) setUser(sessionUser)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = slides[currentSlide].icon;

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      console.log('Buscando por:', searchTerm);
      // Aqui você pode chamar sua função de busca
    }
  };

  return (
    <ThemeProvider theme={theme}>

      <Box
        sx={{
          width: '100%',
          minHeight: '18rem',
          p: { md: 6, xs: 2 },
          display: 'flex',
          flexWrap: 'wrap',
          color: 'white',
          backgroundColor: '#014421'
          // background: 'linear-gradient(135deg, #014421 0%, #228B22 50%, #2E8B57 100%)',
        }}
      >
        {/* Texto da Esquerda */}
        <Box
          sx={{
            width: { xs: '100%', md: '50%' },
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h2"
            fontWeight="bold"
            gutterBottom
            sx={{
              textAlign: 'center',
              fontSize: {
                xs: '1.5rem',  // smartphones (~24px)
                sm: '2rem',    // tablets (~32px)
                md: '2.5rem',  // notebooks (~40px)
                lg: '3rem',    // desktops (~48px)
              },
            }}
          >
            Desenvolva habilidades e conecte-se com o mercado de emprego
          </Typography>

          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              mt: 1,
              textAlign: 'center',
              fontStyle: 'italic',
              fontSize: {
                xs: '1rem',
                sm: '1.25rem',
                md: '1.5rem',
              },
            }}
          >
            Formação. Certificação. Conexões.
          </Typography>
          {!user && (
            <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
            <Button
              href="/account/login"
              sx={{
                backgroundColor: 'white',
                color: 'green',
                border: 'none',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
                padding: 2
              }}
            >
              Comece agora
            </Button>
          </Box>
          )}
          

        </Box>

        {/* Carrossel da Direita */}
        <Box
          sx={{
            width: { xs: '100%', md: '50%' },
            position: 'relative',
            aspectRatio: '3 / 2', // Mantém o mesmo formato sempre
            mt: { xs: 4, md: 0 },
            overflow: 'hidden',
            borderRadius: 2,
          }}
        >
          <Image
            src={slides[currentSlide].imageUrl}
            alt={slides[currentSlide].title}
            fill
            priority
            style={{
              objectFit: 'cover',
              borderRadius: '0.5rem',
            }}
          />


          {/* Overlay com ícone e texto */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              borderRadius: '0.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              px: 2,
            }}
          >
            <CurrentIcon
              size={40}
              color="white"
              style={{
                marginBottom: '1rem',
              }}
            />

            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              sx={{
                fontSize: {
                  xs: '1.25rem', // ~20px
                  sm: '1.5rem',  // ~24px
                  md: '1.75rem', // ~28px
                },
                textAlign: {
                  xs: 'center',
                  md: 'inherit',
                },
              }}
            >
              {slides[currentSlide].title}
            </Typography>

            <Typography
              variant="body1"
              fontWeight="bold"
              maxWidth="80%"
              sx={{
                fontSize: {
                  xs: '0.875rem', // ~14px
                  sm: '1rem',
                },
                textAlign: {
                  xs: 'center',
                  md: 'inherit',
                },
              }}
            >
              {slides[currentSlide].description}
            </Typography>

          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
