'use client';

import { Box, Card, CardContent, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

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
];

export default function BenefitCarousel() {
  return (
    <Box
      sx={{
        backgroundColor: '#0E2B1C',
        py: 6,
        px: 2,
        color: 'white',
      }}
    >
      {/* título alinhado à esquerda */}
      <Typography variant="h6" fontWeight="bold" mb={4}>
      O que você ganha
      </Typography>

      {/* cards centralizados */}
      <Box
        sx={{
          overflowX: 'auto',
          display: 'flex',
          gap: 2,
          justifyContent: 'center',
          scrollSnapType: 'x mandatory',
          px: 2,
          '&::-webkit-scrollbar': { display: 'none' }, // oculta a barra de rolagem
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
            <Box sx={{ position: 'relative', height: 160 }}>
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
