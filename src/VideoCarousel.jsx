import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

const videos = [
    { id: 1, src: '/assets/videos/avatar1.mp4', title: 'Avatar 1' },
    { id: 2, src: '/assets/videos/avatar2.mp4', title: 'Avatar 2' },
    { id: 3, src: '/assets/videos/avatar3.mp4', title: 'Avatar 3' },
];

const VideoCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(1); // Start with the middle video
    const [isPlaying, setIsPlaying] = useState(true);
    const videoRefs = useRef([]);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % videos.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
    };

    useEffect(() => {
        // Pause all videos except the current one
        videoRefs.current.forEach((video, index) => {
            if (video) {
                if (index === currentIndex && isPlaying) {
                    video.play().catch(() => { }); // Ignore auto-play errors
                } else {
                    video.pause();
                    video.currentTime = 0; // Reset non-active videos
                }
            }
        });
    }, [currentIndex, isPlaying]);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
        const currentVideo = videoRefs.current[currentIndex];
        if (currentVideo) {
            if (isPlaying) {
                currentVideo.pause();
            } else {
                currentVideo.play();
            }
        }
    };

    return (
        <div className="relative w-full max-w-5xl mx-auto h-[600px] flex items-center justify-center perspective-1000">
            {/* Navigation Buttons */}
            <button
                onClick={handlePrev}
                className="absolute left-4 md:left-10 z-30 p-4 rounded-full bg-blue-600/80 backdrop-blur-md border border-white/20 text-white hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all duration-300 transform hover:scale-110"
            >
                <ChevronLeft size={32} />
            </button>

            <button
                onClick={handleNext}
                className="absolute right-4 md:right-10 z-30 p-4 rounded-full bg-blue-600/80 backdrop-blur-md border border-white/20 text-white hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all duration-300 transform hover:scale-110"
            >
                <ChevronRight size={32} />
            </button>

            {/* Carousel Items */}
            <div className="relative w-full h-full flex items-center justify-center">
                {videos.map((video, index) => {
                    // Calculate position relative to current index
                    let position = (index - currentIndex + videos.length) % videos.length;
                    // Adjust for negative wrapping to keep items centered
                    if (position > 1) position -= videos.length;

                    const isActive = position === 0;
                    const isLeft = position === -1;
                    const isRight = position === 1;

                    // Define variants for animation
                    const variants = {
                        center: {
                            x: 0,
                            scale: 1,
                            zIndex: 20,
                            opacity: 1,
                            rotateY: 0,
                            // filter: "brightness(1)" // Removed to prevent sharpening artifacts
                        },
                        left: {
                            x: "-60%",
                            scale: 0.8,
                            zIndex: 10,
                            opacity: 0.6,
                            rotateY: 25,
                            filter: "brightness(0.5)"
                        },
                        right: {
                            x: "60%",
                            scale: 0.8,
                            zIndex: 10,
                            opacity: 0.6,
                            rotateY: -25,
                            filter: "brightness(0.5)"
                        },
                        hidden: {
                            x: 0,
                            scale: 0,
                            zIndex: 0,
                            opacity: 0
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
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            className="absolute w-[280px] md:w-[320px] aspect-[9/16] rounded-2xl overflow-hidden border-4 border-slate-800 shadow-2xl bg-slate-900"
                            style={{
                                transformStyle: "preserve-3d",
                            }}
                        >
                            <div className="relative w-full h-full group">
                                <video
                                    ref={(el) => (videoRefs.current[index] = el)}
                                    src={video.src}
                                    className="w-full h-full object-cover"
                                    loop
                                    muted={!isActive} // Mute non-active videos
                                    playsInline
                                />

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/80 pointer-events-none" />

                                {/* Play/Pause Button Overlay (Only for active) */}
                                {isActive && (
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <button
                                            onClick={togglePlay}
                                            className="p-4 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-blue-600 hover:scale-110 transition-all"
                                        >
                                            {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" />}
                                        </button>
                                    </div>
                                )}

                                {/* Video Info */}
                                <div className="absolute bottom-0 left-0 w-full p-6">
                                    <h3 className="text-xl font-bold text-white mb-1">{video.title}</h3>
                                    <p className="text-sm text-blue-400 font-medium">AI Generated</p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default VideoCarousel;
