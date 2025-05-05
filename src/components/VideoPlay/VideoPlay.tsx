import Video from 'next-video';
import { useEffect, useRef, useState } from 'react';
import { useModalContext } from '../Provider/ModalProvider/ModalProvider';

interface VideoPlayProps {
    url: string;
    poster: string;
    blurDataURL: string;
    markVideoAsCompleted?: () => void; // nova prop
}

export default function VideoPlay({ url, poster, blurDataURL, markVideoAsCompleted }: VideoPlayProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [stateCover, setStateCover] = useState(false);
    const { openModalCourse } = useModalContext();
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const [videoSize, setVideoSize] = useState<{ width: number; height: number }>({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        if (videoRef.current && !openModalCourse) {
            videoRef.current.pause();
        }
    }, [openModalCourse]);

    const updateVideoSize = (): void => {
        if (videoContainerRef.current) {
            const width = videoContainerRef.current.offsetWidth;
            const height = width * 9 / 16;
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
            <Video
                autoPlay
                src={url}
                poster={poster}
                onEnded={() => {
                    if (markVideoAsCompleted) {
                        markVideoAsCompleted();
                    }
                }}
            />
        </div>
    );
}
