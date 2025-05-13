'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Avatar, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const graduates = [
  { name: 'Ana Silva', area: 'Desenvolvedora Front-End', image: '/avatars/ana.jpg' },
  { name: 'Carlos Souza', area: 'Designer UX/UI', image: '/avatars/carlos.jpg' },
  { name: 'Mariana Rocha', area: 'Analista de Dados', image: '/avatars/mariana.jpg' },
  { name: 'João Mendes', area: 'Especialista em Automação', image: '/avatars/joao.jpg' },
  { name: 'Bruna Costa', area: 'Gestora de Projetos Ágeis', image: '/avatars/bruna.jpg' },
];

export default function GraduatesSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showButtons, setShowButtons] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(container.scrollLeft + container.clientWidth < container.scrollWidth);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      updateScrollButtons();
      container.addEventListener('scroll', updateScrollButtons);
      window.addEventListener('resize', updateScrollButtons);
      return () => {
        container.removeEventListener('scroll', updateScrollButtons);
        window.removeEventListener('resize', updateScrollButtons);
      };
    }
  }, []);

  return (
    <Box
      sx={{ py: 4, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 3, textAlign: 'center' }}>
        Nossos Formados
      </Typography>

      <Box
        onMouseEnter={() => {
          setShowButtons(true);
          updateScrollButtons();
        }}
        onMouseLeave={() => setShowButtons(false)}
        sx={{ position: 'relative', width: '100%' }}
      >
        {showButtons && canScrollLeft && (
          <IconButton
            onClick={() => scroll('left')}
            sx={{
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              color: 'white',
              backgroundColor: 'rgba(0,0,0,0.5)',
              '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' },
            }}
          >
            <ChevronLeft />
          </IconButton>
        )}

        <Box
          ref={scrollRef}
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            pb: 1,
            pr: 1,
            justifyContent: 'center',
            cursor: 'grab',
            '&:active': { cursor: 'grabbing' },
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {graduates.map((grad, index) => (
            <Card
              key={index}
              sx={{
                minWidth: { xs: 200, sm: 220, md: 250 },
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                py: 3,
                borderRadius: 3,
                bgcolor: '#0E2B1C',
                boxShadow: 'none',
                color: 'white',
              }}
            >
              <Avatar
                alt={grad.name}
                src={grad.image}
                sx={{ width: 80, height: 80, mb: 2 }}
              />
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle1" fontWeight="bold" color="white">
                  {grad.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  {grad.area}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {showButtons && canScrollRight && (
          <IconButton
            onClick={() => scroll('right')}
            sx={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              color: 'white',
              backgroundColor: 'rgba(0,0,0,0.5)',
              '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' },
            }}
          >
            <ChevronRight />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}