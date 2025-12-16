import React, { useState, useEffect, useRef } from 'react';
import {
    Cpu,
    Users,
    Zap,
    ChevronRight,
    Play,
    CheckCircle,
    Menu,
    X,
    TrendingUp,
    Globe,
    ArrowRight
} from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import VideoCarousel from './VideoCarousel';
import BackgroundCarousel from './BackgroundCarousel';
import { generateImage } from './services/api';



const AvatarLaunch = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [prompt, setPrompt] = useState("Generate a 4k photorealistic image of a futuristic avatar in a cyberpunk street...");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImage, setGeneratedImage] = useState(null);
    const heroRef = useRef(null);

    const handleGenerate = async () => {
        if (!prompt) return;
        setIsGenerating(true);
        try {
            const base64Image = await generateImage(prompt);
            setGeneratedImage(`data:image/png;base64,${base64Image}`);
        } catch (error) {
            console.error("Generation failed:", error);
            alert(`Failed to generate image: ${error.message}`);
        } finally {
            setIsGenerating(false);
        }
    };

    // ... (rest of the component)

    // In the "Context/Education Section" (around line 340 in original file):
    <div className="relative bg-slate-900 border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-700 animate-pulse"></div>
                <div>
                    <div className="h-2 w-24 bg-slate-700 rounded mb-1"></div>
                    <div className="h-2 w-16 bg-slate-800 rounded"></div>
                </div>
            </div>
            <div className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> Active Now
            </div>
        </div>
        <div className="space-y-4">
            <div className="p-4 bg-slate-800/50 rounded-lg border border-white/5">
                <p className="text-slate-400 text-sm mb-2">Prompt Input</p>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full bg-transparent text-white text-sm focus:outline-none resize-none h-16"
                />
            </div>
            <div className="flex justify-center">
                <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className={`p-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white transition-all ${isGenerating ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110 active:scale-95'}`}
                >
                    <Zap className={`w-6 h-6 ${isGenerating ? 'animate-spin' : ''}`} fill="currentColor" />
                </button>
            </div>
            <div className="h-64 bg-slate-800 rounded-lg w-full flex items-center justify-center border border-white/5 overflow-hidden relative group">
                {generatedImage ? (
                    <img src={generatedImage} alt="Generated Avatar" className="w-full h-full object-cover" />
                ) : (
                    <>
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover:opacity-100 transition-opacity"></div>
                        <span className="text-slate-500 text-sm relative z-10">
                            {isGenerating ? "Generating..." : "Rendering Stunning Visuals..."}
                        </span>
                    </>
                )}
            </div>
        </div>
    </div>

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
                    className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen"
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
                    className="absolute bottom-[10%] right-[-5%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px] mix-blend-screen"
                />
            </div>

            {/* --- Navbar --- */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}
            >
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center gap-2 cursor-pointer group">
                        <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                            <Cpu size={18} className="text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">
                            Avatar<span className="text-blue-400">Launch</span>
                        </span>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
                        {['The Program', 'Features'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="hover:text-blue-400 transition-colors relative group">
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        ))}
                        <button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white text-slate-950 px-5 py-2 rounded-full font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]">
                            Get Access
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white z-50 relative">
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Mobile Nav Dropdown */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="md:hidden absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-4 shadow-2xl"
                        >
                            {['The Program', 'Features'].map((item) => (
                                <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-lg text-slate-300" onClick={() => setMobileMenuOpen(false)}>
                                    {item}
                                </a>
                            ))}
                            <button onClick={() => { setMobileMenuOpen(false); document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }); }} className="w-full bg-blue-600 py-3 rounded-lg font-bold mt-2 text-white">Get Access</button>
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
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-8"
                    >
                        <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                        Join the AI Revolution
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                        className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-400"
                    >
                        THE FUTURE HAS A FACE <br />
                        <span className="text-blue-500 inline-block relative">
                            BUILT BY AI
                            <motion.svg
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
                                className="absolute -bottom-2 left-0 w-full"
                                viewBox="0 0 100 10"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M0 5 Q 50 10 100 5" stroke="#3b82f6" strokeWidth="2" />
                            </motion.svg>
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        The premier ecosystem for building, launching, and monetizing hyper-realistic AI influencers.
                        Stop watching the future happen—create it.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <button
                            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg transition-all shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
                        >
                            Launch Your Avatar <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="group w-full sm:w-auto px-8 py-4 bg-slate-900 border border-slate-700 hover:border-slate-500 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 hover:bg-slate-800">
                            <Play size={18} fill="currentColor" className="group-hover:text-blue-400 transition-colors" /> Watch Demo
                        </button>
                    </motion.div>

                    {/* Video Carousel */}
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 1, ease: "easeOut" }}
                        className="mt-16"
                    >
                        <VideoCarousel />
                    </motion.div>
                </motion.div>
            </section>

            {/* --- Value Proposition / "How it Works" --- */}
            <section id="features" className="py-24 bg-slate-900/50 relative">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Complete Avatar Ecosystem</h2>
                        <p className="text-slate-400">Everything you need to go from zero to monetized digital identity.</p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Cpu className="text-blue-400" />,
                                title: "Creation Suite",
                                desc: "Master the tech stack. Learn to generate consistent faces, realistic video, and voice cloning that makes your avatar indistinguishable from reality.",
                                color: "blue"
                            },
                            {
                                icon: <Users className="text-indigo-400" />,
                                title: "Viral Growth",
                                desc: "Social algorithms favor the new. We teach you the content strategies specifically designed for AI influencers to hit 100k+ followers rapidly.",
                                color: "indigo"
                            },
                            {
                                icon: <TrendingUp className="text-cyan-400" />,
                                title: "Monetization",
                                desc: "Turn attention into income. Brand deals, digital products, and exclusive content. We provide the blueprint to 6-figure avatar businesses.",
                                color: "cyan"
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2, duration: 0.6 }}
                                whileHover={{ y: -10 }}
                                className="group p-8 rounded-2xl bg-slate-950 border border-white/5 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/10"
                            >
                                <div className={`w-12 h-12 bg-${feature.color}-900/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    {feature.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Context/Education Section (Reference to "Context Engineering") --- */}
            <section id="program" className="py-24 px-6 relative overflow-hidden">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="md:w-1/2"
                        >
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                                Stop Guessing. <br />
                                <span className="text-blue-500">Start Engineering.</span>
                            </h2>
                            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                                Most people use AI like a slot machine. We teach you to use it like a precision instrument.
                                Avatar Launch isn't just a course; it's a dynamic program that evolves with the technology.
                            </p>

                            <ul className="space-y-4">
                                {[
                                    "Consistent Character Consistency (Face & Body)",
                                    "Voice Cloning & Lip-Sync Technology",
                                    "Automated Social Media Management",
                                    "Brand Deal Negotiation Templates"
                                ].map((item, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 + (index * 0.1), duration: 0.5 }}
                                        className="flex items-center gap-3 text-slate-300"
                                    >
                                        <CheckCircle className="text-blue-500 w-5 h-5 flex-shrink-0" />
                                        {item}
                                    </motion.li>
                                ))}
                            </ul>

                            <div className="mt-10">
                                <button className="text-blue-400 font-semibold flex items-center gap-2 group hover:text-blue-300 transition-colors">
                                    Explore the Curriculum <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                                </button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="md:w-1/2 relative"
                        >
                            <div className="absolute inset-0 bg-blue-600 blur-[100px] opacity-20 animate-pulse"></div>
                            <div className="relative bg-slate-900 border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-700 animate-pulse"></div>
                                        <div>
                                            <div className="h-2 w-24 bg-slate-700 rounded mb-1"></div>
                                            <div className="h-2 w-16 bg-slate-800 rounded"></div>
                                        </div>
                                    </div>
                                    <div className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> Active Now
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="p-4 bg-slate-800/50 rounded-lg border border-white/5">
                                        <p className="text-slate-400 text-sm mb-2">Prompt Input</p>
                                        <textarea
                                            value={prompt}
                                            onChange={(e) => setPrompt(e.target.value)}
                                            className="w-full bg-transparent text-white text-sm focus:outline-none resize-none h-16"
                                        />
                                    </div>
                                    <div className="flex justify-center">
                                        <button
                                            onClick={handleGenerate}
                                            disabled={isGenerating}
                                            className={`p-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white transition-all ${isGenerating ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110 active:scale-95'}`}
                                        >
                                            <Zap className={`w-6 h-6 ${isGenerating ? 'animate-spin' : ''}`} fill="currentColor" />
                                        </button>
                                    </div>
                                    <div className="h-64 bg-slate-800 rounded-lg w-full flex items-center justify-center border border-white/5 overflow-hidden relative group">
                                        {generatedImage ? (
                                            <img src={generatedImage} alt="Generated Avatar" className="w-full h-full object-cover" />
                                        ) : (
                                            <>
                                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover:opacity-100 transition-opacity"></div>
                                                <span className="text-slate-500 text-sm relative z-10">
                                                    {isGenerating ? "Generating..." : "Rendering Stunning Visuals..."}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
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
                            className="p-10 bg-slate-900/80 backdrop-blur-sm"
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
                            className="p-10 bg-slate-900 relative"
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
                        className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 max-w-xl mx-auto shadow-2xl relative overflow-hidden group hover:border-blue-500/30 transition-colors duration-500"
                    >
                        {/* Badge */}
                        <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-bl-xl uppercase tracking-wider shadow-lg">
                            Exclusive
                        </div>

                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-white mb-2">Full Access</h3>
                            <div className="flex items-baseline gap-3">
                                <span className="text-xl text-slate-500 line-through decoration-slate-500/50">$129/month</span>
                                <span className="text-5xl font-bold text-white">$65</span>
                                <span className="text-slate-500 font-medium">/ month</span>
                            </div>
                            <p className="text-slate-400 mt-4 leading-relaxed">
                                Full access to the Avatar Launch curriculum, community, and all future updates.
                            </p>
                        </div>

                        <div className="mb-8">
                            <a href="https://whop.com/checkout/plan_Rg2fhMgehE8Ov" className="block w-full">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-600/25"
                                >
                                    Get Access Now
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

            {/* --- Simple Footer --- */}
            <footer className="py-8 bg-slate-950 border-t border-white/5 text-center text-slate-600 text-sm">
                <p>&copy; {new Date().getFullYear()} Avatar Launch. All rights reserved.</p>
                <p className="mt-2">Designed by AI. Built for Creators.</p>
            </footer>
        </div>
    );
};

export default AvatarLaunch;
