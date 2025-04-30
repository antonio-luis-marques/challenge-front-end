'use client'

import Link from 'next/link'
import React from 'react'
import { useModalContext } from '../Provider/ModalProvider/ModalProvider'
import { useContextIdCourse } from '../Provider/IdCourseProvider/IdCourseProvider'
import { Box, Typography, Button, ThemeProvider } from '@mui/material'
import { courses } from '@/data/course'
import Image from 'next/image'
import { useContextCategoryCourse } from '../Provider/CategoryCourseProvider/CategoryCourseProvider'
import { Course as CourseType } from '@/models/course'
import theme from '../../../theme'

export default function Course() {
  const { setOpenModalCourse } = useModalContext()
  const { setIdCourse } = useContextIdCourse()
  const { categoryCourse } = useContextCategoryCourse()

  const handleOpenModalCourse = (id: string) => {
    setOpenModalCourse(true)
    setIdCourse(id)
  }

  const hasFreeVideos = (course: CourseType) =>
    course.modules.some(mod => mod.videos.some(vid => vid.isFree))

  const filteredCourses = categoryCourse
    ? courses.filter(course => course.category === categoryCourse)
    : courses

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            md: '1fr 1fr 1fr',
            lg: '1fr 1fr 1fr 1fr',
          },
        }}
      >
        {filteredCourses.map((item) => (
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
                boxShadow: 3,
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
                overflow: 'hidden',
              }}
              onClick={() => handleOpenModalCourse(item.id)}
            >
              <Image
                src={'https://res.cloudinary.com/dt0vpc25d/image/upload/v1745554439/mentorconnect/graphql/crnmbvast9wtvl9qx59u.png'}
                alt={item.title}
                className='w-full h-48 object-cover transition-transform duration-300 ease-in-out transform hover:scale-105'
                width={400}
                height={192}
                unoptimized
              />
            </Box>

            <div className='space-y-4 p-2'>
              <Typography variant='h6'>{item.title}</Typography>
              <Typography variant='body2' color='text.secondary' sx={{ fontWeight: 500 }}>
                {item.category}
              </Typography>
              {/* Novo campo: Exibir o nome do instrutor */}
              <Typography variant='body2' color='text.secondary' sx={{ fontWeight: 500 }}>
                Instrutor: {item.instructor}
              </Typography>
              <Typography
                variant='body2'
                color='text.secondary'
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

            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'flex-end',
                p: 2,
                justifyContent: 'space-between',
              }}
            >
              <Typography variant='subtitle1' fontWeight='bold'>
                {item.isFree ? 'Gratuito' : `MZN ${item.price?.toFixed(2)}`}
              </Typography>
              <Link href={`/course?id=${item.id}`} passHref>
                <Button
                  variant='outlined'
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
                  {item.isFree || hasFreeVideos(item) ? 'Assistir' : 'Matricular-se'}
                </Button>
              </Link>
            </Box>
          </Box>
        ))}
      </Box>
    </ThemeProvider>
  )
}