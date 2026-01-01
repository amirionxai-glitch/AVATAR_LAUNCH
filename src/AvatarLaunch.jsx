import React, { useState, useEffect, useRef } from 'react';
import {
    Cpu,

    Zap,
    ChevronRight,
    ChevronDown,
    Play,
    CheckCircle,
    Menu,
    X,
    TrendingUp,
    Globe,
    ArrowRight,
    Terminal,
    FileText
} from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import VideoCarousel from './VideoCarousel';
import BackgroundCarousel from './BackgroundCarousel';




const AvatarLaunch = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const [openFaq, setOpenFaq] = useState(null);
    const heroRef = useRef(null);





    // Initialize Lenis for smooth scrolling
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    // Handle scroll effects for navbar
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    // Removed opacity transform to keep videos fully visible
    // const opacity = useTransform(scrollYProgress, [0.3, 0.9], [1, 0]);

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden">

            {/* --- Ambient Background Glows --- */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen will-change-transform"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                    className="absolute bottom-[10%] right-[-5%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px] mix-blend-screen will-change-transform"
                />
            </div>

            {/* --- Navbar --- */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4"
            >
                <motion.div
                    initial={false}
                    animate={isScrolled ? "scrolled" : "top"}
                    variants={{
                        top: {
                            width: "100%",
                            maxWidth: "1280px", // Standard container width
                            paddingLeft: "1.5rem",
                            paddingRight: "1.5rem",
                            backgroundColor: "rgba(15, 23, 42, 0)",
                            borderColor: "rgba(255, 255, 255, 0)",
                            borderWidth: "1px",
                            borderRadius: "0px",
                            backdropFilter: "blur(0px)",
                            y: 16
                        },
                        scrolled: {
                            width: "90%",
                            maxWidth: "800px",
                            paddingLeft: "1.5rem",
                            paddingRight: "1.5rem",
                            backgroundColor: "rgba(15, 23, 42, 0.9)",
                            borderColor: "rgba(255, 255, 255, 0.1)",
                            borderWidth: "1px",
                            borderRadius: "9999px",
                            backdropFilter: "blur(12px)",
                            y: 0
                        }
                    }}
                    transition={{ type: "spring", stiffness: 120, damping: 20, mass: 1 }}
                    className="flex justify-between items-center shadow-lg"
                    style={{ borderStyle: 'solid' }} // Ensure border style is set for animation
                >
                    <div className="flex items-center gap-2 cursor-pointer group">
                        <motion.div
                            variants={{
                                top: { width: 40, height: 40, borderRadius: "0.75rem", rotate: 0 },
                                scrolled: { width: 32, height: 32, borderRadius: "50%", rotate: 0 }
                            }}
                            className="bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center"
                        >
                            <Cpu size={isScrolled ? 16 : 20} className="text-white" />
                        </motion.div>
                        <motion.span
                            variants={{
                                top: { fontSize: "1.25rem" },
                                scrolled: { fontSize: "1.125rem" }
                            }}
                            className="font-bold tracking-tight text-white"
                        >
                            Avatar<span className="text-blue-400">Launch</span>
                        </motion.span>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
                        {[
                            { name: 'Program', id: 'program' },
                            { name: 'Features', id: 'features' },
                            { name: 'Pricing', id: 'pricing' }
                        ].map((item) => (
                            <a
                                key={item.name}
                                href={`#${item.id}`}
                                className="hover:text-blue-400 transition-colors relative group py-2"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                {item.name}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <motion.button
                            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                            variants={{
                                top: { padding: "0.625rem 1.5rem", fontSize: "1rem" },
                                scrolled: { padding: "0.5rem 1.25rem", fontSize: "0.875rem" }
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="hidden lg:block bg-white text-slate-950 font-semibold hover:bg-blue-50 transition-colors rounded-full shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]"
                        >
                            Get Access
                        </motion.button>

                        {/* Mobile Menu Toggle */}
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-white z-50 p-2">
                            {mobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </motion.div>

                {/* Mobile Nav Dropdown */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="lg:hidden absolute top-20 left-4 right-4 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col gap-4 shadow-2xl origin-top"
                        >
                            {[
                                { name: 'Program', id: 'program' },
                                { name: 'Features', id: 'features' },
                                { name: 'Pricing', id: 'pricing' }
                            ].map((item) => (
                                <a
                                    key={item.name}
                                    href={`#${item.id}`}
                                    className="text-lg text-slate-300 py-2 border-b border-white/5 last:border-0"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setMobileMenuOpen(false);
                                        document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                >
                                    {item.name}
                                </a>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* --- Hero Section --- */}
            <section ref={heroRef} className="relative pt-32 pb-40 md:pt-48 md:pb-60 px-6 min-h-screen flex flex-col justify-center overflow-hidden">
                {/* Background Carousel */}
                <BackgroundCarousel />

                <motion.div className="container mx-auto max-w-5xl text-center z-10 relative">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 100, damping: 20 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-8"
                    >
                        <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                        Join the AI Revolution
                    </motion.div>

                    <h1 className="text-4xl md:text-7xl font-bold tracking-tight leading-tight mb-6">
                        <motion.span
                            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="block bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-400"
                        >
                            THE FUTURE HAS A FACE
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="text-blue-500 inline-block relative mt-2"
                        >
                            BUILT BY AI
                            <motion.svg
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
                                className="absolute -bottom-2 left-0 w-full"
                                viewBox="0 0 100 10"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M0 5 Q 50 10 100 5" stroke="#3b82f6" strokeWidth="2" />
                            </motion.svg>
                        </motion.span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        The premier ecosystem for building, launching, and monetizing hyper-realistic AI influencers.
                        Stop watching the future happen—create it.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <button
                            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group w-full sm:w-auto px-6 py-3.5 md:px-8 md:py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-base md:text-lg transition-all shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
                        >
                            Launch Your Avatar <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform md:w-5 md:h-5" />
                        </button>
                        <button
                            onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group w-full sm:w-auto px-6 py-3.5 md:px-8 md:py-4 bg-slate-900 border border-slate-700 hover:border-slate-500 text-white rounded-xl font-semibold text-base md:text-lg transition-all flex items-center justify-center gap-2 hover:bg-slate-800"
                        >
                            <Play size={16} fill="currentColor" className="group-hover:text-blue-400 transition-colors md:w-[18px] md:h-[18px]" /> Watch Demo
                        </button>
                    </motion.div>

                    {/* Video Carousel */}
                    <motion.div
                        id="demo"
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 1, ease: "easeOut" }}
                        className="mt-16"
                    >
                        <VideoCarousel />
                    </motion.div>
                </motion.div>
            </section>

            {/* --- Process Pipeline (Ecosystem) --- */}
            <section id="features" className="py-24 bg-slate-900/50 relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Complete Avatar Ecosystem</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">From DNA to Empire. A seamless pipeline for identity creation.</p>
                    </motion.div>

                    <div className="relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 -translate-y-1/2"></div>

                        <div className="grid md:grid-cols-3 gap-12 relative z-10">
                            {[
                                {
                                    icon: <Cpu className="w-8 h-8 text-white" />,
                                    step: "01",
                                    title: "Avatar DNA",
                                    desc: "Define your digital genetic code. Consistent facial geometry, voice synthesis, and distinct personality traits.",
                                    color: "blue"
                                },
                                {
                                    icon: <TrendingUp className="w-8 h-8 text-white" />,
                                    step: "02",
                                    title: "Viral Growth",
                                    desc: "Deploy content that exploits algorithm biases. Automated workflows for omnipresent social reach.",
                                    color: "indigo"
                                },
                                {
                                    icon: <Globe className="w-8 h-8 text-white" />,
                                    step: "03",
                                    title: "Monetization",
                                    desc: "Convert attention into capital. Brand deals, merchandise, and digital assets scaling infinitely.",
                                    color: "cyan"
                                }
                            ].map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2, duration: 0.6 }}
                                    className="relative group"
                                >
                                    {/* Card */}
                                    <div className="bg-slate-950 border border-white/10 rounded-2xl p-6 md:p-8 relative z-10 hover:border-blue-500/50 transition-all duration-300 h-full flex flex-col items-center text-center">
                                        <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-${feature.color}-600 to-${feature.color}-800 flex items-center justify-center mb-6 shadow-lg shadow-${feature.color}-900/20 group-hover:scale-110 transition-transform duration-300 ring-4 ring-slate-950`}>
                                            {feature.icon}
                                        </div>

                                        <div className="absolute top-4 right-4 text-xs font-bold font-mono text-slate-700 opacity-50">
                                            {feature.step}
                                        </div>

                                        <h3 className="text-xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">{feature.title}</h3>
                                        <p className="text-slate-400 text-sm leading-relaxed">
                                            {feature.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>



            {/* --- Prompt System Visualizer --- */}
            <section id="program" className="py-24 px-6 relative overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900 border-y border-white/5">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-900/50 to-transparent"></div>

                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-xl mb-6 ring-1 ring-blue-500/50 shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)]">
                            <Terminal size={24} className="text-blue-400" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 font-mono tracking-tight">
                            From Zero to Content in <span className="text-blue-500">60 Seconds</span>
                        </h2>
                        <p className="text-xl text-slate-400 font-light">For Any Niche, Any Avatar.</p>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Interactive Tree */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-slate-950 p-6 md:p-8 rounded-2xl border border-white/10 font-mono text-sm md:text-base shadow-2xl relative overflow-hidden group select-none"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
                                <FileText size={48} />
                            </div>

                            <div className="space-y-6 relative z-10">

                                {/* QUICK START */}
                                <div>
                                    <div className="flex items-center gap-2 text-blue-400 font-bold mb-2">
                                        <span>┌─</span> <span className="tracking-wider">QUICK START</span>
                                    </div>
                                    <div className="pl-4 border-l border-white/10 space-y-2 ml-[0.35rem]">
                                        {["Prompt 0: Avatar DNA Generator", "Prompt 1: 30-Day Calendar", "Prompt 7: Batch Workflow"].map((item, i, arr) => (
                                            <div key={i} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors cursor-pointer group/item">
                                                <span className="text-slate-600 group-hover/item:text-blue-500 transition-colors">{i === arr.length - 1 ? '└─' : '├─'}</span>
                                                <span className="group-hover/item:translate-x-1 transition-transform">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* IDEATION */}
                                <div>
                                    <div className="flex items-center gap-2 text-indigo-400 font-bold mb-2">
                                        <span>├─</span> <span className="tracking-wider">IDEATION</span>
                                    </div>
                                    <div className="pl-4 border-l border-white/10 space-y-2 ml-[0.35rem]">
                                        {["Prompt 2: Pain-to-Post", "Prompt 3: Competitor Intel", "Prompt 10: Viral Reverse-Engineer"].map((item, i, arr) => (
                                            <div key={i} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors cursor-pointer group/item">
                                                <span className="text-slate-600 group-hover/item:text-indigo-500 transition-colors">{i === arr.length - 1 ? '└─' : '├─'}</span>
                                                <span className="group-hover/item:translate-x-1 transition-transform">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* SCRIPTING */}
                                <div>
                                    <div className="flex items-center gap-2 text-purple-400 font-bold mb-2">
                                        <span>├─</span> <span className="tracking-wider">SCRIPTING</span>
                                    </div>
                                    <div className="pl-4 border-l border-white/10 space-y-2 ml-[0.35rem]">
                                        {["Reels (4A, 4B)", "Carousels (5A, 5B)", "Shorts (6A)"].map((item, i, arr) => (
                                            <div key={i} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors cursor-pointer group/item">
                                                <span className="text-slate-600 group-hover/item:text-purple-500 transition-colors">{i === arr.length - 1 ? '└─' : '├─'}</span>
                                                <span className="group-hover/item:translate-x-1 transition-transform">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* OPTIMIZATION */}
                                <div>
                                    <div className="flex items-center gap-2 text-cyan-400 font-bold mb-2">
                                        <span>└─</span> <span className="tracking-wider">OPTIMIZATION</span>
                                    </div>
                                    <div className="pl-4 space-y-2 ml-[0.35rem]">
                                        {["Prompt 8: Engagement Predictor", "Prompt 9: Content Autopsy"].map((item, i, arr) => (
                                            <div key={i} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors cursor-pointer group/item">
                                                <span className="text-slate-600 group-hover/item:text-cyan-500 transition-colors">{i === arr.length - 1 ? '└─' : '├─'}</span>
                                                <span className="group-hover/item:translate-x-1 transition-transform">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </motion.div>

                        {/* Description / Sell-in */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex flex-col justify-center h-full space-y-8"
                        >
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <h3 className="text-xl font-bold text-white mb-3">Systematized Creativity</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    Stop staring at a blank page. Our engineered prompt architectures handle the structure, so you can focus on the soul of the content.
                                </p>
                            </div>

                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <h3 className="text-xl font-bold text-white mb-3">30 Days of Content in 1 Hour</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    The "Batch Workflow" node isn't just a prompt; it's a production pipeline. Generate cohesive, platform-specific scripts for an entire month in a single session.
                                </p>
                            </div>

                            <button
                                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                                className="w-full py-3.5 md:py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-base md:text-lg transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 group"
                            >
                                Access Now <ArrowRight className="group-hover:translate-x-1 transition-transform w-5 h-5" />
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- Comparison Section --- */}
            <section className="py-24 bg-slate-950 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="container mx-auto px-6 max-w-5xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <span className="text-blue-400 font-bold tracking-wider text-sm uppercase mb-4 block">• The Strategic Advantage</span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Why Digital Twins Win <br />
                            <span className="text-slate-500">Every Single Time</span>
                        </h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            The gap between traditional creators and AI-native brands is widening.
                            Choose which side of history you want to be on.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-px bg-white/10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                        {/* Left - The Old Way */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="p-6 md:p-10 bg-slate-900/80 backdrop-blur-sm"
                        >
                            <h3 className="text-xl font-bold text-white mb-2">Manual Content Creation</h3>
                            <p className="text-slate-500 text-sm mb-8">The bottleneck is you.</p>
                            <ul className="space-y-6">
                                {[
                                    "Limited by physical energy & burnout",
                                    "Inconsistent posting schedule",
                                    "Expensive gear & studio costs",
                                    "Restricted to one location",
                                    "Hours lost to retakes & editing"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-400">
                                        <div className="mt-1 w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                                            <X size={12} className="text-red-500" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Right - The New Way */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="p-6 md:p-10 bg-slate-900 relative"
                        >
                            <div className="absolute inset-0 bg-blue-600/5 pointer-events-none"></div>
                            {/* Green accent line for 'success' feeling matching the reference, but keeping blue theme consistency */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-green-400"></div>

                            <h3 className="text-xl font-bold text-white mb-2">The Avatar Ecosystem</h3>
                            <p className="text-blue-400 text-sm mb-8">Scale infinitely. Zero burnout.</p>
                            <ul className="space-y-6 relative z-10">
                                {[
                                    "24/7 Content Generation while you sleep",
                                    "Perfect consistency & branding",
                                    "Zero marginal cost per video",
                                    "Omnipresent digital footprint",
                                    "Focus on strategy, not filming"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-white font-medium">
                                        <div className="mt-1 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                            <CheckCircle size={12} className="text-green-400" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>


            {/* --- CTA / Footer Section --- */}
            <section id="pricing" className="py-24 px-6 relative overflow-hidden bg-slate-950">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="container mx-auto max-w-4xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">Unlock your potential.</h2>
                        <p className="text-slate-400 text-lg">Straightforward pricing - start your journey today.</p>
                    </motion.div>

                    {/* Pricing Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-slate-900/80 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-8 md:p-12 max-w-xl mx-auto shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)] relative overflow-hidden group hover:border-blue-400/60 hover:shadow-[0_0_60px_-10px_rgba(59,130,246,0.5)] transition-all duration-500"
                    >
                        {/* Badge */}
                        <div className="absolute top-0 right-0 bg-gradient-to-bl from-blue-600 to-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-bl-xl uppercase tracking-wider shadow-lg">
                            Exclusive Launch
                        </div>

                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-white mb-2">Full Access</h3>
                            <div className="flex items-baseline gap-3">
                                <span className="text-5xl font-bold text-white">$129</span>
                                <span className="text-slate-500 font-medium">/ month</span>
                            </div>
                            <p className="text-slate-400 mt-4 leading-relaxed">
                                Full access to the Avatar Launch curriculum, community, and all future updates.
                            </p>
                        </div>

                        <div className="mb-8">
                            <a href="https://whop.com/checkout/plan_Rg2fhMgehE8Ov" className="block w-full">
                                <motion.button
                                    whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(37, 99, 235, 0.5)" }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-[length:200%_100%] hover:bg-[100%_0] text-white rounded-xl font-bold text-lg transition-all duration-500 shadow-xl shadow-blue-600/20"
                                >
                                    Get Instant Access
                                </motion.button>
                            </a>
                        </div>

                        <div className="space-y-4 pt-8 border-t border-white/10">
                            {[
                                "Full access to the Avatar creation system",
                                "Interactive, AI-powered lessons & workflows",
                                "Consistent AI avatar creation & animation systems",
                                "Short-form content, editing & voice workflows",
                                "AI website builder + monetization setup",
                                "Private Avatar Launch community access"
                            ].map((feature, i) => (
                                <div key={i} className="flex items-start gap-3 text-slate-300">
                                    <CheckCircle size={18} className="text-blue-400 flex-shrink-0 mt-1" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- FAQ Section --- */}
            <section className="py-24 bg-slate-900/30 border-y border-white/5">
                <div className="container mx-auto px-6 max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                    </motion.div>

                    <div className="space-y-4">
                        {[
                            {
                                q: "Will this work for my specific niche?",
                                a: "Yes. The 'Avatar DNA' system is designed to adapt to any industry—from fitness and finance to gaming and storytelling. You define the persona; we provide the engine."
                            },
                            {
                                q: "How much time do I need to invest?",
                                a: "The initial setup takes a weekend. Once your systems are online, the 'Batch Workflow' allows you to generate a month's worth of high-quality content in just 60 minutes."
                            },
                            {
                                q: "Can I do this without showing my real face?",
                                a: "100%. That's the power of Digital Twins. You can create a hyper-realistic version of yourself, or build a completely synthetic character. You maintain total privacy while building a public brand."
                            },
                            {
                                q: "What kind of results can I expect?",
                                a: "Our students typically see 10x engagement growth within the first 30 days by leveraging the 'Viral Reverse-Engineer' prompts. Consistency is the key, and our AI ensures you never miss a post."
                            }
                        ].map((faq, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={`bg-slate-950 border rounded-xl overflow-hidden transition-all duration-300 ${openFaq === i ? 'border-blue-500/50 shadow-[0_0_20px_-5px_rgba(59,130,246,0.2)]' : 'border-white/5 hover:border-white/10'}`}
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full p-6 flex items-center justify-between text-left group"
                                >
                                    <h3 className="font-bold text-white flex items-center gap-2">
                                        <span className="text-blue-500">Q.</span> {faq.q}
                                    </h3>
                                    <motion.div
                                        animate={{ rotate: openFaq === i ? 180 : 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className={`flex-shrink-0 ml-4 ${openFaq === i ? 'text-blue-400' : 'text-slate-500'}`}
                                    >
                                        <ChevronDown size={20} />
                                    </motion.div>
                                </button>

                                <AnimatePresence>
                                    {openFaq === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <div className="px-6 pb-6 pt-0">
                                                <p className="text-slate-400 pl-6 border-l-2 border-slate-800 ml-1 leading-relaxed">
                                                    {faq.a}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Simple Footer --- */}
            <footer className="py-8 bg-slate-950 border-t border-white/5 text-center text-slate-600 text-sm">
                <p>&copy; {new Date().getFullYear()} Avatar Launch. All rights reserved.</p>
                <div className="flex justify-center gap-6 mt-4 text-xs font-medium text-slate-500">
                    <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-blue-400 transition-colors">Support</a>
                </div>
                <p className="mt-4 opacity-50">Designed by AI. Built for Creators.</p>
            </footer>
        </div>
    );
};

export default AvatarLaunch;
