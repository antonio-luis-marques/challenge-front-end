import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Chip, Stack, Button, TextField } from '@mui/material';
import { Award, BookCheck, PlayCircle, Smile, Star, Lock, BookOpen, Clock, Cuboid } from 'lucide-react';
import VideoPlay from '../VideoPlay/VideoPlay';
import ModalMpesaPay from '../Modal/ModalMpesaPay';

import { courses } from '@/data/course';
import { UserData, UserStorage } from '../../../lib/UserStorage';
import { useRouter } from 'next/navigation';

interface DetailCourseProps {
  id: string;
}

export default function DetailCourse({ id }: DetailCourseProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [openMpesa, setOpenMpesa] = useState(false);
  const [completedVideos, setCompletedVideos] = useState<string[]>([]);
  const [blockSubmit, setBlockSubmit] = useState(true)
  const [openModules, setOpenModules] = useState<number[]>([]);
  const [paid, setPaid] = useState(false)
  const [user, setUser] = useState<UserData | null>(null)


  useEffect(() => {
    const sessionUser = UserStorage.getSession()
    if (sessionUser) setUser(sessionUser)
  }, [])

  const toggleModule = (index: number) => {
    setOpenModules((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };


  const router = useRouter()
  const course = courses.find(course => course.id === id);
  const [comment, setComment] = useState('');
  const [submittedComment, setSubmittedComment] = useState<string | null>(null);

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      setSubmittedComment(comment);
      setComment('');
      // Aqui você pode adicionar lógica para enviar o comentário a um backend ou salvar localmente.
    }
  };

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


  const isVideoUnlocked = (index: number) => {
    if (!paid) return index === 0;

    if (index === 1) return true;

    const previousVideo = allVideos[index - 1];

    if (!previousVideo?.id) return false; // ou true, dependendo da lógica desejada

    return completedVideos.includes(previousVideo.id);
  };


  const handleVideoClick = (index: number) => {
    if (isVideoUnlocked(index)) {
      setSelectedIndex(index);
    }
  };

  // Excluir o vídeo de introdução do total de aulas
  const courseVideos = allVideos.slice(1);


  const totalDurationInSeconds = allVideos.reduce((sum, video) => sum + (video.durationInSeconds || 0), 0);

  // Converter segundos para formato legível (ex: 1h 25min)
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours > 0 ? `${hours}h ` : ''}${minutes}min`;
  };

  const formattedTotalDuration = formatDuration(totalDurationInSeconds);


  if (!course) {
    return (
      <div className="text-white text-center p-8">
        Curso não encontrado.
      </div>
    );
  }

  const handleOpenMpesa = () => {
    const sessionUser = UserStorage.getSession();
    if (!sessionUser) return router.push('/account/register')
    setOpenMpesa(true);

  }
  const handleCloseMpesa = () => setOpenMpesa(false);

  const handleConfirmPayment = (phoneNumber: string) => {
    console.log('Número para pagamento:', phoneNumber);
    setPaid(true)
    handleCloseMpesa();
  };


  const markVideoAsCompleted = (videoId: string) => {
    if (!completedVideos.includes(videoId)) {
      const updatedCompleted = [...completedVideos, videoId];
      setCompletedVideos(updatedCompleted);

      const allCourseVideoIds = courseVideos.map(video => video.id); // exclui introdução
      const isLastVideo = videoId === courseVideos[courseVideos.length - 1].id;

      const allCompleted = allCourseVideoIds.every(id => updatedCompleted.includes(String(id)));

      if (isLastVideo && allCompleted) {
        console.log("✅ Última aula concluída. Curso completo!");
        setBlockSubmit(false)
      }
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
        <div className="md:w-[70%] w-full  ">
          <div className='shadow-lg border border-green-500 bg-white rounded-lg overflow-hidden'>
            <div className="aspect-video bg-black relative flex">
              <VideoPlay
                url={allVideos[selectedIndex]?.videoUrl!}
                blurDataURL=""
                poster=""
                markVideoAsCompleted={() => markVideoAsCompleted(allVideos[selectedIndex]?.videoUrl!)}
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-green-800 mt-1">{course.title}</h2>
              <p className="text-green-700 text-sm mt-2">por {course.instructor}</p>
              <p className="text-green-700 text-sm mt-2">{course.description}</p>
            </div>
          </div>
          <Box mt={6} bgcolor="white" p={3} borderRadius={2} boxShadow={3}>
            <Typography variant="h6" gutterBottom color="green">
              Deixe um comentário
            </Typography>
            <TextField
              label="Seu comentário"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              sx={{

                '& label.Mui-focused': {
                  color: '#228B22',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#228B22',
                  },
                  '&:hover fieldset': {
                    borderColor: '#1e7a1e',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#228B22',
                  },
                },
              }}
            />
            <Box mt={2} textAlign="right">
              <Button
                variant="contained"
                onClick={handleCommentSubmit}
                sx={{
                  backgroundColor: '#228B22',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#196619',
                  },
                }}
              >
                Enviar
              </Button>
            </Box>

            {submittedComment && (
              <Box mt={3} p={2} border="1px solid #ccc" borderRadius={1}>
                <Typography variant="subtitle2">Comentário enviado:</Typography>
                <Typography>{submittedComment}</Typography>
              </Box>
            )}
          </Box>
        </div>

        {/* Playlist e detalhes do curso */}
        <div className="md:w-[30%] w-full space-y-8">
          <div className="max-w-md mx-auto bg-white border-2 border-green-600 rounded-2xl shadow-lg overflow-hidden p-2 space-y-2">

            <div className='flex space-x-4'>
              <div className="flex items-center gap-2 mb-2 px-2">
                <BookOpen className="text-green-600 w-5 h-5" />
                <p className="text-green-800 font-semibold text-sm">
                  {course.modules.length} módulo{course.modules.length > 1 ? 's' : ''}
                </p>
              </div>
              <div className="flex items-center gap-2 mb-2 px-2">
                <BookOpen className="text-green-600 w-5 h-5" />
                <p className="text-green-800 font-semibold text-sm">
                  {courseVideos.length} aula{courseVideos.length > 1 ? 's' : ''}
                </p>
              </div>
              <div className="flex items-center gap-2 mb-2 px-2">
                <Clock className="text-green-600 w-5 h-5" />
                <p className="text-green-800 font-semibold text-sm">
                  {formattedTotalDuration}
                </p>
              </div>
            </div>

            {course.modules.map((mod, modIndex) => {
              const videos = mod.videos.map((video) => ({
                ...video,
                moduleTitle: mod.title,
              }));

              const isOpen = openModules.includes(modIndex);

              return (
                <div
                  key={mod.title}
                  className="border border-green-300 rounded-xl overflow-hidden"
                >
                  <div
                    className="bg-green-100 px-4 py-2 cursor-pointer hover:bg-green-200 transition"
                    onClick={() => toggleModule(modIndex)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 flex items-center justify-center rounded-full bg-green-600 text-white text-sm font-bold">
                        {modIndex + 1}
                      </div>
                      <h3 className="text-green-800 font-semibold">{mod.title}</h3>
                    </div>
                  </div>

                  {isOpen && (
                    <div>
                      <ul className="divide-y divide-green-200">
                        {videos.map((video, index) => {
                          const videoIndex = allVideos.findIndex(v => v.id === video.id);
                          return (
                            <li
                              key={video.id}
                              className={`flex items-center gap-3 px-6 py-3 cursor-pointer transition-colors ${selectedIndex === videoIndex
                                ? 'bg-green-100'
                                : 'hover:bg-green-50'
                                }`}
                              onClick={() => handleVideoClick(videoIndex)}
                            >
                              <PlayCircle className="text-green-600 w-5 h-5" />
                              <span className="text-green-800 text-sm">{video.title}</span>
                              {!isVideoUnlocked(videoIndex) && (
                                <Lock className="text-green-600 w-5 h-5 ml-auto" />
                              )}
                            </li>
                          );
                        })}
                      </ul>

                      {/* Divider visual entre as aulas e o campo de submissão */}
                      <div className="border-t border-green-300 mt-2 mb-3" />

                      {/* Campo para submeter link do GitHub */}
                      <div className="px-4 pb-4">
                        <label className="block text-sm text-green-800 mb-2">Link do repositório GitHub</label>
                        <input
                          type="url"
                          placeholder="https://github.com/seuusuario/seurepositorio"
                          className="w-full border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100 disabled:text-gray-500"
                          disabled={blockSubmit}
                        />
                        {blockSubmit && (
                          <p className="text-xs text-red-600 mt-1">
                            ⚠️ Complete todas as aulas anteriores para liberar o envio do trabalho.
                          </p>
                        )}
                        <Button
                          fullWidth
                          variant="contained"
                          sx={{
                            backgroundColor: !blockSubmit ? '#228B22' : '#9ca3af', // verde ou cinza
                            textTransform: 'none',
                            mt: 2,
                            cursor: !blockSubmit ? 'pointer' : 'not-allowed',
                            '&:hover': {
                              backgroundColor: !blockSubmit ? '#196619' : '#9ca3af',
                            },
                          }}
                          disabled={blockSubmit}
                          onClick={() => {
                            if (blockSubmit) {
                              alert(`Link enviado com sucesso!`);
                            }
                          }}
                        >
                          Submeter Trabalho
                        </Button>
                      </div>

                    </div>
                  )}

                </div>
              );
            })}
          </div>


          <Paper sx={{ p: 2, borderRadius: 2, overflow: 'hidden' }}>
            <Box display="flex" justifyContent="space-between" alignItems="flex-end">
              <Typography variant="subtitle1" fontWeight="bold">
                {paid
                  ? 'Já adquirido'
                  : `${course.price?.toFixed(2)} MZN`}
              </Typography>

              {!paid && (
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
                  {user ? 'Matricular-se' : 'Avaliar-se'}
                </Button>
              )}
            </Box>

            <Box mt={2}>
              <Stack spacing={1} fontSize="0.875rem">
                <Stack direction="row" spacing={1} alignItems="center">
                  <Cuboid size={16} />
                  <Typography variant="caption">{course?.category}</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <BookCheck size={16} />
                  <Typography variant="caption">
                    {course.modules.length} módulo{course.modules.length > 1 ? 's' : ''}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <BookCheck size={16} />
                  <Typography variant="caption">
                    {courseVideos.length} aula{courseVideos.length > 1 ? 's' : ''}
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


      <ModalMpesaPay
        open={openMpesa}
        onClose={handleCloseMpesa}
        onConfirm={handleConfirmPayment}
        courseName={course.title}

      />
    </div>
  );
}