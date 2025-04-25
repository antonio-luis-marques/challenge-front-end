import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Chip, Stack } from '@mui/material';
import { Award, BookCheck, PlayCircle, Smile, Star } from 'lucide-react';
import VideoPlay from '../VideoPlay/VideoPlay';
import { courses } from '../../data/courses';

interface DetailCourseProps {
  id: string;
}

export default function DetailCourse({ id }: DetailCourseProps) {
  const [lastScrollY, setLastScrollY] = useState(0);
  const course = courses.find((course) => course.id === id);

  // ESTADO PARA CONTROLAR O ÍNDICE ATUAL DO VÍDEO
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setLastScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!course) {
    return (
      <div className="text-white text-center p-8">
        Curso não encontrado.
      </div>
    );
  }

  return (
    <div className="bg-[#014421] py-8 px-4 lg:px-24">
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          display: 'flex',
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
          gap: 8,
        }}
      >
        {/* Video Player + Info */}
        <div className="md:w-[70%] w-full rounded-2xl overflow-hidden shadow-lg border border-green-500 bg-white">
          <div className="aspect-video bg-black">
            <VideoPlay 
            url={course.playlist[selectedIndex]?.url} 
            blurDataURL={course.playlist[selectedIndex]?.cover || ''}
            poster={course.playlist[selectedIndex]?.cover || ''}
            />
          </div>
          <div className="p-4">
            <h2 className="text-xl font-semibold text-green-800 mt-1">{course.title}</h2>
            <p className="text-green-700 text-sm mt-2">por {course.author}</p>
            <p className="text-green-700 text-sm mt-2">{course.description}</p>
          </div>
        </div>

        {/* Playlist + Detalhes */}
        <div className="md:w-[30%] w-full space-y-8">
          {/* Playlist */}
          <div className="max-w-md mx-auto bg-white border border-green-500 rounded-2xl shadow-lg overflow-hidden">
            <ul className="divide-y divide-green-200">
              {course.playlist.map((lesson, index) => (
                <li
                  key={lesson.id}
                  className={`flex items-center gap-3 px-6 py-3 cursor-pointer transition-colors ${
                    selectedIndex === index ? 'bg-green-100' : 'hover:bg-green-50'
                  }`}
                  onClick={() => setSelectedIndex(index)} // <-- ATUALIZA O VÍDEO ATUAL
                >
                  <PlayCircle className="text-green-600 w-5 h-5" />
                  <span className="text-green-800 text-sm">{lesson.title}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Detalhes */}
          <Paper sx={{ p: 2, borderRadius: 2, overflow: 'hidden' }}>
            <Typography variant="h6" fontWeight="bold">
              Curso Gratuito
            </Typography>
            <Box mt={2} color="black">
              <Stack spacing={1} fontSize="0.875rem">
                <Stack direction="row" spacing={1} alignItems="center">
                  <Star size={16} />
                  <Typography variant="caption">Nível:</Typography>
                  <Chip
                    label="Iniciante"
                    size="small"
                    sx={{ bgcolor: '#228B22', color: 'white', fontFamily: 'monospace' }}
                  />
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <BookCheck size={16} />
                  <Typography variant="caption">{course.playlist.length} aulas</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Award size={16} />
                  <Typography variant="caption">Com certificado</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Smile size={16} />
                  <Typography variant="caption">Online e ao seu ritmo</Typography>
                </Stack>
              </Stack>
            </Box>
          </Paper>
        </div>
      </Box>
    </div>
  );
}