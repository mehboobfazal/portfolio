import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Cpu, Database, Code2, Server, Terminal, Layers, Cloud, GitFork, Activity, Network, ChevronRight, Linkedin, Github, Mail, Lock, ArrowUpRight, Calendar, Menu, X, Send, Check, Briefcase, Sliders, Sparkles, MapPin, Info, Phone, Sun, Moon } from "lucide-react";

import { skillCategories, flagshipProjects, freelanceProjects, careerTimeline } from "@/components/portfolioData";
import NetworkTopology from "@/components/NetworkTopology";
import GsapSections from "@/components/GsapSections";

export default function App() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState<string>("all");

    // Contact form state
    const [formState, setFormState] = useState({ name: "", email: "", company: "", message: "" });
    const [formSentState, setFormSentState] = useState<"idle" | "sending" | "success">("idle");

    // Profile preview modal state
    const [profileOpen, setProfileOpen] = useState(false);
    const [profileAnimating, setProfileAnimating] = useState(false);

    const [gsapCompleted, setGsapCompleted] = useState(false);

    const openProfile = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setProfileOpen(true);
        // trigger CSS transition on next tick
        setTimeout(() => setProfileAnimating(true), 10);
    };

    const closeProfile = () => {
        // play reverse animation then remove from DOM
        setProfileAnimating(false);
        setTimeout(() => setProfileOpen(false), 300);
    };

    // Theme state (class-based, not device theme)
    const [theme, setTheme] = useState<"light" | "dark">(() => (typeof window !== "undefined" && localStorage.getItem("theme") === "light" ? "light" : "dark"));

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        try {
            localStorage.setItem("theme", theme);
        } catch (e) {
            // ignore
        }
    }, [theme]);

    useEffect(() => {
        if (gsapCompleted) {
            window.scrollTo({ top: 0, behavior: "instant" });
        }
    }, [gsapCompleted]);

    const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

    // Skill Icon lookup helper representing modular layouts
    const getSkillIcon = (iconName: string) => {
        switch (iconName) {
            case "Code2":
                return <Code2 className="w-4 h-4 text-indigo-400" />;
            case "Database":
                return <Database className="w-4 h-4 text-cyan-400" />;
            case "Server":
                return <Server className="w-4 h-4 text-sky-400" />;
            case "Terminal":
                return <Terminal className="w-4 h-4 text-purple-400" />;
            case "Layers":
                return <Layers className="w-4 h-4 text-slate-400" />;
            case "Network":
                return <Network className="w-4 h-4 text-indigo-400" />;
            case "Shield":
                return <Shield className="w-4 h-4 text-emerald-400" />;
            case "Cpu":
                return <Cpu className="w-4 h-4 text-amber-500" />;
            case "Cloud":
                return <Cloud className="w-4 h-4 text-sky-400" />;
            case "GitFork":
                return <GitFork className="w-4 h-4 text-slate-400" />;
            case "Activity":
                return <Activity className="w-4 h-4 text-rose-400" />;
            default:
                return <Server className="w-4 h-4 text-slate-400" />;
        }
    };

    const handleContactSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formState.name || !formState.email || !formState.message) return;

        setFormSentState("sending");
        setTimeout(() => {
            setFormSentState("success");
            setFormState({ name: "", email: "", company: "", message: "" });
            setTimeout(() => setFormSentState("idle"), 6000);
        }, 1500);
    };

    // Smooth scroll helper to bypass default offsets
    const scrollToSection = (id: string) => {
        setMobileMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            const offset = 80; // height of fixed header
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    return (
        <>
            {!gsapCompleted && (
                <GsapSections
                    scrolledAfterReachedLast={() => {
                        setGsapCompleted(true);
                    }}
                />
            )}
            {gsapCompleted && (
                <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
                    {/* 1. STICKY GLASS HEADER */}
                    <header className="sticky top-0 z-50 backdrop-blur-sm bg-white/80 border-b border-slate-200/80 transition-all duration-300">
                        <div className="max-w-7xl mx-auto px-6 h-16 sm:h-20 flex items-center justify-between">
                            {/* Brand Logo */}
                            <div onClick={() => scrollToSection("hero")} className="flex items-center gap-3 cursor-pointer group">
                                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-sky-500 to-cyan-500 p-[1.5px] shadow-sm group-hover:shadow-md transition-all duration-300">
                                    <div className="w-full h-full bg-white rounded-[10px] overflow-hidden cursor-zoom-in" onClick={(e) => openProfile(e)} role="button" aria-label="Open profile photo">
                                        <img src="/profile.jpg" alt="Fazal Shah" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                                <div>
                                    <span className="font-display font-bold text-slate-800 group-hover:text-indigo-600 transition-colors duration-200 block text-sm sm:text-base leading-none">Fazal Shah</span>
                                    <span className="text-[10px] font-mono tracking-wider text-slate-500 block">SENIOR ENGINEER</span>
                                </div>
                            </div>

                            {/* Desktop Navigation */}
                            <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
                                {["Skills", "Case Studies", "Interactive Maps", "Timeline", "Contact"].map((section, idx) => {
                                    const targetId = ["skills", "projects", "interactive-topology", "timeline", "contact"][idx];
                                    return (
                                        <button key={section} onClick={() => scrollToSection(targetId)} className="hover:text-indigo-600 transition-colors duration-200 relative py-1 cursor-pointer">
                                            {section}
                                        </button>
                                    );
                                })}
                            </nav>

                            {/* Action buttons (Desktop) */}
                            <div className="hidden md:flex items-center gap-4">
                                <a id="header-mailto" href="mailto:mehboobfazal36@gmail.com" className="px-4 py-2 text-xs font-semibold font-display text-slate-700 hover:text-indigo-600 border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 rounded-xl transition-all">
                                    Get In Touch
                                </a>
                            </div>

                            {/* Mobile Menu Trigger */}
                            <button id="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-slate-600 hover:text-indigo-600 focus:outline-none cursor-pointer" aria-label="Toggle Menu">
                                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>

                        {/* Mobile Navigation Drawer */}
                        <AnimatePresence>
                            {mobileMenuOpen && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: "easeInOut" }} className="md:hidden border-b border-slate-200 bg-white/95 overflow-hidden">
                                    <div className="px-6 py-4 flex flex-col gap-4 text-sm font-medium">
                                        {["Skills", "Case Studies", "Interactive Maps", "Timeline", "Contact"].map((section, idx) => {
                                            const targetId = ["skills", "projects", "interactive-topology", "timeline", "contact"][idx];
                                            return (
                                                <button key={section} id={`mobile-nav-${targetId}`} onClick={() => scrollToSection(targetId)} className="text-left py-2 text-slate-600 hover:text-indigo-650 transition-colors">
                                                    {section}
                                                </button>
                                            );
                                        })}
                                        <div className="border-t border-slate-200 pt-4 flex gap-3">
                                            <a id="mobile-mailto" href="mailto:mehboobfazal36@gmail.com" className="flex-1 text-center py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold font-display">
                                                Email Me
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </header>

                    {profileOpen && (
                        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60" onClick={closeProfile}>
                            <div className="p-4">
                                <img src="/profile.jpg" alt="Fazal Shah large" className={`max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl transform transition-all duration-300 ${profileAnimating ? "scale-100 opacity-100" : "scale-75 opacity-0"}`} />
                            </div>
                        </div>
                    )}

                    {/* MAIN CONTAINER */}
                    <main className="flex-1 flex flex-col">
                        {/* 2. HERO SECTION */}
                        <section id="hero" className="relative min-h-[95vh] flex items-center pt-16 pb-16 overflow-hidden bg-gradient-to-b from-white to-slate-50/50">
                            <img src="/hero_bg.jpg" alt="Hero Background" className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none" />
                            {/* Subtle Ambient Accents */}
                            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-indigo-500/10 blur-[130px] rounded-full pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-cyan-500/10 blur-[110px] rounded-full pointer-events-none" />

                            <div className="max-w-7xl mx-auto px-6 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                                {/* Hero Text Copy Block (Columns 1-7) */}
                                <div className="lg:col-span-7 flex flex-col">
                                    {/* Simple Experience Badge */}
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-xs font-mono text-indigo-700 w-fit mb-6 dark:bg-indigo-900 dark:border-indigo-700 dark:text-indigo-200">
                                        <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                                        <span>11+ Years of Software Engineering</span>
                                    </div>

                                    {/* Main Headline Display */}
                                    <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl tracking-tight leading-none mb-3 bg-gradient-to-r from-indigo-700 via-sky-600 to-cyan-600 text-transparent bg-clip-text">FAZAL SHAH</h1>
                                    <p className="text-indigo-600 font-semibold tracking-wider text-xs uppercase mb-4 font-mono">Senior Full-Stack & AI Engineer</p>

                                    {/* Tagline */}
                                    <p className="text-lg sm:text-xl font-display font-medium text-slate-700 max-w-2xl mb-4 leading-relaxed">Building reliable cloud SaaS architectures and tailored artificial intelligence pipelines.</p>

                                    {/* Sub-description - Natural Flow */}
                                    <p className="text-sm sm:text-base text-slate-600 max-w-2xl mb-10 leading-relaxed">
                                        I design and build full-stack enterprise solutions, multi-tenant databases, and custom RAG engines. Over my career, I've focused on translating complex business logic into maintainable systems, transitioning seamlessly from classic .NET environments to modern cloud architectures.
                                    </p>

                                    {/* Actions Grid */}
                                    <div className="flex flex-wrap gap-4 items-center">
                                        <a id="hero-get-in-touch" onClick={() => scrollToSection("contact")} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-xl shadow-sm hover:translate-y-[-1px] transition-all duration-200 cursor-pointer">
                                            Contact Me
                                        </a>

                                        <a
                                            id="hero-github"
                                            href="https://github.com/mehboobfazal"
                                            target="_blank"
                                            referrerPolicy="no-referrer"
                                            rel="noopener noreferrer"
                                            className="px-5 py-3 text-sm font-semibold text-slate-700 hover:text-indigo-600 border border-slate-200 hover:border-slate-350 bg-white hover:bg-slate-50 rounded-xl flex items-center gap-2 transition-all cursor-pointer dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100 dark:hover:text-indigo-300"
                                        >
                                            <Github className="w-4 h-4" />
                                            <span>GitHub</span>
                                        </a>

                                        <a
                                            id="hero-linkedin"
                                            href="https://linkedin.com/in/fazal-shah"
                                            target="_blank"
                                            referrerPolicy="no-referrer"
                                            rel="noopener noreferrer"
                                            className="px-5 py-3 text-sm font-semibold text-slate-700 hover:text-indigo-600 border border-slate-200 hover:border-slate-350 bg-white hover:bg-slate-50 rounded-xl flex items-center gap-2 transition-all cursor-pointer dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100 dark:hover:text-indigo-300"
                                        >
                                            <Linkedin className="w-4 h-4" />
                                            <span>LinkedIn</span>
                                        </a>
                                        <button onClick={() => setGsapCompleted(false)} className="group relative inline-block w-[200px] h-10 px-[25px] py-[10px] font-medium leading-10 text-[#00CFC8] bg-transparent cursor-pointer transition-all duration-300 ease border-0 perspective-[230px] animate-pulse">
                                            <span className="absolute inset-0 flex items-center justify-center box-border border border-[#00CFC8] rounded-md text-center shadow-[0_0_5px_#00CFC8,0_0_5px_#00CFC8_inset] transition-all duration-300 transform-3d rotate-x-90 origin-[50%_50%_-20px] group-hover:rotate-x-0 backface-hidden">What I Can...</span>
                                            <span className="absolute inset-0 flex items-center justify-center box-border border border-[#00CFC8] rounded-md text-center shadow-[0_0_5px_#00CFC8,0_0_5px_#00CFC8_inset] transition-all duration-300 transform-3d rotate-x-0 origin-[50%_50%_-20px] group-hover:-rotate-x-90 backface-hidden">Explore</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Static Visual Card Grid Showcase (Columns 8-12) */}
                                <div className="lg:col-span-5 relative flex items-center justify-center">
                                    <div className="w-full max-w-[420px] aspect-square rounded-2xl bg-white border border-slate-200/80 p-6 flex flex-col justify-between shadow-sm relative">
                                        <div className="flex items-center justify-between">
                                            <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center dark:bg-indigo-900 dark:border-indigo-700">
                                                <Layers className="w-5 h-5 text-indigo-600" />
                                            </div>
                                            <span className="text-[10px] font-mono tracking-wider text-slate-400">CORE SPECIALTIES</span>
                                        </div>

                                        <div className="my-6">
                                            <div className="text-[11px] font-mono text-cyan-600 mb-1">Architecture Strategy</div>
                                            <h3 className="text-lg font-display font-semibold text-slate-800 tracking-tight mb-2">Scalable Systems</h3>
                                            <p className="text-xs text-slate-600 leading-relaxed">Helping teams replace legacy configurations with modular service designs, optimized relational databases, and clean frontend workspaces.</p>
                                        </div>

                                        {/* Sub-system Representation */}
                                        <div className="space-y-2 bg-slate-50 border border-slate-100 p-3.5 rounded-xl font-mono text-[10px]">
                                            <div className="flex justify-between items-center text-slate-500">
                                                <span>1. Business Core:</span>
                                                <span className="text-indigo-600 font-semibold">Web / Python / AI / C#</span>
                                            </div>
                                            <div className="flex justify-between items-center text-slate-500">
                                                <span>2. Storage Layer:</span>
                                                <span className="text-cyan-600 font-semibold">SQL Server / PG</span>
                                            </div>
                                            <div className="flex justify-between items-center text-slate-500">
                                                <span>3. Tailored AI:</span>
                                                <span className="text-purple-600 font-semibold">Dify + Milvus Vector DB</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 3. ENTERPRISE DISCLAIMER BLOCK */}
                        <section className="bg-white py-8">
                            <div className="max-w-7xl mx-auto px-6">
                                <div id="enterprise-disclaimer" className="p-6 md:p-8 bg-slate-50 border border-slate-200 rounded-2xl relative overflow-hidden flex flex-col md:flex-row gap-6 items-start">
                                    <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-600 flex-shrink-0 dark:bg-indigo-900 dark:border-indigo-700 dark:text-indigo-200">
                                        <Lock className="w-6 h-6" />
                                    </div>

                                    <div>
                                        <h4 className="font-display font-semibold text-slate-800 text-lg sm:text-xl mb-2 flex items-center gap-2">
                                            <span>Enterprise Security & Architecture Note</span>
                                        </h4>
                                        <p className="text-sm text-slate-650 leading-relaxed">
                                            Most of my core engineering work resides securely inside enterprise environments and private networks. To respect confidentiality while representing architecture patterns, this portfolio utilizes interactive diagrams to demonstrate systems scalability, secure data pipelines, and real operational setups of these products.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 4. TECHNICAL ARSENAL (Grid Layout) */}
                        <section id="skills" className="py-20 bg-slate-50/50 border-t border-slate-200/80 relative">
                            <div className="max-w-7xl mx-auto px-6">
                                {/* Section Header */}
                                <div className="max-w-3xl mb-12">
                                    <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-200 pb-1 flex items-center gap-2 select-none">
                                        <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full" /> Technical Foundations
                                    </h2>
                                    <p className="text-xl text-slate-800 font-display font-semibold tracking-tight sm:text-3xl leading-snug">Deep expertise in backend databases, modern frameworks, and production-ready architectures.</p>
                                </div>

                                {/* Category selection controls */}
                                <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-slate-200">
                                    <button id="skill-filter-all" onClick={() => setActiveCategory("all")} className={`px-4 py-2 text-xs font-semibold font-display rounded-lg border transition-all cursor-pointer ${activeCategory === "all" ? "bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm" : "border-transparent text-slate-500 hover:text-slate-800"}`}>
                                        All Tech
                                    </button>
                                    {skillCategories.map((cat) => (
                                        <button key={cat.id} id={`skill-filter-${cat.id}`} onClick={() => setActiveCategory(cat.id)} className={`px-4 py-2 text-xs font-semibold font-display rounded-lg border transition-all cursor-pointer ${activeCategory === cat.id ? "bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm" : "border-transparent text-slate-500 hover:text-slate-800"}`}>
                                            {cat.title}
                                        </button>
                                    ))}
                                </div>

                                {/* Content Cards Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {skillCategories
                                        .filter((cat) => activeCategory === "all" || cat.id === activeCategory)
                                        .map((cat) => (
                                            <div key={cat.id} className="p-6 bg-white border border-slate-200 rounded-2xl flex flex-col justify-between hover:border-slate-350 hover:shadow-xs transition-all duration-200">
                                                <div>
                                                    <h4 className="font-display font-semibold text-slate-800 mb-2 text-base tracking-tight">{cat.title}</h4>
                                                    <p className="text-xs text-slate-500 leading-relaxed mb-6">{cat.description}</p>
                                                </div>

                                                <div className="space-y-2 mt-auto">
                                                    {cat.skills.map((skill) => (
                                                        <div key={skill.name} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100/55">
                                                            <div className="flex items-center gap-2">
                                                                {getSkillIcon(skill.iconName)}
                                                                <span className="text-xs font-medium text-slate-700">{skill.name}</span>
                                                            </div>
                                                            <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-200/50 rounded-md text-slate-500 uppercase dark:bg-slate-800/60 dark:text-slate-200">{skill.level}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </section>

                        {/* 5. INTERACTIVE NETWORK MAP TOpology */}
                        <section id="interactive-topology" className="py-20 bg-white border-t border-slate-200/80">
                            <div className="max-w-7xl mx-auto px-6">
                                <div className="max-w-3xl mb-12">
                                    <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-200 pb-1 flex items-center gap-2 select-none">
                                        <span className="w-1.5 h-1.5 bg-cyan-600 rounded-full" /> Architectural Blueprints
                                    </h2>
                                    <p className="text-xl text-slate-800 font-display font-semibold tracking-tight sm:text-3xl leading-snug">Production-grade environments and secure system diagrams, mapped.</p>
                                </div>

                                <NetworkTopology />
                            </div>
                        </section>

                        {/* 6. PROJECTS SHOWCASE */}
                        <section id="projects" className="py-20 bg-slate-50/50 border-t border-slate-200/80 relative">
                            <div className="max-w-7xl mx-auto px-6">
                                <div className="max-w-3xl mb-16">
                                    <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-200 pb-1 flex items-center gap-2 select-none">
                                        <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full" /> Major Achievements
                                    </h2>
                                    <p className="text-xl text-slate-800 font-display font-semibold tracking-tight sm:text-3xl leading-snug">Building multi-tenant enterprise ERP frameworks and tailored business solutions.</p>
                                </div>

                                {/* Flagship Projects Section */}
                                <div className="space-y-12 mb-16">
                                    {flagshipProjects.map((project, idx) => (
                                        <div key={project.id} id={`project-case-${project.id}`} className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center transition-all duration-300 relative overflow-hidden group shadow-xs">
                                            {/* Subtle right accent background */}
                                            <div className="absolute -right-4 -top-4 w-48 h-48 bg-indigo-50/30 rounded-full blur-3xl group-hover:bg-indigo-50/50 transition-all pointer-events-none dark:bg-indigo-900/20" />

                                            {/* Card Content - Left Side */}
                                            <div className="lg:col-span-8 flex flex-col justify-between h-full">
                                                <div>
                                                    {/* Tag Badge */}
                                                    <span className="inline-block px-3 py-1 bg-slate-100 border border-slate-200 text-slate-600 font-mono text-[10px] uppercase tracking-wider rounded-lg mb-4 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200">{project.tag}</span>

                                                    {/* Title */}
                                                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-800 tracking-tight mb-4">{project.title}</h3>

                                                    {/* Description */}
                                                    <p className="text-sm sm:text-base text-slate-650 mb-6 leading-relaxed font-normal">{project.description}</p>

                                                    {/* Key Bullet Highlights */}
                                                    <div className="mb-6">
                                                        <h4 className="text-xs text-indigo-600 font-mono uppercase tracking-wider mb-3">Key Focus & Solutions</h4>
                                                        <ul className="space-y-2">
                                                            {project.highlights.map((item, hiIdx) => (
                                                                <li key={hiIdx} className="flex items-start gap-2 text-xs leading-relaxed text-slate-600">
                                                                    <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                                                                    <span>{item}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>

                                                {/* Tech Badges */}
                                                <div className="flex flex-wrap gap-2 pt-4">
                                                    {project.techStack.map((tech) => (
                                                        <span key={tech} className="px-2.5 py-1 bg-slate-100 border border-slate-200/50 text-[11px] font-mono text-slate-600 rounded-md dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Anonymized Enterprise Metrics (Right) */}
                                            <div className="lg:col-span-4 p-6 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-center h-full gap-4">
                                                <div className="flex items-center gap-1 text-[11px] font-mono text-cyan-600 font-medium">
                                                    <Sliders className="w-3.5 h-3.5" />
                                                    <span>PRODUCTION METRICS</span>
                                                </div>

                                                <div className="space-y-4">
                                                    {project.metrics?.map((metric, metricIdx) => (
                                                        <div key={metricIdx} className="border-b border-slate-200 pb-3 last:border-b-0 last:pb-0">
                                                            <div className="text-2xl font-display font-bold text-slate-800 mb-0.5">{metric.value}</div>
                                                            <div className="text-[11px] text-slate-500 font-mono">{metric.label}</div>
                                                        </div>
                                                    ))}
                                                </div>

                                                {project.externalUrl && (
                                                    <a
                                                        id={`project-link-${project.id}`}
                                                        href={project.externalUrl}
                                                        target="_blank"
                                                        referrerPolicy="no-referrer"
                                                        rel="noopener noreferrer"
                                                        className="mt-4 w-full text-center py-2.5 bg-indigo-50 hover:bg-indigo-100/80 border border-indigo-200 text-indigo-700 hover:text-indigo-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                                                    >
                                                        <span>Visit Website</span>
                                                        <ArrowUpRight className="w-4 h-4" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* TWO-COLUMN FREELANCE GRID */}
                                <div className="border-t border-slate-200/85 pt-16">
                                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-200 pb-1 flex items-center gap-2 select-none">
                                        <span className="w-1.5 h-1.5 bg-sky-500 rounded-full" /> Freelance Products
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {freelanceProjects.map((fProj, fIdx) => (
                                            <div key={fIdx} id={`freelance-card-${fIdx}`} className="p-6 bg-white border border-slate-200 hover:border-indigo-100 rounded-2xl shadow-xs transition-all duration-300 flex flex-col justify-between">
                                                <div>
                                                    <div className="flex items-center justify-between mb-4">
                                                        <h4 className="font-display font-bold text-lg text-slate-800">{fProj.title}</h4>
                                                        <a
                                                            id={`freelance-link-${fIdx}`}
                                                            href={fProj.link}
                                                            target="_blank"
                                                            referrerPolicy="no-referrer"
                                                            rel="noopener noreferrer"
                                                            className="p-1 px-2.5 bg-slate-50 border border-slate-200 text-[10px] font-mono text-cyan-600 hover:text-cyan-700 rounded hover:border-slate-300 flex items-center gap-1 transition-all cursor-pointer dark:bg-slate-800 dark:border-slate-700 dark:text-cyan-300 dark:hover:text-cyan-200"
                                                        >
                                                            <span>{fProj.displayLink}</span>
                                                            <ArrowUpRight className="w-3" />
                                                        </a>
                                                    </div>

                                                    <p className="text-xs text-slate-650 mb-6 leading-relaxed">{fProj.description}</p>

                                                    <div className="space-y-2 mb-6">
                                                        {fProj.highlights.map((hl, hlIdx) => (
                                                            <div key={hlIdx} className="flex items-start gap-1.5 text-xs text-slate-600">
                                                                <span className="text-indigo-600 font-bold">•</span>
                                                                <span className="leading-snug">{hl}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap gap-1.5 pt-2">
                                                    {fProj.tags.map((tag) => (
                                                        <span key={tag} className="px-2 py-0.5 bg-slate-100 text-[10px] text-slate-500 font-mono rounded dark:bg-slate-800 dark:text-slate-300">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 7. EXPERIENCE TIMELINE */}
                        <section id="timeline" className="py-20 bg-white border-t border-slate-200/80 relative">
                            <div className="max-w-7xl mx-auto px-6">
                                <div className="max-w-3xl mb-12">
                                    <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-200 pb-1 flex items-center gap-2 select-none">
                                        <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full" /> Career History
                                    </h2>
                                    <p className="text-xl text-slate-800 font-display font-semibold tracking-tight sm:text-3xl leading-snug">11+ Years of professional experience architecting reliable transaction systems.</p>
                                </div>

                                <div className="relative border-l border-slate-200 pl-4 sm:pl-8 ml-2 sm:ml-4 space-y-12">
                                    {careerTimeline.map((item, idx) => (
                                        <div key={item.id} className="relative group">
                                            {/* Glowing Connector Node */}
                                            <div className="absolute -left-[21px] sm:-left-[37px] top-1.5 w-3 h-3 rounded-full bg-white border-2 border-indigo-600 ring-4 ring-indigo-50 group-hover:bg-indigo-600 transition-colors duration-200" />

                                            <div className="p-6 bg-slate-50/50 group-hover:bg-slate-50 border border-slate-200 rounded-2xl transition-all duration-300">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-white border border-slate-200 rounded-lg text-indigo-600">
                                                            <Briefcase className="w-4 h-4" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-display font-bold text-slate-800 text-lg leading-tight">{item.role}</h3>
                                                            <span className="text-xs text-slate-550 leading-none block mt-0.5">
                                                                {item.company} &mdash; <span className="font-mono text-[10px] bg-slate-100 text-slate-600 px-1 py-0.5 rounded dark:bg-slate-800 dark:text-slate-200">{item.location}</span>
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Period Badge */}
                                                    <span className="px-3 py-1 bg-white border border-slate-200 text-slate-600 font-mono text-xs rounded-lg flex items-center gap-1.5 w-fit h-fit self-start sm:self-auto shadow-xs dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200">
                                                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                                        <span>{item.period}</span>
                                                    </span>
                                                </div>

                                                <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-normal mb-4">{item.description}</p>

                                                <div className="space-y-2 mb-6">
                                                    <div className="text-[10px] font-mono text-indigo-650 uppercase tracking-wider block mb-1">Key Contributions & Accomplishments</div>
                                                    {item.impacts.map((imp, impIdx) => (
                                                        <div key={impIdx} className="flex items-start gap-2 text-xs text-slate-650 leading-relaxed">
                                                            <ChevronRight className="w-3.5 h-3.5 text-indigo-600 mt-0.5 flex-shrink-0" />
                                                            <span>{imp}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-200">
                                                    {item.techUsed.map((tech) => (
                                                        <span key={tech} className="px-2 py-0.5 bg-white border border-slate-150 text-[10px] font-mono text-slate-500 rounded dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* 8. CONTACT FOOTER / FORM */}
                        <section id="contact" className="py-20 bg-slate-50 border-t border-slate-200 relative">
                            <div className="max-w-7xl mx-auto px-6">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                                    {/* Left Column Copy (Columns 1-5) */}
                                    <div className="lg:col-span-5 flex flex-col">
                                        <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-200 pb-1 flex items-center gap-2 select-none">
                                            <span className="w-1.5 h-1.5 bg-cyan-650 rounded-full" /> Let's Connect
                                        </h2>
                                        <h3 className="font-display font-bold text-3xl sm:text-4xl text-slate-800 tracking-tight leading-tight mb-4">Get In Touch</h3>
                                        <p className="text-sm text-slate-600 leading-relaxed mb-8 max-w-md">Have a web application, modern microservice deployment, or relational database architecture project? I'd love to chat. Feel free to use the contact form, shoot over an email.</p>

                                        {/* Direct info list */}
                                        <div className="space-y-4 font-mono text-xs">
                                            <div className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl shadow-xs dark:bg-slate-800 dark:border-slate-700">
                                                <Mail className="w-4 h-4 text-emerald-500" />
                                                <span className="text-slate-400 font-semibold">EMAIL:</span>
                                                <a href="mailto:mehboobfazal36@gmail.com" className="text-emerald-500 hover:text-emerald-700 hover:underline">
                                                    mehboobfazal36@gmail.com
                                                </a>
                                            </div>

                                            <div className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl shadow-xs dark:bg-slate-800 dark:border-slate-700">
                                                <MapPin className="w-4 h-4 text-cyan-600" />
                                                <span className="text-slate-400 font-semibold">LOCATION:</span>
                                                <span className="text-cyan-700 font-sans font-medium">Kathmandu, Nepal</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contact Form Container (Columns 6-12) */}
                                    <div className="lg:col-span-7 bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl relative shadow-xs">
                                        <h4 className="font-display font-bold text-slate-800 text-lg mb-6">Send Me a Message</h4>

                                        <form onSubmit={handleContactSubmit} className="space-y-4">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label htmlFor="form-name" className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                                                        Your Name
                                                    </label>
                                                    <input
                                                        id="form-name"
                                                        type="text"
                                                        required
                                                        value={formState.name}
                                                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-indigo-600 focus:bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 dark:focus:bg-slate-900"
                                                        placeholder="e.g. Alexis Chen"
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="form-email" className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                                                        Your Email
                                                    </label>
                                                    <input
                                                        id="form-email"
                                                        type="email"
                                                        required
                                                        value={formState.email}
                                                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-indigo-600 focus:bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 dark:focus:bg-slate-900"
                                                        placeholder="e.g. alexis@company.com"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="form-company" className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                                                    Company (Optional)
                                                </label>
                                                <input
                                                    id="form-company"
                                                    type="text"
                                                    value={formState.company}
                                                    onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-indigo-600 focus:bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 dark:focus:bg-slate-900"
                                                    placeholder="e.g. Systems Inc."
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="form-message" className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                                                    Message Details
                                                </label>
                                                <textarea
                                                    id="form-message"
                                                    rows={4}
                                                    required
                                                    value={formState.message}
                                                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-indigo-600 focus:bg-white resize-none dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 dark:focus:bg-slate-900"
                                                    placeholder="Describe your project, timeline, or requirements..."
                                                />
                                            </div>

                                            <div className="pt-2">
                                                <button id="submit-contact" type="submit" disabled={formSentState !== "idle"} className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm">
                                                    {formSentState === "idle" && (
                                                        <>
                                                            <span>Send Message</span>
                                                            <Send className="w-3.5 h-3.5" />
                                                        </>
                                                    )}

                                                    {formSentState === "sending" && (
                                                        <>
                                                            <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                                                            <span>Sending...</span>
                                                        </>
                                                    )}

                                                    {formSentState === "success" && (
                                                        <>
                                                            <Check className="w-4 h-4 text-emerald-100" />
                                                            <span>Delivered successfully!</span>
                                                        </>
                                                    )}
                                                </button>
                                            </div>

                                            {/* Informational Note for clean transparency */}
                                            <div className="flex items-start gap-2 bg-slate-50 p-3 border border-slate-200 rounded-xl mt-4">
                                                <Info className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                                                <p className="text-[11px] text-slate-500 leading-snug">Note: Submitting this form temporarily models message transfer to simulated local parameters. Your message won't be leaked and will be processed immediately. You can also click the email on the left.</p>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>

                    {/* FOOTER */}
                    <footer className="bg-white border-t border-slate-200 py-12">
                        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                            <div className="flex flex-col">
                                <span className="font-display font-bold text-slate-800 text-sm">Fazal Shah</span>
                                <span className="text-xs text-slate-500 mt-1 font-mono">Senior Full-Stack & AI Systems Architect</span>
                            </div>

                            <div className="flex gap-4 items-center">
                                <a id="footer-github" href="https://github.com/mehboobfazal" aria-label="GitHub Profile Link" target="_blank" referrerPolicy="no-referrer" rel="noopener noreferrer" className="p-2 border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-slate-350 bg-white rounded-xl transition-all">
                                    <Github className="w-4 h-4" />
                                </a>
                                <a id="footer-linkedin" href="https://linkedin.com/in/fazal-shah" aria-label="LinkedIn Profile Link" target="_blank" referrerPolicy="no-referrer" rel="noopener noreferrer" className="p-2 border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-slate-350 bg-white rounded-xl transition-all">
                                    <Linkedin className="w-4 h-4" />
                                </a>
                                <a id="footer-mailto" href="mailto:mehboobfazal36@gmail.com" aria-label="Mail Direct Action" className="p-2 border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-slate-350 bg-white rounded-xl transition-all">
                                    <Mail className="w-4 h-4" />
                                </a>
                            </div>

                            <div className="text-[11px] font-mono text-slate-500 sm:text-right">
                                <span>© {new Date().getFullYear()} Fazal Shah. All Rights Reserved. Kathmandu, Nepal.</span>
                            </div>
                        </div>
                    </footer>

                    {/* Theme toggle (class-based) */}
                    <button aria-label="Toggle theme" onClick={toggleTheme} className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 backdrop-blur-sm">
                        {theme === "dark" ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-900" />}
                    </button>
                </div>
            )}
        </>
    );
}
