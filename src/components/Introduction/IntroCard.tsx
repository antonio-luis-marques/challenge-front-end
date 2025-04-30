'use client';

import { ArrowRight, BookOpen, BadgeCheck, Store } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import theme from '../../../theme';
import { ThemeProvider } from '@mui/material/styles';


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
    imageUrl: 'https://res.cloudinary.com/dt0vpc25d/image/upload/v1746040184/grupo%20jungle/cover2.jpg',
  },
  {
    title: 'Marketplace',
    description: 'Conecte-se a oportunidades reais: ofereça serviços ou contrate talentos certificados em nossa plataforma exclusiva.',
    icon: Store,
    imageUrl: 'https://res.cloudinary.com/dt0vpc25d/image/upload/v1745864989/grupo%20jungle/cover.jpg',
  },
];

export default function IntroCard() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = slides[currentSlide].icon;

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

          <Link href="#listCourses" passHref>
            <Button
              variant="contained"
              sx={{
                mt: 3,
                backgroundColor: '#228B22',
                color: 'white',
                fontWeight: 'bold',
                borderRadius: 2,
                px: 3,
                py: 1,
                alignSelf: 'start',
                '&:hover': {
                  backgroundColor: '#014421',
                },
              }}
              endIcon={<ArrowRight />}
            >
              Comece agora
            </Button>
          </Link>
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
            style={{
              objectFit: 'cover',
              borderRadius: '0.5rem',
            }}
            unoptimized
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
