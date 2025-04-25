import { ArrowRight, Award, BadgeCheck, BookCheck, List, Play, Smile, Star, X, XIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import VideoPlay from '../VideoPlay/VideoPlay'
import { courses } from '../../data/courses'
import { useModalContext } from '../Provider/ModalProvider/ModalProvider'
import { Box, Button, Chip, Stack, Typography } from '@mui/material'
import { useContextIdCourse } from '../Provider/IdCourseProvider/IdCourseProvider'


export default function PopUpCourse() {
    const { setOpenModalCourse } = useModalContext()
    const { idCourse } = useContextIdCourse()

    const courseGetById = courses.find(course => course.id === idCourse)

    const handleCloseModal = () => {
        setOpenModalCourse(false)
    }

    return (
        <div className="fixed z-50">
            <div className="bg-black z-20 h-full w-full fixed top-0 opacity-90"></div>
            <div className="w-full h-screen top-0 fixed z-30 overflow-y-auto p-16 px-2 flex justify-center">
                <div className="bg-white md:w-[768px] w-full space-y-4 h-fit shadow-md border rounded-lg relative md:p-6 p-2">
                    <div className="w-full overflow-hidden rounded-lg bg-black relative flex justify-center items-center">
                        <VideoPlay
                            url={courseGetById?.playlist[0]?.url || ''}
                            blurDataURL={courseGetById?.playlist[0]?.cover || ''}
                            poster={courseGetById?.playlist[0]?.cover || ''}
                        />
                        <div onClick={handleCloseModal} className="absolute z-20 cursor-pointer select-none top-0 right-0 bg-zinc-950 text-white p-2 font-semibold">
                            <X />
                        </div>
                    </div>

                    <div className="flex md:flex-row flex-col w-full md:space-y-0 space-y-4 md:space-x-10">
                        <div className="md:w-3/5 space-y-4">
                            <div className="space-y-4">
                                <Typography variant="h6">{courseGetById?.title}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Curso de {courseGetById?.author}
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
                                    {courseGetById?.description}
                                </Typography>
                            </div>
                        </div>

                        <div className="flex-1 md:flex-col md:space-y-4 flex flex-col-reverse">
                            <div className="w-full md:pt-0 pt-4">
                                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                                    <Typography variant="subtitle1" fontWeight="bold">Gratuito</Typography>
                                    <Link href={`/course?id=${courseGetById?.id}`} passHref>
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
                            </div>

                            <Box mt={2} color="black">
                                <Stack spacing={1} fontSize="0.875rem">
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Star size={16} />
                                        <Typography variant="caption">Nível:</Typography>
                                        <Chip label="Iniciante" size="small" sx={{ bgcolor: '#228B22', color: 'white', fontFamily: 'monospace' }} />
                                    </Stack>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <BookCheck size={16} />
                                        <Typography variant="caption">4 aulas (2h)</Typography>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}