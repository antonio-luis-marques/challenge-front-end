import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Chip, Stack, Button } from '@mui/material';
import { Award, BookCheck, PlayCircle, Smile, Star, Lock } from 'lucide-react';
import VideoPlay from '../VideoPlay/VideoPlay';
import ModalQuiz from '../ModalQuiz/ModalQuiz';
import ModalMpesaPay from '../ModalMpesaPay/ModalMpesaPay';

import { courses } from '@/data/course';
import { UserStorage } from '../../../lib/UserStorage';
import { useRouter } from 'next/navigation';

interface DetailCourseProps {
  id: string;
}

export default function DetailCourse({ id }: DetailCourseProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [quizPassed, setQuizPassed] = useState(false);
  const [openQuiz, setOpenQuiz] = useState(false);
  const [openMpesa, setOpenMpesa] = useState(false);

  const router = useRouter()
  const course = courses.find(course => course.id === id);

  const allVideos = course
    ? [
      { ...course.introVideo, moduleTitle: 'Introdução' },
      ...course.modules.flatMap(mod =>
        mod.videos.map(video => ({
          ...video,
          moduleTitle: mod.title,
        }))
      ),
    ]
    : [];

  useEffect(() => {
    const handleScroll = () => { };
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

  const handleOpenQuiz = () => setOpenQuiz(true);
  const handleQuizSuccess = () => {
    setQuizPassed(true);
    setOpenQuiz(false);
  };

  const handleOpenMpesa = () => {
    const sessionUser = UserStorage.getSession();
    if (!sessionUser) return router.push('/account/login')
    setOpenMpesa(true);

  }
  const handleCloseMpesa = () => setOpenMpesa(false);

  const handleConfirmPayment = (phoneNumber: string) => {
    console.log('Número para pagamento:', phoneNumber);
    handleCloseMpesa();
  };

  const handleVideoClick = (index: number) => {
    if (index === 0 || quizPassed) {
      setSelectedIndex(index);
    }
  };

  return (
    <div className="bg-[#014421] py-8 px-4 lg:px-24">
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 8,
        }}
      >
        {/* Vídeo e informações principais */}
        <div className="md:w-[70%] w-full rounded-2xl overflow-hidden shadow-lg border border-green-500 bg-white">
          <div className="aspect-video bg-black relative flex">
            <VideoPlay
              url={allVideos[selectedIndex]?.videoUrl!}
              blurDataURL=""
              poster=""
            />
            <Button
              onClick={handleOpenQuiz}
              variant="outlined"
              sx={{
                backgroundColor: 'white',
                borderColor: '#228B22',
                color: '#228B22',
                '&:hover': {
                  backgroundColor: '#228B22',
                  color: '#fff',
                },
                borderRadius: 2,
                textTransform: 'none',
                position: 'absolute',
                top: 16,
                right: 16,
                fontSize: '0.875rem',
                zIndex: 20,
                boxShadow: 3,
                animation: 'pulse 2s infinite',
              }}
            >
              Avaliar-se para Liberar o Curso
            </Button>
          </div>
          <div className="p-4">
            <h2 className="text-xl font-semibold text-green-800 mt-1">{course.title}</h2>
            <p className="text-green-700 text-sm mt-2">por {course.instructor}</p>
            <p className="text-green-700 text-sm mt-2">{course.description}</p>
          </div>
        </div>

        {/* Playlist e detalhes do curso */}
        <div className="md:w-[30%] w-full space-y-8">
          <div className="max-w-md mx-auto bg-white border border-green-500 rounded-2xl shadow-lg overflow-hidden">
            <ul className="divide-y divide-green-200">
              {allVideos.map((video, index) => (
                <li
                  key={video.id}
                  className={`flex items-center gap-3 px-6 py-3 cursor-pointer transition-colors ${selectedIndex === index ? 'bg-green-100' : 'hover:bg-green-50'
                    }`}
                  onClick={() => handleVideoClick(index)} // Verificar se a aula pode ser clicada
                >
                  <PlayCircle className="text-green-600 w-5 h-5" />
                  <span className="text-green-800 text-sm">{video.title}</span>
                  {/* Verifique se o vídeo está trancado */}
                  {quizPassed || index === 0 ? null : (
                    <Lock className="text-green-600 w-5 h-5 ml-auto" />
                  )}
                </li>
              ))}
            </ul>
          </div>

          <Paper sx={{ p: 2, borderRadius: 2, overflow: 'hidden' }}>
            <Box display="flex" justifyContent="space-between" alignItems="flex-end">
              <Typography variant="subtitle1" fontWeight="bold">
                {course.price?.toFixed(2)} MZN
              </Typography>
              <Button
                variant="outlined"
                onClick={handleOpenMpesa}
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
                Matricular-se
              </Button>
            </Box>

            <Box mt={2}>
              <Stack spacing={1} fontSize="0.875rem">
                <Stack direction="row" spacing={1} alignItems="center">
                  <Star size={16} />
                  <Typography variant="caption">Nível:</Typography>
                  <Chip
                    label="Iniciante"
                    size="small"
                    sx={{
                      bgcolor: '#228B22',
                      color: 'white',
                      fontFamily: 'monospace',
                    }}
                  />
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <BookCheck size={16} />
                  <Typography variant="caption">
                    {allVideos.length} aulas
                  </Typography>
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

      {/* Modais */}
      <ModalQuiz
        open={openQuiz}
        onSuccess={handleQuizSuccess}
        onClose={() => setOpenQuiz(false)}
      />
      <ModalMpesaPay
        open={openMpesa}
        onClose={handleCloseMpesa}
        onConfirm={handleConfirmPayment}
      />
    </div>
  );
}