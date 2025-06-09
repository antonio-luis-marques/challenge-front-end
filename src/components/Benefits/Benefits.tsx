'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Box, Card, CardContent, IconButton, Typography, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '@mui/material/styles';

const benefits = [
  {
    title: 'Formação prática e direcionada',
    description: 'Aprenda exatamente o que o mercado precisa com projetos reais.',
    image: 'https://res.cloudinary.com/dt0vpc25d/image/upload/v1746038625/grupo%20jungle/cover1.jpg',
  },
  {
    title: 'Certificado reconhecido',
    description: 'Receba um selo de qualidade que valoriza seu perfil no marketplace.',
    image: 'https://res.cloudinary.com/dt0vpc25d/image/upload/v1746038625/grupo%20jungle/cover1.jpg',
  },
  {
    title: 'Acesso privilegiado ao mercado',
    description: 'Conecte-se com empresas que buscam profissionais de qualidade.',
    image: 'https://res.cloudinary.com/dt0vpc25d/image/upload/v1746038625/grupo%20jungle/cover1.jpg',
  },
  {
    title: 'Acesso privilegiado ao mercado',
    description: 'Conecte-se com empresas que buscam profissionais de qualidade.',
    image: 'https://res.cloudinary.com/dt0vpc25d/image/upload/v1746038625/grupo%20jungle/cover1.jpg',
  },
  {
    title: 'Acesso privilegiado ao mercado',
    description: 'Conecte-se com empresas que buscam profissionais de qualidade.',
    image: 'https://res.cloudinary.com/dt0vpc25d/image/upload/v1746038625/grupo%20jungle/cover1.jpg',
  },
  {
    title: 'Acesso privilegiado ao mercado',
    description: 'Conecte-se com empresas que buscam profissionais de qualidade.',
    image: 'https://res.cloudinary.com/dt0vpc25d/image/upload/v1746038625/grupo%20jungle/cover1.jpg',
  },
  {
    title: 'Acesso privilegiado ao mercado',
    description: 'Conecte-se com empresas que buscam profissionais de qualidade.',
    image: 'https://res.cloudinary.com/dt0vpc25d/image/upload/v1746038625/grupo%20jungle/cover1.jpg',
  },
  {
    title: 'Acesso privilegiado ao mercado',
    description: 'Conecte-se com empresas que buscam profissionais de qualidade.',
    image: 'https://res.cloudinary.com/dt0vpc25d/image/upload/v1746038625/grupo%20jungle/cover1.jpg',
  },
  {
    title: 'Acesso privilegiado ao mercado',
    description: 'Conecte-se com empresas que buscam profissionais de qualidade.',
    image: 'https://res.cloudinary.com/dt0vpc25d/image/upload/v1746038625/grupo%20jungle/cover1.jpg',
  },
];

export default function BenefitCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const theme = useTheme();
  const isLaptop = useMediaQuery(theme.breakpoints.up('md'));

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.8;
    el.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    checkScroll();
    el.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);

    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  return (
    <Box sx={{ backgroundColor: '#0E2B1C', py: 6, px: 2, color: 'white', position: 'relative' }}>
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 3, textAlign: 'center' }}>
        O que você ganha
      </Typography>
      {/* Setas de navegação (visíveis apenas em telas médias para cima) */}
      {isLaptop && canScrollLeft && (
        <IconButton
          onClick={() => scroll('left')}
          sx={{
            position: 'absolute',
            top: '50%',
            left: 0,
            transform: 'translateY(-50%)',
            zIndex: 2,
            color: 'white',
            backgroundColor: 'rgba(0,0,0,0.4)',
            '&:hover': { backgroundColor: 'rgba(0,0,0,0.6)' },
          }}
        >
          <ChevronLeft />
        </IconButton>
      )}

      {isLaptop && canScrollRight && (
        <IconButton
          onClick={() => scroll('right')}
          sx={{
            position: 'absolute',
            top: '50%',
            right: 0,
            transform: 'translateY(-50%)',
            zIndex: 2,
            color: 'white',
            backgroundColor: 'rgba(0,0,0,0.4)',
            '&:hover': { backgroundColor: 'rgba(0,0,0,0.6)' },
          }}
        >
          <ChevronRight />
        </IconButton>
      )}

      <Box
        ref={scrollRef}
        sx={{
          overflowX: 'auto',
          display: 'flex',
          gap: 2,
          scrollSnapType: 'x mandatory',
          px: 2,
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {benefits.map((benefit, index) => (
          <Card
            key={index}
            sx={{
              minWidth: 280,
              maxWidth: 320,
              flex: '0 0 auto',
              scrollSnapAlign: 'start',
              borderRadius: 3,
              overflow: 'hidden',
              boxShadow: 4,
              backgroundColor: '#ffffff',
            }}
          >
            <Box sx={{ position: 'relative', width: '100%', aspectRatio: '16 / 9' }}>
              <Image
                src={benefit.image}
                alt={benefit.title}
                fill
                style={{ objectFit: 'cover' }}
              />
            </Box>
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                {benefit.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {benefit.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
