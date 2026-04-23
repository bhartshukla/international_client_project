
        /* ── Navbar scroll ── */
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 20);
        }, { passive: true });

        /* ── Hamburger / Mobile menu ── */
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileOverlay = document.getElementById('mobile-overlay');

        function toggleMobile(open) {
            hamburger.classList.toggle('active', open);
            mobileMenu.classList.toggle('open', open);
            mobileOverlay.classList.toggle('open', open);
            document.body.style.overflow = open ? 'hidden' : '';
        }

        hamburger.addEventListener('click', () => toggleMobile(!mobileMenu.classList.contains('open')));
        mobileOverlay.addEventListener('click', () => toggleMobile(false));

        document.querySelectorAll('.mobile-nav-link[data-target]').forEach(btn => {
            btn.addEventListener('click', () => {
                const target = document.getElementById(btn.dataset.target);
                if (target) target.classList.toggle('open');
            });
        });

        /**
         * Veridian — GSAP Scroll Reveal System
         */
        (function () {
            'use strict';

            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', init);
            } else {
                init();
            }

            function init() {
                gsap.registerPlugin(ScrollTrigger);

                const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                if (prefersReduced) return;

                const DEFAULTS = {
                    y: 80,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out',
                    stagger: 0,
                    start: 'top 85%',
                    toggleActions: 'play reverse play reverse',
                };

                function revealFrom(target, options = {}) {
                    const cfg = Object.assign({}, DEFAULTS, options);
                    const els = resolveElements(target);
                    if (!els.length) return;

                    const triggerEl = cfg.triggerEl || els[0].closest('section, .page3, .page4, .page5, .combined-section, .container, .content-layout') || els[0];

                    gsap.fromTo(
                        els,
                        { y: cfg.y, opacity: cfg.opacity },
                        {
                            y: 0,
                            opacity: 1,
                            duration: cfg.duration,
                            ease: cfg.ease,
                            stagger: cfg.stagger,
                            scrollTrigger: {
                                trigger: triggerEl,
                                start: cfg.start,
                                toggleActions: cfg.toggleActions,
                            },
                        }
                    );
                }

                function revealAll() {
                    const allReveal = document.querySelectorAll('.reveal');
                    if (!allReveal.length) return;

                    const groups = new Map();
                    allReveal.forEach(el => {
                        const key = el.parentElement;
                        if (!groups.has(key)) groups.set(key, []);
                        groups.get(key).push(el);
                    });

                    groups.forEach((els, parent) => {
                        const isMany = els.length > 1;
                        revealFrom(els, { stagger: isMany ? 0.13 : 0, triggerEl: parent });
                    });
                }

                function revealSections() {
                    /* VIDEO SECTION */
                    revealFrom('.video-eyebrow', { triggerEl: '#video-section', y: 40, duration: 0.8, start: 'top 80%' });
                    revealFrom('.video-headline', { triggerEl: '#video-section', y: 80, duration: 1.1, start: 'top 80%' });
                    revealFrom('.video-desc', { triggerEl: '#video-section', y: 60, duration: 0.95, start: 'top 80%' });
                    revealFrom('.video-actions > *', { triggerEl: '#video-section', y: 50, duration: 0.85, stagger: 0.12, start: 'top 80%' });
                    revealFrom('.video-stat-item', { triggerEl: '.video-stats', y: 30, duration: 0.7, stagger: 0.14, start: 'top 92%' });

                    /* HERO SECTION */
                    revealFrom('.hero-headline .line', { triggerEl: '#hero', y: 60, duration: 0.9, stagger: 0.1, start: 'top 82%' });
                    revealFrom('.hero-desc', { triggerEl: '#hero', y: 50, duration: 0.85, start: 'top 82%' });
                    revealFrom('.hero-actions > *', { triggerEl: '#hero', y: 40, duration: 0.8, stagger: 0.12, start: 'top 82%' });
                    gsap.fromTo('.hero-visual',
                        { x: 50, opacity: 0 },
                        { x: 0, opacity: 1, duration: 1.15, ease: 'power3.out', scrollTrigger: { trigger: '#hero', start: 'top 82%', toggleActions: 'play reverse play reverse' } }
                    );
                    revealFrom('.floating-tag', { triggerEl: '.hero-visual', y: 20, duration: 0.7, stagger: 0.18, start: 'top 88%' });

                    /* PAGE 3 */
                    revealFrom('.page3_title h1', { triggerEl: '.page3_title', y: 80, duration: 1, start: 'top 85%' });
                    revealFrom('.page3_info', { triggerEl: '.page3_info_wrap', y: 60, duration: 0.85, stagger: 0.13, start: 'top 85%' });
                    revealFrom('.page3_cards .card', { triggerEl: '.page3_cards', y: 80, duration: 0.9, stagger: 0.15, start: 'top 85%' });

                    /* PAGE 4 */
                    revealFrom('.page4_header h1', { triggerEl: '.page4_header', y: 70, duration: 1, start: 'top 85%' });
                    revealFrom('.page4_header p', { triggerEl: '.page4_header', y: 50, duration: 0.9, start: 'top 85%' });
                    revealFrom('.page4_card', { triggerEl: '.page4_grid', y: 80, duration: 0.9, stagger: 0.14, start: 'top 85%' });

                    /* COMBINED SECTION — Left side: slide from left */
                    gsap.fromTo('#bio-assets-side .section-eyebrow',
                        { x: -50, opacity: 0 },
                        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '#combined-section', start: 'top 82%', toggleActions: 'play reverse play reverse' } }
                    );
                    gsap.fromTo('.bio-assets-title',
                        { x: -60, opacity: 0 },
                        { x: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '#combined-section', start: 'top 82%', toggleActions: 'play reverse play reverse' } }
                    );
                    gsap.fromTo('.bio-assets-desc',
                        { x: -50, opacity: 0 },
                        { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '#combined-section', start: 'top 82%', toggleActions: 'play reverse play reverse' } }
                    );
                    /* Bio cards — stagger from bottom */
                    revealFrom('.bio-card', { triggerEl: '.bio-cards-grid', y: 60, duration: 0.85, stagger: 0.12, start: 'top 88%' });

                    /* COMBINED SECTION — Right side: slide from right */
                    gsap.fromTo('#why-molmet-side .section-eyebrow',
                        { x: 50, opacity: 0 },
                        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '#combined-section', start: 'top 82%', toggleActions: 'play reverse play reverse' } }
                    );
                    gsap.fromTo('.why-molmet-title',
                        { x: 60, opacity: 0 },
                        { x: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '#combined-section', start: 'top 82%', toggleActions: 'play reverse play reverse' } }
                    );
                    gsap.fromTo('.why-molmet-subtitle',
                        { x: 50, opacity: 0 },
                        { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '#combined-section', start: 'top 82%', toggleActions: 'play reverse play reverse' } }
                    );
                    revealFrom('.why-point', { triggerEl: '.why-points-list', y: 40, duration: 0.8, stagger: 0.1, start: 'top 88%' });

                    /* PAGE 5 */
                    revealFrom('.reveal-text', { triggerEl: '.page5', y: 80, duration: 1.2, start: 'top 80%' });
                    revealFrom('.reveal-btn', { triggerEl: '.page5', y: 50, duration: 1, start: 'top 80%' });

                    /* BOTTOM CONTENT LAYOUT */
                    revealFrom('.bottom-text', { triggerEl: '.content-layout', y: 60, duration: 1, start: 'top 85%' });
                    revealFrom('.bottom-sub', { triggerEl: '.content-layout', y: 40, duration: 0.8, start: 'top 85%' });
                    revealFrom('.video-side', { triggerEl: '.content-layout', y: 50, duration: 1, start: 'top 85%' });
                }

                function initCardHover() {
                    document.querySelectorAll('.page3_cards .card, .page4_card').forEach(card => {
                        card.addEventListener('mouseenter', () =>
                            gsap.to(card, { y: -10, scale: 1.03, duration: 0.35, ease: 'power3.out' })
                        );
                        card.addEventListener('mouseleave', () =>
                            gsap.to(card, { y: 0, scale: 1, duration: 0.35, ease: 'power3.out' })
                        );
                    });

                    /* Bio cards hover via GSAP */
                    document.querySelectorAll('.bio-card').forEach(card => {
                        card.addEventListener('mouseenter', () =>
                            gsap.to(card, { y: -8, scale: 1.02, duration: 0.3, ease: 'power3.out' })
                        );
                        card.addEventListener('mouseleave', () =>
                            gsap.to(card, { y: 0, scale: 1, duration: 0.3, ease: 'power3.out' })
                        );
                    });
                }

                function resolveElements(target) {
                    if (typeof target === 'string') return [...document.querySelectorAll(target)];
                    if (target instanceof Element) return [target];
                    if (target instanceof NodeList || Array.isArray(target)) return [...target];
                    return [];
                }

                revealAll();
                revealSections();
                initCardHover();

                window.VeridianReveal = { revealFrom };
            }
        }());
    