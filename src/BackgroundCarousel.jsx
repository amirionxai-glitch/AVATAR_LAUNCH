import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const BackgroundCarousel = () => {
    // Dynamic image loading
    const images = useMemo(() => {
        const glob = import.meta.glob('/public/assets/images/bg_carousel/*.{png,jpg,jpeg,webp}', { eager: true });
        return Object.values(glob).map((module) => module.default);
    }, []);

    // If no images, return null or a placeholder
    if (images.length === 0) return null;

    // Duplicate images to ensure seamless loop if count is low
    const marqueeImages = images.length < 5 ? [...images, ...images, ...images] : [...images, ...images];

    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex justify-center">
            {/* Removed dark overlay to keep videos fully visible */}

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 2 }}
                className="w-full max-w-[1400px] flex justify-between px-4 md:px-10 h-full items-center"
            >
                {/* Left Marquee */}
                <div className="h-[80vh] w-[25%] overflow-hidden relative opacity-60 blur-[1px] mask-image-gradient-b">
                    <motion.div
                        animate={{ y: ["0%", "-50%"] }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 30
                        }}
                        className="flex flex-col gap-6"
                    >
                        {marqueeImages.map((src, index) => (
                            <div
                                key={`left-${index}`}
                                className="w-full aspect-[9/16] rounded-xl overflow-hidden shadow-lg"
                            >
                                <img
                                    src={src}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Right Marquee (Reverse Scroll) */}
                <div className="h-[80vh] w-[25%] overflow-hidden relative opacity-60 blur-[1px] mask-image-gradient-b">
                    <motion.div
                        animate={{ y: ["-50%", "0%"] }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 35
                        }}
                        className="flex flex-col gap-6"
                    >
                        {marqueeImages.map((src, index) => (
                            <div
                                key={`right-${index}`}
                                className="w-full aspect-[9/16] rounded-xl overflow-hidden shadow-lg"
                            >
                                <img
                                    src={src}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default BackgroundCarousel;
