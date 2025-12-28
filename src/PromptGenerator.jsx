import React, { useState } from 'react';
import { Upload, Copy, Check, ArrowLeft, RefreshCw, Smartphone, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PromptGenerator = ({ onNavigate }) => {
    const [avatarImage, setAvatarImage] = useState(null);
    const [sceneImage, setSceneImage] = useState(null);
    const [formData, setFormData] = useState({
        facialFeatures: '',
        clothing: '',
        accessories: '',
        sceneVibe: '',
        sceneElements: '',
        lighting: 'Cinematic'
    });
    const [generatedJson, setGeneratedJson] = useState(null);
    const [copied, setCopied] = useState(false);

    const handleImageUpload = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (type === 'avatar') setAvatarImage(reader.result);
                else setSceneImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const generateJSON = () => {
        // "JSON Architect" Logic

        // 1. Construct the Primary Prompt (The Synthesis)
        // Logic: Merge Avatar (visuals) into Scene (setting/lighting)
        const avatarPart = `A photorealistic portrait of a character with ${formData.facialFeatures || "distinct features"}, wearing ${formData.clothing || "casual attire"} and ${formData.accessories || "minimal accessories"}`;
        const scenePart = `situated in a ${formData.sceneVibe || "neutral"} environment featuring ${formData.sceneElements || "background elements"}`;
        const lightingPart = `Lighting is ${formData.lighting}, casting a cohesive mood over both the character and the setting, ensuring seamless integration.`;

        const primaryPrompt = `${avatarPart}. They are ${scenePart}. ${lightingPart}`;

        // 2. Construct the Title (Creative 3-word name)
        const tone = formData.sceneVibe ? formData.sceneVibe.split(' ')[0] : "Modern";
        const subject = formData.facialFeatures ? "Character" : "Portrait";
        const title = `${tone.charAt(0).toUpperCase() + tone.slice(1)} ${subject} Synthesis`;

        // 3. Construct the JSON Schema
        const architectTemplate = {
            title: title,
            primary_prompt: primaryPrompt,
            negative_prompt: "AI-skin, plastic textures, uncanny valley, cartoon, drawing, illustration, low quality, blur, pixelated, extra limbs, distorted face",
            params: {
                cfg: 7,
                sampler: "DPM++ 2M Karras"
            }
        };

        setGeneratedJson(JSON.stringify(architectTemplate, null, 2));
    };

    const copyToClipboard = () => {
        if (!generatedJson) return;
        navigator.clipboard.writeText(generatedJson);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-500 selection:text-white pb-20">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5 px-6 py-4">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => onNavigate('home')}
                            className="p-2 hover:bg-white/5 rounded-full transition-colors group"
                        >
                            <ArrowLeft className="text-slate-400 group-hover:text-white" size={20} />
                        </button>
                        <h1 className="text-xl font-bold tracking-tight">
                            Prompt<span className="text-blue-400">Gen</span>
                            <span className="ml-3 text-xs font-normal text-slate-500 border border-slate-800 px-2 py-0.5 rounded-full">JSON Template Mode</span>
                        </h1>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-10 max-w-6xl">
                <div className="grid lg:grid-cols-2 gap-12">

                    {/* Left Column: Inputs */}
                    <div className="space-y-8">

                        {/* Image Upload Zones */}
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: "Avatar Reference", state: avatarImage, setter: setAvatarImage, id: "avatar-upload", type: 'avatar' },
                                { label: "Scene Reference", state: sceneImage, setter: setSceneImage, id: "scene-upload", type: 'scene' }
                            ].map((zone) => (
                                <div key={zone.id} className="relative group">
                                    <input
                                        type="file"
                                        id={zone.id}
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => handleImageUpload(e, zone.type)}
                                    />
                                    <label
                                        htmlFor={zone.id}
                                        className={`flex flex-col items-center justify-center w-full h-48 rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden ${zone.state ? 'border-blue-500/50 bg-slate-900' : 'border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-slate-700'}`}
                                    >
                                        {zone.state ? (
                                            <>
                                                <img src={zone.state} alt="Preview" className="w-full h-full object-cover opacity-50 group-hover:opacity-30 transition-opacity" />
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <RefreshCw className="text-white drop-shadow-lg" />
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="text-slate-500 mb-2 group-hover:text-blue-400 transition-colors" />
                                                <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">{zone.label}</span>
                                            </>
                                        )}
                                    </label>
                                </div>
                            ))}
                        </div>

                        {/* Customization Details */}
                        <div className="space-y-6">
                            <div className="p-6 bg-slate-900/50 border border-white/5 rounded-2xl">
                                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                                    Avatar Details
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-slate-400 text-xs uppercase font-bold mb-2">Facial Features</label>
                                        <input
                                            name="facialFeatures"
                                            value={formData.facialFeatures}
                                            onChange={handleInputChange}
                                            placeholder="e.g. Sharp jawline, cybernetic eye, scar on left cheek"
                                            className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-slate-400 text-xs uppercase font-bold mb-2">Clothing</label>
                                            <input
                                                name="clothing"
                                                value={formData.clothing}
                                                onChange={handleInputChange}
                                                placeholder="e.g. Leather jacket"
                                                className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-slate-400 text-xs uppercase font-bold mb-2">Accessories</label>
                                            <input
                                                name="accessories"
                                                value={formData.accessories}
                                                onChange={handleInputChange}
                                                placeholder="e.g. Gold chain"
                                                className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-slate-900/50 border border-white/5 rounded-2xl">
                                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <span className="w-1 h-6 bg-indigo-500 rounded-full"></span>
                                    Scene Details
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-slate-400 text-xs uppercase font-bold mb-2">Vibe / Location</label>
                                        <input
                                            name="sceneVibe"
                                            value={formData.sceneVibe}
                                            onChange={handleInputChange}
                                            placeholder="e.g. Neon-lit tokyo alleyway during rain"
                                            className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-colors"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-slate-400 text-xs uppercase font-bold mb-2">Key Elements</label>
                                            <input
                                                name="sceneElements"
                                                value={formData.sceneElements}
                                                onChange={handleInputChange}
                                                placeholder="e.g. Holograms, smoke"
                                                className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-slate-400 text-xs uppercase font-bold mb-2">Lighting</label>
                                            <select
                                                name="lighting"
                                                value={formData.lighting}
                                                onChange={handleInputChange}
                                                className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-colors appearance-none"
                                            >
                                                <option>Cinematic</option>
                                                <option>Natural</option>
                                                <option>Studio</option>
                                                <option>Cyberpunk (Neon)</option>
                                                <option>Golden Hour</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={generateJSON}
                            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-blue-900/20 active:scale-95 transition-all text-lg"
                        >
                            Generate JSON Template
                        </button>

                    </div>

                    {/* Right Column: Output */}
                    <div className="relative">
                        <div className="sticky top-28">
                            <div className="bg-[#0d1117] rounded-2xl border border-white/10 shadow-2xl overflow-hidden min-h-[500px] flex flex-col">
                                <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/20 text-red-500" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 text-yellow-500" />
                                        <div className="w-3 h-3 rounded-full bg-green-500/20 text-green-500" />
                                    </div>
                                    <span className="text-xs font-mono text-slate-500">output.json</span>
                                    <button
                                        onClick={copyToClipboard}
                                        disabled={!generatedJson}
                                        className={`p-1.5 rounded-lg transition-all ${copied ? 'bg-green-500/20 text-green-400' : 'hover:bg-white/10 text-slate-400'}`}
                                    >
                                        {copied ? <Check size={16} /> : <Copy size={16} />}
                                    </button>
                                </div>
                                <div className="p-4 overflow-auto custom-scrollbar flex-1">
                                    {generatedJson ? (
                                        <pre className="text-sm font-mono text-blue-300 leading-relaxed whitespace-pre-wrap">
                                            {generatedJson}
                                        </pre>
                                    ) : (
                                        <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-4">
                                            <Monitor size={48} className="opacity-20" />
                                            <p className="text-sm">Upload images and fill details to generate template.</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Device Preview Hints (Visual Polish) */}
                            <div className="mt-8 grid grid-cols-2 gap-4 opacity-50 pointer-events-none">
                                <div className="text-center">
                                    <div className="mx-auto w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-2">
                                        <Smartphone size={20} className="text-slate-400" />
                                    </div>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">Mobile Ready</p>
                                </div>
                                <div className="text-center">
                                    <div className="mx-auto w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-2">
                                        <Monitor size={20} className="text-slate-400" />
                                    </div>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">Desktop Optimized</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default PromptGenerator;
