import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';

const videos = [
    { id: 1, src: '/assets/videos/avatar1.mp4', title: 'Avatar 1' },
    { id: 2, src: '/assets/videos/avatar2.mp4', title: 'Avatar 2' },
    { id: 3, src: '/assets/videos/avatar3.mp4', title: 'Avatar 3' },
];

const VideoCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [progress, setProgress] = useState(0);
    const videoRefs = useRef([]);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % videos.length);
        setIsMuted(true); // Reset mute when changing videos
        setIsPlaying(true);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
        setIsMuted(true);
        setIsPlaying(true);
    };

    const handleCardClick = (position) => {
        if (position === -1) handlePrev();
        else if (position === 1) handleNext();
        else toggleMute();
    };

    const toggleMute = (e) => {
        if (e) e.stopPropagation();
        setIsMuted(!isMuted);
    };

    useEffect(() => {
        videoRefs.current.forEach((video, index) => {
            if (video) {
                if (index === currentIndex) {
                    if (isPlaying) {
                        video.muted = isMuted;
                        // Attempt play. If unmuted policies block it, we might need to fallback or it just won't play until user interaction
                        const playPromise = video.play();
                        if (playPromise !== undefined) {
                            playPromise.catch(() => {
                                // Auto-play was prevented
                                // We could fallback to muted=true if we strictly wanted autoplay, 
                                // but we are handling that via state. 
                            });
                        }
                    } else {
                        video.pause();
                    }
                } else {
                    video.pause();
                    video.currentTime = 0;
                }
            }
        });
    }, [currentIndex, isPlaying, isMuted]);

    // Progress Bar Logic
    useEffect(() => {
        const currentVideo = videoRefs.current[currentIndex];
        if (!currentVideo) return;

        const updateProgress = () => {
            if (currentVideo.duration) {
                const val = (currentVideo.currentTime / currentVideo.duration) * 100;
                setProgress(val || 0);
            }
        };

        currentVideo.addEventListener('timeupdate', updateProgress);
        return () => currentVideo.removeEventListener('timeupdate', updateProgress);
    }, [currentIndex]);

    return (
        <div className="relative w-full max-w-5xl mx-auto h-[700px] flex items-center justify-center perspective-1000 py-20 pb-40">
            {/* Navigation Buttons */}
            <button
                onClick={handlePrev}
                className="absolute left-4 md:left-10 z-30 p-4 rounded-full bg-slate-900/50 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 transition-all duration-300 transform hover:scale-110 group shadow-lg"
            >
                <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
            </button>

            <button
                onClick={handleNext}
                className="absolute right-4 md:right-10 z-30 p-4 rounded-full bg-slate-900/50 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 transition-all duration-300 transform hover:scale-110 group shadow-lg"
            >
                <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Carousel Items */}
            <div className="relative w-full h-full flex items-center justify-center">
                {videos.map((video, index) => {
                    let position = (index - currentIndex + videos.length) % videos.length;
                    if (position > 1) position -= videos.length;

                    const isActive = position === 0;
                    const isLeft = position === -1;
                    const isRight = position === 1;

                    const variants = {
                        center: {
                            x: 0,
                            scale: 1,
                            zIndex: 30,
                            opacity: 1,
                            rotateY: 0,
                            filter: "brightness(1) blur(0px)",
                        },
                        left: {
                            x: "-50%",
                            scale: 0.85,
                            zIndex: 20,
                            opacity: 0.7,
                            rotateY: 25,
                            filter: "brightness(0.5) blur(3px)",
                        },
                        right: {
                            x: "50%",
                            scale: 0.85,
                            zIndex: 20,
                            opacity: 0.7,
                            rotateY: -25,
                            filter: "brightness(0.5) blur(3px)",
                        },
                        hidden: {
                            x: 0,
                            scale: 0.5,
                            zIndex: 0,
                            opacity: 0,
                        }
                    };

                    let animateState = 'hidden';
                    if (isActive) animateState = 'center';
                    else if (isLeft) animateState = 'left';
                    else if (isRight) animateState = 'right';

                    return (
                        <motion.div
                            key={video.id}
                            variants={variants}
                            initial="center"
                            animate={animateState}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            onClick={() => handleCardClick(position)}
                            className={`absolute w-[280px] md:w-[340px] aspect-[9/16] rounded-[2rem] shadow-2xl bg-slate-900 cursor-pointer overflow-visible
                                ${isActive ? 'border-2 border-blue-500/50 shadow-[0_0_50px_-10px_rgba(59,130,246,0.5)]' : 'border border-white/10'}`}
                            style={{
                                transformStyle: "preserve-3d",
                                WebkitBoxReflect: isActive ? "below 10px linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)" : "none"
                            }}
                        >
                            <div className="relative w-full h-full group bg-slate-950 rounded-[1.9rem] overflow-hidden">
                                <video
                                    ref={(el) => (videoRefs.current[index] = el)}
                                    src={video.src}
                                    className="w-full h-full object-cover"
                                    loop
                                    playsInline
                                    muted // Controlled by prop/effect but good default
                                />

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/90 pointer-events-none" />

                                {/* Active State UI */}
                                <AnimatePresence>
                                    {isActive && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 flex flex-col justify-between p-6 pointer-events-none"
                                        >
                                            {/* Top Right Sound Toggle */}
                                            <div className="flex justify-end">
                                                <button
                                                    onClick={toggleMute}
                                                    className="pointer-events-auto p-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/90 hover:bg-white/20 transition-all hover:scale-105"
                                                >
                                                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                                                </button>
                                            </div>

                                            {/* Bottom Info */}
                                            <div className="space-y-4">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-[10px] font-bold shadow-lg">AL</div>
                                                        <span className="text-sm font-semibold text-white shadow-black drop-shadow-md">@AvatarLaunch</span>
                                                    </div>
                                                    <h3 className="text-xl font-bold text-white mb-1 leading-tight">{video.title}</h3>
                                                    <p className="text-xs text-blue-300/80 font-medium tracking-wide">#AI #DigitalTwin #Future</p>
                                                </div>

                                                {/* Progress Bar */}
                                                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                                                    <motion.div
                                                        className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                                                        style={{ width: `${progress}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default VideoCarousel;
