import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { cn } from "@/lib/utils";
import { gsapSections } from "@/components/portfolioData";
import { ArrowRight } from "lucide-react";

export default function GsapSections(props: any) {
    const { scrolledAfterReachedLast } = props || {};
    const containerRef = useRef<HTMLDivElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

    const [activeIndex, setActiveIndex] = useState(0);
    const lenisRef = useRef<Lenis | null>(null);

    const [currentStep, setCurrentStep] = useState(0);
    const stepRef = useRef(0);
    const lastTransitionTimeRef = useRef(0);

    useEffect(() => {
        stepRef.current = currentStep;
    }, [currentStep]);

    const canvasProps = useRef({
        gridAlpha: 0.15,
        gridScale: 1.0,
        gridRotate: 0,
        beamAlpha: 0,
        streamSpeed: 0,
        streamAlpha: 0,
        nodeAlpha: 0,
        matrixAlpha: 0,
        matrixSpeed: 1,
        pulseAlpha: 0,
        glowSize: 0,
        modernGridAlpha: 0,
        noiseIntensity: 0,
        sineAlpha: 0,
        sineAmplitude: 0,
        haloAlpha: 0,
        haloSize: 0,
        transitionBlur: 0,
    });

    const goToStep = (targetStep: number) => {
        setCurrentStep(targetStep);

        if (typeof window === "undefined") return;

        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const i = Math.floor(targetStep / 2);
        const isOdd = targetStep % 2 === 1;

        const t = i * 3 + (isOdd ? 1.8 : i === 0 ? 0.0 : 0.95);
        const progress = t / 28.8;
        const Y = progress * maxScroll;

        if (lenisRef.current) {
            lenisRef.current.scrollTo(Y, {
                duration: 0.9,
                easing: (val) => Math.min(1, 1.001 - Math.pow(2, -10 * val)),
            });
        } else {
            window.scrollTo({
                top: Y,
                behavior: "smooth",
            });
        }

        setActiveIndex(i);
    };

    const handleNavClick = (index: number) => {
        if (typeof window === "undefined") return;

        if (typeof navigator !== "undefined" && navigator.vibrate) {
            navigator.vibrate(12);
        }

        const targetStep = index * 2;
        goToStep(targetStep);
    };

    useEffect(() => {
        if (typeof window === "undefined") return;

        const handleWheel = (e: WheelEvent) => {
            if (Math.abs(e.deltaY) < 15) return;

            e.preventDefault();

            const now = Date.now();
            if (now - lastTransitionTimeRef.current < 450) {
                return;
            }

            if (e.deltaY > 0) {
                if (stepRef.current < 19) {
                    lastTransitionTimeRef.current = now;
                    goToStep(stepRef.current + 1);
                } else {
                    if (now - lastTransitionTimeRef.current > 1200) {
                        lastTransitionTimeRef.current = now;
                        if (typeof scrolledAfterReachedLast === "function") {
                            scrolledAfterReachedLast();
                        }
                    }
                }
            } else {
                if (stepRef.current > 0) {
                    lastTransitionTimeRef.current = now;
                    goToStep(stepRef.current - 1);
                }
            }
        };

        let touchStartY = 0;
        const handleTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault();
        };

        const handleTouchEnd = (e: TouchEvent) => {
            const touchEndY = e.changedTouches[0].clientY;
            const diffY = touchStartY - touchEndY;

            if (Math.abs(diffY) < 40) return;

            const now = Date.now();
            if (now - lastTransitionTimeRef.current < 850) return;

            if (diffY > 0) {
                if (stepRef.current < 19) {
                    lastTransitionTimeRef.current = now;
                    goToStep(stepRef.current + 1);
                } else {
                    if (now - lastTransitionTimeRef.current > 1200) {
                        lastTransitionTimeRef.current = now;
                        if (typeof scrolledAfterReachedLast === "function") {
                            scrolledAfterReachedLast();
                        }
                    }
                }
            } else {
                if (stepRef.current > 0) {
                    lastTransitionTimeRef.current = now;
                    goToStep(stepRef.current - 1);
                }
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement;
            if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
                return;
            }

            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
                e.preventDefault();

                const now = Date.now();
                if (now - lastTransitionTimeRef.current < 850) return;

                if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                    if (stepRef.current > 0) {
                        lastTransitionTimeRef.current = now;
                        goToStep(stepRef.current - 1);
                    }
                } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                    if (stepRef.current < 19) {
                        lastTransitionTimeRef.current = now;
                        goToStep(stepRef.current + 1);
                    } else {
                        if (now - lastTransitionTimeRef.current > 1200) {
                            lastTransitionTimeRef.current = now;
                            if (typeof scrolledAfterReachedLast === "function") {
                                scrolledAfterReachedLast();
                            }
                        }
                    }
                }
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: false });
        window.addEventListener("touchstart", handleTouchStart, { passive: true });
        window.addEventListener("touchmove", handleTouchMove, { passive: false });
        window.addEventListener("touchend", handleTouchEnd, { passive: true });
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [scrolledAfterReachedLast]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const lenis = new Lenis({
            lerp: 0.08,
            wheelMultiplier: 1.0,
            gestureOrientation: "vertical",
        });

        lenisRef.current = lenis;

        lenis.on("scroll", () => {
            ScrollTrigger.update();
        });

        const onTick = (time: number) => {
            lenis.raf(time * 1000);
        };
        gsap.ticker.add(onTick);
        gsap.ticker.lagSmoothing(0);

        const sectionsCount = gsapSections.length;
        const sectionDuration = 3;

        const canvas = canvasRef.current;
        let animationId: number;
        let resizeHandler: () => void;

        if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
                const offscreenCanvas = document.createElement("canvas");
                const offscreenCtx = offscreenCanvas.getContext("2d");

                resizeHandler = () => {
                    const w = window.innerWidth;
                    const h = window.innerHeight;
                    canvas.width = w;
                    canvas.height = h;
                    offscreenCanvas.width = w;
                    offscreenCanvas.height = h;
                };
                resizeHandler();
                window.addEventListener("resize", resizeHandler);

                let lastTime = 0;
                let simTime = 0;

                const draw = (timestamp: number) => {
                    if (lastTime === 0) {
                        lastTime = timestamp;
                    }
                    let deltaTime = (timestamp - lastTime) * 0.001;
                    lastTime = timestamp;

                    if (deltaTime > 0.1) {
                        deltaTime = 0.01667;
                    }

                    simTime += deltaTime;

                    if (offscreenCtx) {
                        const width = offscreenCanvas.width;
                        const height = offscreenCanvas.height;

                        offscreenCtx.fillStyle = "#050505";
                        offscreenCtx.fillRect(0, 0, width, height);

                        const props = canvasProps.current;

                        if (props.gridAlpha > 0) {
                            offscreenCtx.save();
                            offscreenCtx.translate(width / 2, height / 2);
                            offscreenCtx.rotate(props.gridRotate + simTime * 0.02);
                            offscreenCtx.strokeStyle = `rgba(99, 102, 241, ${props.gridAlpha})`;
                            offscreenCtx.lineWidth = 1;
                            const step = 60 * props.gridScale;
                            const size = Math.max(width, height) * 2;
                            for (let x = -size; x < size; x += step) {
                                offscreenCtx.beginPath();
                                offscreenCtx.moveTo(x, -size);
                                offscreenCtx.lineTo(x, size);
                                offscreenCtx.stroke();
                            }
                            for (let y = -size; y < size; y += step) {
                                offscreenCtx.beginPath();
                                offscreenCtx.moveTo(-size, y);
                                offscreenCtx.lineTo(size, y);
                                offscreenCtx.stroke();
                            }
                            offscreenCtx.restore();
                        }

                        if (props.beamAlpha > 0) {
                            offscreenCtx.strokeStyle = `rgba(14, 165, 233, ${props.beamAlpha})`;
                            offscreenCtx.lineWidth = 1;
                            for (let i = 0; i < 5; i++) {
                                const y = (height * (0.15 + i * 0.18) + Math.sin(simTime + i) * 35) % height;
                                offscreenCtx.beginPath();
                                offscreenCtx.moveTo(0, y);
                                offscreenCtx.lineTo(width, y);
                                offscreenCtx.stroke();

                                const x = (width * 0.05 + simTime * 200 * (1 + i * 0.25)) % width;
                                const radialGlow = offscreenCtx.createRadialGradient(x, y, 0, x, y, 30);
                                radialGlow.addColorStop(0, `rgba(14, 165, 233, ${props.beamAlpha * 2.5})`);
                                radialGlow.addColorStop(1, "rgba(14, 165, 233, 0)");
                                offscreenCtx.fillStyle = radialGlow;
                                offscreenCtx.beginPath();
                                offscreenCtx.arc(x, y, 30, 0, Math.PI * 2);
                                offscreenCtx.fill();
                            }
                        }

                        if (props.streamAlpha > 0) {
                            offscreenCtx.fillStyle = `rgba(52, 211, 153, ${props.streamAlpha})`;
                            for (let i = 0; i < 35; i++) {
                                const x = (i * 139) % width;
                                const speed = (6 + (i % 5) * 4) * props.streamSpeed;
                                const y = ((simTime * speed * 25 + i * 17) % (height + 250)) - 150;
                                offscreenCtx.fillRect(x, y, 1.2, 50 + (i % 3) * 40);
                            }
                        }

                        if (props.nodeAlpha > 0) {
                            const nodes = [];
                            for (let i = 0; i < 18; i++) {
                                const x = ((i * 197) % (width - 120)) + 60;
                                const y = ((i * 397) % (height - 120)) + 60;
                                nodes.push({ x, y });
                            }
                            offscreenCtx.strokeStyle = `rgba(217, 119, 6, ${props.nodeAlpha * 0.65})`;
                            offscreenCtx.lineWidth = 0.8;
                            for (let i = 0; i < nodes.length; i++) {
                                for (let j = i + 1; j < nodes.length; j++) {
                                    const distance = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
                                    if (distance < 280) {
                                        offscreenCtx.beginPath();
                                        offscreenCtx.moveTo(nodes[i].x, nodes[i].y);
                                        offscreenCtx.lineTo(nodes[j].x, nodes[j].y);
                                        offscreenCtx.stroke();
                                    }
                                }
                            }
                            offscreenCtx.fillStyle = `rgba(217, 119, 6, ${props.nodeAlpha * 1.5})`;
                            nodes.forEach((node) => {
                                offscreenCtx.beginPath();
                                offscreenCtx.arc(node.x, node.y, 4, 0, Math.PI * 2);
                                offscreenCtx.fill();
                            });
                        }

                        if (props.matrixAlpha > 0) {
                            offscreenCtx.fillStyle = `rgba(16, 185, 129, ${props.matrixAlpha})`;
                            offscreenCtx.font = "11px monospace";
                            for (let i = 0; i < 45; i++) {
                                const x = (i * 79) % width;
                                const speed = 2.5 * props.matrixSpeed;
                                const y = (simTime * speed * 22 + i * 31) % (height + 80);
                                const char = (Math.floor(simTime + i) % 2).toString();
                                offscreenCtx.fillText(char, x, y);
                            }
                        }

                        if (props.pulseAlpha > 0) {
                            offscreenCtx.strokeStyle = `rgba(139, 92, 246, ${props.pulseAlpha * 0.45})`;
                            offscreenCtx.lineWidth = 1.5;
                            for (let i = 0; i < 3; i++) {
                                const yOffset = i * 160 - 160;
                                offscreenCtx.beginPath();
                                offscreenCtx.moveTo(0, height / 2 + yOffset);
                                offscreenCtx.bezierCurveTo(width * 0.28, height / 2 + yOffset - 280, width * 0.72, height / 2 + yOffset + 280, width, height / 2 + yOffset);
                                offscreenCtx.stroke();

                                const t = (simTime * 0.16 + i * 0.33) % 1.0;
                                const cx = (1 - t) * (1 - t) * (1 - t) * 0 + 3 * (1 - t) * (1 - t) * t * (width * 0.28) + 3 * (1 - t) * t * t * (width * 0.72) + t * t * t * width;
                                const cy = (1 - t) * (1 - t) * (1 - t) * (height / 2 + yOffset) + 3 * (1 - t) * (1 - t) * t * (height / 2 + yOffset - 280) + 3 * (1 - t) * t * t * (height / 2 + yOffset + 280) + t * t * t * (height / 2 + yOffset);

                                const pulseGrad = offscreenCtx.createRadialGradient(cx, cy, 0, cx, cy, 32);
                                pulseGrad.addColorStop(0, `rgba(139, 92, 246, ${props.pulseAlpha * 2.8})`);
                                pulseGrad.addColorStop(1, "rgba(139, 92, 246, 0)");
                                offscreenCtx.fillStyle = pulseGrad;
                                offscreenCtx.beginPath();
                                offscreenCtx.arc(cx, cy, 32, 0, Math.PI * 2);
                                offscreenCtx.fill();
                            }
                        }

                        if (props.glowSize > 0) {
                            const gx = width / 2 + Math.cos(simTime * 0.4) * 140;
                            const gy = height / 2 + Math.sin(simTime * 0.4) * 70;
                            const radius = 340 * props.glowSize;
                            const glowGrad = offscreenCtx.createRadialGradient(gx, gy, 0, gx, gy, radius);
                            glowGrad.addColorStop(0, `rgba(59, 130, 246, ${props.glowSize * 0.25})`);
                            glowGrad.addColorStop(0.5, `rgba(147, 51, 234, ${props.glowSize * 0.08})`);
                            glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
                            offscreenCtx.fillStyle = glowGrad;
                            offscreenCtx.beginPath();
                            offscreenCtx.arc(gx, gy, radius, 0, Math.PI * 2);
                            offscreenCtx.fill();
                        }

                        if (props.modernGridAlpha > 0) {
                            const blockSize = Math.floor(25 - 18 * (1 - props.noiseIntensity));
                            offscreenCtx.fillStyle = `rgba(244, 63, 94, ${props.modernGridAlpha * 0.28})`;
                            for (let x = 0; x < width; x += blockSize * 5) {
                                for (let y = 0; y < height; y += blockSize * 5) {
                                    if ((x + y) % (blockSize * 10) === 0) {
                                        offscreenCtx.fillRect(x, y, blockSize, blockSize);
                                    }
                                }
                            }
                        }

                        if (props.sineAlpha > 0) {
                            offscreenCtx.strokeStyle = `rgba(168, 85, 247, ${props.sineAlpha})`;
                            offscreenCtx.lineWidth = 1.2;
                            for (let j = 0; j < 5; j++) {
                                offscreenCtx.beginPath();
                                for (let x = 0; x < width; x += 15) {
                                    const angle = x * 0.002 + simTime * 1.8 + j * 0.55;
                                    const y = height / 2 + Math.sin(angle) * props.sineAmplitude * (1 - j * 0.18);
                                    if (x === 0) offscreenCtx.moveTo(x, y);
                                    else offscreenCtx.lineTo(x, y);
                                }
                                offscreenCtx.stroke();
                            }
                        }

                        if (props.haloAlpha > 0) {
                            const hx = width / 2;
                            const hy = height / 2;
                            const hrad = 240 * props.haloSize;

                            const haloGrad = offscreenCtx.createRadialGradient(hx, hy, hrad * 0.7, hx, hy, hrad * 1.3);
                            haloGrad.addColorStop(0, "rgba(251, 191, 36, 0)");
                            haloGrad.addColorStop(0.5, `rgba(251, 191, 36, ${props.haloAlpha})`);
                            haloGrad.addColorStop(1, "rgba(251, 191, 36, 0)");
                            offscreenCtx.fillStyle = haloGrad;
                            offscreenCtx.beginPath();
                            offscreenCtx.arc(hx, hy, hrad * 1.3, 0, Math.PI * 2);
                            offscreenCtx.fill();

                            offscreenCtx.fillStyle = `rgba(251, 191, 36, ${props.haloAlpha * 1.8})`;
                            for (let i = 0; i < 30; i++) {
                                const radAngle = simTime * 0.2 + i * 0.4;
                                const dist = (hrad * 0.8 + Math.sin(simTime + i) * 35) % (hrad * 1.4);
                                const px = hx + Math.cos(radAngle) * dist;
                                const py = hy + Math.sin(radAngle) * dist;
                                offscreenCtx.beginPath();
                                offscreenCtx.arc(px, py, 1.6, 0, Math.PI * 2);
                                offscreenCtx.fill();
                            }
                        }

                        if (canvasRef.current) {
                            if (props.transitionBlur > 0.05) {
                                canvasRef.current.style.filter = `blur(${props.transitionBlur}px)`;
                                canvasRef.current.style.transform = `scale(${1 + props.transitionBlur * 0.005})`;
                            } else {
                                canvasRef.current.style.filter = "none";
                                canvasRef.current.style.transform = "none";
                            }
                        }

                        ctx.drawImage(offscreenCanvas, 0, 0);
                    }

                    animationId = requestAnimationFrame(draw);
                };
                animationId = requestAnimationFrame(draw);
            }
        }

        const ctx = gsap.context(() => {
            gsapSections.forEach((_, i) => {
                const sectionEl = sectionRefs.current[i];
                if (!sectionEl) return;
                const title = sectionEl.querySelector("h2");
                const desc = sectionEl.querySelector("p");
                if (title && desc) {
                    if (i > 0) {
                        gsap.set(sectionEl, { opacity: 0, visibility: "hidden" });
                    } else {
                        gsap.set(sectionEl, { opacity: 1, visibility: "visible" });
                    }
                }
            });

            const firstSection = sectionRefs.current[0];
            if (firstSection) {
                const firstTitleChars = firstSection.querySelectorAll(".title-char");
                const firstDescChars = firstSection.querySelectorAll(".desc-char");

                gsap.fromTo(firstTitleChars, { scale: 1.5, filter: "blur(10px)", opacity: 0 }, { scale: 1, filter: "blur(0px)", opacity: 1, duration: 1.1, stagger: 0.025, ease: "power2.out", delay: 0.25 });

                gsap.set(firstDescChars, { y: 15, opacity: 0, filter: "blur(4px)" });
            }

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.25,
                    onUpdate: (self) => {
                        const progress = self.progress;

                        const t = progress * 28.8;
                        const i = Math.min(Math.floor(t / 3), 9);
                        const isOdd = t % 3 >= 1.0;
                        const stepVal = Math.min(19, i * 2 + (isOdd ? 1 : 0));

                        if (stepVal !== stepRef.current) {
                            setCurrentStep(stepVal);
                        }
                        setActiveIndex((prev) => (prev !== i ? i : prev));

                        if (progressBarRef.current) {
                            gsap.set(progressBarRef.current, { scaleX: progress });
                        }
                    },
                },
            });

            gsapSections.forEach((_, i) => {
                const sectionEl = sectionRefs.current[i];
                if (!sectionEl) return;
                const title = sectionEl.querySelector("h2");
                const desc = sectionEl.querySelector("p");
                if (!title || !desc) return;

                const startHold = i * sectionDuration;
                const endHold = startHold + 2.0;

                if (i > 0) {
                    tl.to(
                        sectionEl,
                        {
                            opacity: 1,
                            visibility: "visible",
                            duration: 0.8,
                            ease: "power2.out",
                        },
                        startHold,
                    );

                    const content = sectionEl.querySelector(".content-container");
                    if (content) {
                        tl.fromTo(content, { y: 60 }, { y: 0, duration: 1.2, ease: "power2.out" }, startHold);
                    }

                    const titleChars = sectionEl.querySelectorAll(".title-char");
                    const descChars = sectionEl.querySelectorAll(".desc-char");

                    switch (i) {
                        case 1:
                            tl.fromTo(titleChars, { x: -30, rotateY: 60, opacity: 0, filter: "blur(4px)" }, { x: 0, rotateY: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, stagger: 0.02, ease: "power3.out" }, startHold);
                            break;

                        case 2:
                            tl.fromTo(titleChars, { scale: 1.6, filter: "blur(10px)", opacity: 0 }, { scale: 1, filter: "blur(0px)", opacity: 1, duration: 0.8, stagger: 0.025, ease: "power2.out" }, startHold);
                            break;

                        case 3:
                            tl.fromTo(titleChars, { scaleY: 0, opacity: 0, transformOrigin: "center bottom" }, { scaleY: 1, opacity: 1, duration: 0.7, stagger: 0.02, ease: "back.out(1.5)" }, startHold);
                            break;

                        case 4:
                            tl.fromTo(titleChars, { y: -30, opacity: 0, filter: "blur(3px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, stagger: 0.015, ease: "power4.out" }, startHold);
                            break;

                        case 5:
                            tl.fromTo(titleChars, { x: (index) => (index % 2 === 0 ? -40 : 40), opacity: 0, filter: "blur(6px)" }, { x: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, stagger: 0.02, ease: "power3.out" }, startHold);
                            break;

                        case 6:
                            tl.fromTo(titleChars, { scale: 1.8, filter: "blur(12px)", opacity: 0 }, { scale: 1, filter: "blur(0px)", opacity: 1, duration: 0.8, stagger: 0.02, ease: "power3.out" }, startHold);
                            break;

                        case 7:
                            tl.fromTo(titleChars, { y: 40, opacity: 0, skewY: 8 }, { y: 0, opacity: 1, skewY: 0, duration: 0.9, stagger: 0.02, ease: "power2.out" }, startHold);
                            break;

                        case 8:
                            tl.fromTo(titleChars, { y: 30, rotate: -15, opacity: 0, filter: "blur(5px)" }, { y: 0, rotate: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, stagger: 0.025, ease: "power2.out" }, startHold);
                            break;

                        case 9:
                            tl.fromTo(titleChars, { y: 25, scale: 0.9, opacity: 0, filter: "blur(4px)" }, { y: 0, scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.9, stagger: 0.02, ease: "power1.out" }, startHold);
                            break;
                    }

                    tl.fromTo(descChars, { y: 15, opacity: 0, filter: "blur(4px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.7, stagger: 0.006, ease: "power2.out" }, startHold + 0.9);
                }

                if (i === 0) {
                    const descChars = sectionEl.querySelectorAll(".desc-char");
                    tl.fromTo(descChars, { y: 15, opacity: 0, filter: "blur(4px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.7, stagger: 0.006, ease: "power2.out" }, 0.9);
                }

                if (i < sectionsCount - 1) {
                    tl.to(canvasProps.current, { transitionBlur: 8, duration: 0.5, ease: "power2.out" }, endHold);
                    tl.to(canvasProps.current, { transitionBlur: 0, duration: 0.5, ease: "power2.in" }, endHold + 0.5);

                    tl.to(
                        title,
                        {
                            y: i % 2 === 0 ? -120 : 120,
                            opacity: 0,
                            filter: "blur(12px)",
                            duration: 0.8,
                            ease: "power2.in",
                        },
                        endHold,
                    );

                    tl.to(
                        desc,
                        {
                            y: i % 2 === 0 ? 50 : -50,
                            opacity: 0,
                            filter: "blur(10px)",
                            duration: 0.8,
                            ease: "power2.in",
                        },
                        endHold + 0.15,
                    );

                    tl.to(
                        sectionEl,
                        {
                            opacity: 0,
                            visibility: "hidden",
                            duration: 0.8,
                            ease: "power2.in",
                        },
                        endHold + 0.15,
                    );

                    switch (i) {
                        case 0:
                            tl.to(canvasProps.current, { gridAlpha: 0, gridScale: 1.6, gridRotate: Math.PI / 3, duration: 1 }, endHold);
                            tl.to(canvasProps.current, { beamAlpha: 0.3, duration: 1 }, endHold);
                            break;
                        case 1:
                            tl.to(canvasProps.current, { beamAlpha: 0, duration: 1 }, endHold);
                            tl.to(canvasProps.current, { streamAlpha: 0.35, streamSpeed: 3.2, duration: 1 }, endHold);
                            break;
                        case 2:
                            tl.to(canvasProps.current, { streamAlpha: 0, streamSpeed: 0.4, duration: 1 }, endHold);
                            tl.to(canvasProps.current, { nodeAlpha: 0.3, duration: 1 }, endHold);
                            break;
                        case 3:
                            tl.to(canvasProps.current, { nodeAlpha: 0, duration: 1 }, endHold);
                            tl.to(canvasProps.current, { matrixAlpha: 0.28, matrixSpeed: 2.2, duration: 1 }, endHold);
                            break;
                        case 4:
                            tl.to(canvasProps.current, { matrixAlpha: 0, duration: 1 }, endHold);
                            tl.to(canvasProps.current, { pulseAlpha: 0.35, duration: 1 }, endHold);
                            break;
                        case 5:
                            tl.to(canvasProps.current, { pulseAlpha: 0, duration: 1 }, endHold);
                            tl.to(canvasProps.current, { glowSize: 1.2, duration: 1 }, endHold);
                            break;
                        case 6:
                            tl.to(canvasProps.current, { glowSize: 0, duration: 1 }, endHold);
                            tl.to(canvasProps.current, { modernGridAlpha: 0.32, noiseIntensity: 1.0, duration: 1 }, endHold);
                            break;
                        case 7:
                            tl.to(canvasProps.current, { modernGridAlpha: 0, noiseIntensity: 0.05, duration: 1 }, endHold);
                            tl.to(canvasProps.current, { sineAlpha: 0.38, sineAmplitude: 48, duration: 1 }, endHold);
                            break;
                        case 8:
                            tl.to(canvasProps.current, { sineAlpha: 0, sineAmplitude: 8, duration: 1 }, endHold);
                            tl.to(canvasProps.current, { haloAlpha: 0.55, haloSize: 1.0, duration: 1 }, endHold);
                            break;
                    }
                }
            });
        });

        return () => {
            ctx.revert();
            lenis.destroy();
            gsap.ticker.remove(onTick);
            if (resizeHandler) {
                window.removeEventListener("resize", resizeHandler);
            }
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <main ref={containerRef} className="relative bg-[#050505] w-full min-h-[1000vh] text-white selection:bg-indigo-500/20 selection:text-white overflow-x-hidden">
            <div className="fixed inset-0 w-full h-screen z-0 overflow-hidden pointer-events-none">
                <canvas ref={canvasRef} className="w-full h-full object-cover" />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none opacity-80" />
                <div className="absolute inset-0 bg-radial-gradient(ellipse_at_center,transparent_40%,#000000_100%) pointer-events-none opacity-60" />
            </div>

            <div className="fixed top-0 left-0 w-full h-[3px] bg-neutral-950/40 z-50">
                <div ref={progressBarRef} className="h-full bg-gradient-to-r from-violet-500 via-indigo-500 to-amber-400 origin-left scale-x-0" />
            </div>

            <nav className="fixed right-6 md:right-12 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-6 items-end">
                {gsapSections.map((sec, i) => (
                    <button key={i} onClick={() => handleNavClick(i)} className="group relative flex items-center justify-end h-8 focus:outline-none cursor-pointer" aria-label={`Navigate to: ${sec.title}`}>
                        <span className={cn("mr-4 text-[10px] hidden lg:block md:text-xs font-sans tracking-[0.25em] text-neutral-500 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-3 group-hover:translate-x-0 font-medium uppercase whitespace-nowrap pointer-events-none select-none", activeIndex === i && "text-white opacity-100 translate-x-0 font-bold")}>{sec.title}</span>

                        <span className={cn("w-3 h-3 rounded-full bg-neutral-700 transition-all duration-500 ease-out scale-100", activeIndex === i && "bg-[#ffffff] scale-[1.8] shadow-[0_0_15px_rgba(255,255,255,0.9)]", activeIndex !== i && "group-hover:bg-neutral-400 group-hover:scale-125")} />
                    </button>
                ))}
            </nav>

            <div ref={viewportRef} className="fixed inset-0 w-full h-screen flex items-center justify-center pointer-events-none overflow-hidden">
                {gsapSections.map((sec, i) => (
                    <div
                        key={i}
                        ref={(el) => {
                            sectionRefs.current[i] = el;
                        }}
                        className={cn("absolute inset-0 flex flex-col items-center justify-center text-center px-6 sm:px-12 md:px-20 lg:px-32 w-full h-full pointer-events-none select-none", activeIndex === i ? "opacity-100 pointer-events-auto" : "opacity-0")}
                        style={{ willChange: "transform, opacity, filter" }}
                    >
                        <div className="content-container max-w-6xl mx-auto flex flex-col items-center justify-center">
                            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter text-white leading-[0.9] uppercase select-none mb-6 sm:mb-8 font-extrabold max-w-5xl flex flex-wrap justify-center" style={{ perspective: "1200px" }}>
                                {sec.title.split(" ").map((word, wordIdx) => (
                                    <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.25em] last:mr-0">
                                        {word.split("").map((char, charIdx) => (
                                            <span key={charIdx} className="title-char inline-block origin-center" style={{ willChange: "transform, opacity, filter" }}>
                                                {char}
                                            </span>
                                        ))}
                                    </span>
                                ))}
                            </h2>

                            <p className="text-sm sm:text-base md:text-xl lg:text-2xl font-sans text-neutral-400 font-light max-w-3xl text-center leading-relaxed select-none tracking-normal mt-2 flex flex-wrap justify-center">
                                {sec.description.split(" ").map((word, wordIdx) => {
                                    const isPrefix = wordIdx < 2;
                                    const accentColor = sec.accentColor;
                                    return (
                                        <span
                                            key={wordIdx}
                                            className={cn("inline-block whitespace-nowrap mr-[0.22em] last:mr-0 transition-all duration-300", isPrefix ? "font-extrabold text-white" : "font-light text-neutral-400")}
                                            style={
                                                isPrefix
                                                    ? {
                                                          textShadow: `0 0 8px ${accentColor}, 0 0 16px ${accentColor}aa, 0 0 32px ${accentColor}55`,
                                                          fontSize: "1.12em",
                                                          lineHeight: "1.40",
                                                      }
                                                    : undefined
                                            }
                                        >
                                            {word.split("").map((char, charIdx) => (
                                                <span key={charIdx} className="desc-char inline-block" style={{ willChange: "transform, opacity, filter" }}>
                                                    {char}
                                                </span>
                                            ))}
                                        </span>
                                    );
                                })}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="absolute inset-0 w-full h-full pointer-events-none">
                {gsapSections.map((_, i) => (
                    <div key={i} className="w-full h-screen" />
                ))}
            </div>

            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
                <button
                    onClick={() => {
                        if (typeof scrolledAfterReachedLast === "function") {
                            scrolledAfterReachedLast();
                        }
                    }}
                    className="group flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-950/60 hover:bg-neutral-900/80 border border-neutral-800/40 hover:border-neutral-600/70 text-[10px] sm:text-xs font-sans tracking-[0.25em] uppercase text-neutral-300 hover:text-white transition-all duration-300 backdrop-blur-md cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.6)] active:scale-95"
                    aria-label="Skip portfolio"
                >
                    <span>Skip</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 text-neutral-400 group-hover:text-white" />
                </button>
            </div>
        </main>
    );
}
