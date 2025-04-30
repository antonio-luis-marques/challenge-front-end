import { ArrowRight, Award, BadgeCheck, BookCheck, List, Play, Smile, Star, X } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import VideoPlay from '../VideoPlay/VideoPlay'
import { courses } from '@/data/course'
import { useModalContext } from '../Provider/ModalProvider/ModalProvider'
import { Box, Button, Chip, Stack, Typography } from '@mui/material'
import { useContextIdCourse } from '../Provider/IdCourseProvider/IdCourseProvider'
import { Course } from '@/models/course'

export default function PopUpCourse() {
    const { setOpenModalCourse } = useModalContext()
    const { idCourse } = useContextIdCourse()

    const courseGetById: Course | undefined = courses.find(course => course.id === idCourse)

    const handleCloseModal = () => {
        setOpenModalCourse(false)
    }

    const hasFreeVideos = (course: Course) =>
        course.modules.some(mod => mod.videos.some(vid => vid.isFree))

    if (!courseGetById) return null // previne renderização se não houver curso encontrado

    return (
        <div className="fixed z-50">
            <div className="bg-black z-20 h-full w-full fixed top-0 opacity-90"></div>
            <div className="w-full h-screen top-0 fixed z-30 overflow-y-auto p-16 px-2 flex justify-center">
                <div className="bg-white md:w-[768px] w-full space-y-4 h-fit shadow-md border rounded-lg relative md:p-6 p-2">
                    <div className="w-full overflow-hidden rounded-lg bg-black relative flex justify-center items-center">
                        {/* Vídeo de introdução */}
                        <VideoPlay
                            url={courseGetById.introVideo?.videoUrl || ''}
                            blurDataURL={courseGetById.introVideo?.videoUrl || ''}
                            poster={courseGetById.introVideo?.videoUrl || ''}
                        />
                        <button
                            onClick={handleCloseModal}
                            className="absolute z-20 top-0 right-0 m-2 border border-green-600 bg-white text-green-600 rounded-md p-1 hover:bg-green-50 transition"
                            aria-label="Fechar"
                        >
                            <X size={20} />
                        </button>
                    </div>
                    <div className="flex md:flex-row flex-col w-full md:space-y-0 space-y-4 md:space-x-10">
                        <div className="md:w-3/5 space-y-4">
                            <div className="space-y-4">
                                <Typography variant="h6" fontWeight={500}>{courseGetById.title}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Curso de {courseGetById.instructor}
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
                                    {courseGetById.description}
                                </Typography>
                            </div>
                        </div>

                        <div className="flex-1 md:flex-col md:space-y-4 flex flex-col-reverse">
                            <div className="w-full md:pt-0 pt-4">
                            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                                    <Typography variant='subtitle1' fontWeight='bold'>
                                        {courseGetById.isFree ? 'Gratuito' : `MZN ${courseGetById.price?.toFixed(2)}`}
                                    </Typography>
                                    <Link href={`/course?id=${courseGetById.id}`} passHref>
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
                                            {courseGetById.isFree || hasFreeVideos(courseGetById) ? 'Assistir' : 'Matricular-se'}
                                        </Button>
                                    </Link>
                                </Box>
                            </div>

                            <Box mt={2} color="black">
                                <Stack spacing={1} fontSize="0.875rem">
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Star size={16} />
                                        <Typography variant="caption">{courseGetById.category}</Typography>
                                        <Chip
                                            label={courseGetById.isFree ? "Gratuito" : "Pago"}
                                            size="small"
                                            sx={{
                                                bgcolor: courseGetById.isFree ? '#228B22' : '#f44336',
                                                color: 'white',
                                                fontFamily: 'monospace',
                                            }}
                                        />
                                    </Stack>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <BookCheck size={16} />
                                        <Typography variant="caption">{courseGetById.modules.length} módulos</Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Award size={16} />
                                        <Typography variant="caption">{courseGetById.introVideo?.isFree ? 'Com acesso livre' : 'Pagamento necessário'}</Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Smile size={16} />
                                        <Typography variant="caption">Assista online e no seu ritmo</Typography>
                                    </Stack>
                                </Stack>
                            </Box>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}