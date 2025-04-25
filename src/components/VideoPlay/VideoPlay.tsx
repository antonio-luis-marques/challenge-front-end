import Video from 'next-video';
import { useEffect, useRef, useState } from 'react';
import { useModalContext } from '../Provider/ModalProvider/ModalProvider';

interface VideoPlayProps {
    url: string; // URL do vídeo
    poster: string; // URL da imagem do poster
    blurDataURL: string; // URL da imagem borrada (low-res)
}

export default function VideoPlay({ url, poster, blurDataURL }: VideoPlayProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [stateCover, setStateCover] = useState(false);
    const { openModalCourse } = useModalContext();
    const videoContainerRef = useRef<HTMLDivElement>(null); // Ref para o container de vídeo
    const [videoSize, setVideoSize] = useState<{ width: number; height: number }>({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        if (videoRef.current) {
            if (!openModalCourse) {
                videoRef.current.pause();
            }
        }
    }, [openModalCourse]);

    const updateVideoSize = (): void => {
        if (videoContainerRef.current) {
            const width = videoContainerRef.current.offsetWidth;
            const height = width * 9 / 16; // Mantendo a proporção 16:9
            setVideoSize({ width, height });
        }
    };

    useEffect(() => {
        updateVideoSize();

        window.addEventListener('resize', updateVideoSize);

        return () => {
            window.removeEventListener('resize', updateVideoSize);
        };
    }, []);

    return (
        <div
            ref={videoContainerRef}
            style={{
                height: `${videoSize.height}px`,
            }}
            className={`z-20 flex w-full justify-center items-center overflow-hidden relative ${stateCover && 'hidden'}`}
        >
            {/* Componente Video com Poster e BlurDataURL */}
            <Video
                autoPlay
                src={url}
                poster={poster} // Adicionando a prop de poster
            />
        </div>
    );
}
