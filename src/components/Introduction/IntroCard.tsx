'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import Image from 'next/image';

export default function IntroCard() {
    return (
        <Box
            sx={{
                position: 'relative',
                height: '24rem', // h-96
                backgroundColor: '#014421',
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                // flexDirection: 'column',
                textAlign: 'center',
                px: 2,
            }}
        >
            <div className='flex-1 h-full relative md:flex hidden'>
                <Image
                    blurDataURL={'https://www.dropbox.com/scl/fi/aexcoqhb2m3j5y3k8c9bl/confeitaria.jpg?rlkey=z2u3qutyd02trd6fr3f7x0s95&st=uz7scyii&raw=1'}
                    src={'https://www.dropbox.com/scl/fi/aexcoqhb2m3j5y3k8c9bl/confeitaria.jpg?rlkey=z2u3qutyd02trd6fr3f7x0s95&st=uz7scyii&raw=1'}
                    alt='' className='w-auto h-3/4 absolute top-2 border-[8px] border-zinc-100 rounded-lg' width={0} height={0} unoptimized
                />
            </div>

            <Container maxWidth="sm" >
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Encontre o curso perfeito para sua paixão ou carreira
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
                            '&:hover': {
                                backgroundColor: '#014421',
                            },
                        }}
                        endIcon={<ArrowRight />}
                    >
                        Ver cursos
                    </Button>

                </Link>
            </Container>
            <div className='flex-1 h-full relative md:flex hidden'>
                <Image
                    blurDataURL={'https://www.dropbox.com/scl/fi/aexcoqhb2m3j5y3k8c9bl/confeitaria.jpg?rlkey=z2u3qutyd02trd6fr3f7x0s95&st=uz7scyii&raw=1'}
                    src={'https://www.dropbox.com/scl/fi/aexcoqhb2m3j5y3k8c9bl/confeitaria.jpg?rlkey=z2u3qutyd02trd6fr3f7x0s95&st=uz7scyii&raw=1'}
                    alt='' className='w-auto h-3/4 absolute bottom-2 right-0 border-[8px] border-zinc-100 rounded-lg' width={0} height={0} unoptimized
                />
            </div>

        </Box>
    );
}