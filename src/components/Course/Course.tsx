import Link from 'next/link'
import React from 'react'
import VideoPlay from '../VideoPlay/VideoPlay'
import { useModalContext } from '../Provider/ModalProvider/ModalProvider';
import { useContextIdCourse } from '../Provider/IdCourseProvider/IdCourseProvider';
import { Box, Typography, Button } from '@mui/material';
import { courses } from '../../data/courses';
import Image from 'next/image';

export default function Course() {
  const { setOpenModalCourse } = useModalContext()
  const { setIdCourse } = useContextIdCourse()

  const handleOpenModalCourse = (id: string) => {
    setOpenModalCourse(true)
    setIdCourse(id)
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: {
          xs: '1fr',
          sm: '1fr 1fr',
          md: '1fr 1fr 1fr',
          lg: '1fr 1fr 1fr 1fr'
        }
      }}
    >
      {courses.map((item) => (
        <Box
          key={item.id}
          sx={{
            backgroundColor: 'white',
            color: '#1e293b',
            borderRadius: 2,
            overflow: 'hidden',
            border: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            transition: 'box-shadow 0.3s ease',
            '&:hover': {
              boxShadow: 3, // Sombra suave no hover
            },
          }}
        >
          <Box
            sx={{
              width: '100%',
              position: 'relative',
              cursor: 'pointer',
              backgroundColor: 'black',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}
            onClick={() => handleOpenModalCourse(item.id)}
          >
            <Image
              src={item?.playlist[0]?.cover}
              alt=''
              blurDataURL={item?.playlist[0]?.cover}
              className='w-full h-48 object-cover transition-transform duration-300 ease-in-out transform hover:scale-105'
              width={0}
              height={0}
              unoptimized
            />
          </Box>

          <div className='space-y-4 p-2'>
            <Typography variant="h6">{item.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              curso de {item.author}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {item.description}
            </Typography>
          </div>

          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'flex-end', p: 2, justifyContent: 'space-between' }}>
            <Typography variant="subtitle1" fontWeight="bold">Gratuito</Typography>
            <Link href={`/course?id=${item.id}`} passHref>
              <Button
                variant="outlined"
                sx={{
                  borderColor: '#228B22',
                  color: '#228B22',
                  '&:hover': {
                    backgroundColor: '#228B22',
                    color: '#fff',
                  },
                  borderRadius: 2,
                  textTransform: 'none',
                }}
              >
                Assisitir
              </Button>
            </Link>
          </Box>
        </Box>
      ))}
    </Box>
  )
}
