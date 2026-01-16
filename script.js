// Cursor glow effect
const cursorGlow = document.querySelector('.cursor-glow');

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// Scroll animations with Intersection Observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in-up class to elements and observe them
document.querySelectorAll('.project-card, .stat, .about-text, .contact-content').forEach(el => {
    el.classList.add('fade-in-up');
    observer.observe(el);
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        nav.style.background = 'rgba(10, 10, 11, 0.9)';
        nav.style.backdropFilter = 'blur(10px)';
    } else {
        nav.style.background = 'linear-gradient(to bottom, rgba(10, 10, 11, 1) 0%, transparent 100%)';
        nav.style.backdropFilter = 'none';
    }

    lastScroll = currentScroll;
});

// Stagger animation for project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// Hide scroll indicator after scrolling
const scrollIndicator = document.querySelector('.scroll-indicator');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        scrollIndicator.style.opacity = '0';
    } else {
        scrollIndicator.style.opacity = '1';
    }
}, { passive: true });

// ==========================================
// BenOS Command Palette
// ==========================================
(function() {
    'use strict';

    const CONFIG = {
        linkedInUrl: 'https://www.linkedin.com/in/benjohnson4/',
        email: 'ben@inthefuture.io'
    };

    const COMMANDS = [
        {
            id: 'work',
            title: 'Jump to Work',
            description: 'View selected projects',
            icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
            action: () => {
                document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
                closePalette();
            },
            keywords: ['projects', 'portfolio', 'work', 'scroll']
        },
        {
            id: 'email',
            title: 'Email Ben',
            description: CONFIG.email,
            icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
            action: () => {
                window.location.href = `mailto:${CONFIG.email}`;
                closePalette();
            },
            keywords: ['contact', 'message', 'mail', 'email']
        },
        {
            id: 'linkedin',
            title: 'Copy LinkedIn',
            description: 'Copy profile URL to clipboard',
            icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,
            action: async () => {
                await copyToClipboard(CONFIG.linkedInUrl);
                showToast('LinkedIn URL copied!');
                closePalette();
            },
            keywords: ['social', 'profile', 'linkedin', 'copy', 'clipboard']
        },
        {
            id: 'about',
            title: 'Jump to About',
            description: 'Learn more about me',
            icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,
            action: () => {
                document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
                closePalette();
            },
            keywords: ['bio', 'about', 'info', 'background']
        },
        {
            id: 'contact',
            title: 'Jump to Contact',
            description: 'Get in touch',
            icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
            action: () => {
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                closePalette();
            },
            keywords: ['contact', 'reach', 'talk']
        },
        {
            id: 'surprise',
            title: 'Surprise Me',
            description: 'Something fun...',
            icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
            action: () => {
                triggerSurprise();
                closePalette();
            },
            keywords: ['fun', 'surprise', 'easter', 'random']
        }
    ];

    const EASTER_EGG_TRIGGERS = ['help', 'roadmap', 'ship', 'changelog', 'release', 'notes'];

    const RELEASE_NOTES = [
        {
            version: '6.0.0',
            date: '2023 - Present',
            name: 'RapidSOS Era',
            description: 'Leading product for the unified public safety platform. Shipped AI-powered emergency response features, scaled platform to support 1B+ emergencies.',
            tags: ['AI/ML', 'Public Safety', 'Scale']
        },
        {
            version: '5.0.0',
            date: '2020 - 2023',
            name: 'Boston Dynamics',
            description: 'Launched Spot robot products to enterprise customers. Built the digital experience for 1,500+ robots deployed worldwide.',
            tags: ['Robotics', 'IoT', 'Enterprise']
        },
        {
            version: '4.0.0',
            date: '2018 - 2020',
            name: 'Six Flags',
            description: 'Transformed guest experience for 40M annual visitors. Shipped mobile apps, in-park navigation, and digital experiences.',
            tags: ['Consumer', 'Mobile', 'Experience']
        },
        {
            version: '3.0.0',
            date: '2015 - 2018',
            name: 'Agency Era',
            description: 'Built products for major clients including Pelotonia ($340M+ raised), Dubai Fitness Challenge, and BlindWays with Perkins School.',
            tags: ['Nonprofit', 'Impact', 'Accessibility']
        },
        {
            version: '2.0.0',
            date: '2010 - 2015',
            name: 'Foundation',
            description: 'Learned the craft. Built countless web and mobile apps. Discovered that great products come from great teams.',
            tags: ['Learning', 'Growth', 'Engineering']
        },
        {
            version: '1.0.0',
            date: 'Initial Release',
            name: 'Hello World',
            description: 'Born curious. Started building things.',
            tags: ['Origin']
        }
    ];

    let palette, backdrop, input, results, commandsView, releaseNotesView;
    let selectedIndex = 0;
    let filteredCommands = [...COMMANDS];
    let isOpen = false;

    function init() {
        palette = document.getElementById('benos-palette');
        if (!palette) return;

        backdrop = palette.querySelector('.benos-backdrop');
        input = document.getElementById('benos-input');
        results = document.getElementById('benos-results');
        commandsView = palette.querySelector('[data-view="commands"]');
        releaseNotesView = palette.querySelector('[data-view="release-notes"]');

        setupEventListeners();
        renderCommands();
        renderReleaseNotes();
    }

    function setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                togglePalette();
            }
            if (isOpen && e.key === 'Escape') {
                e.preventDefault();
                closePalette();
            }
        });

        backdrop.addEventListener('click', closePalette);
        input.addEventListener('input', handleInput);
        input.addEventListener('keydown', handleInputKeydown);

        const backBtn = palette.querySelector('.benos-back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', showCommandsView);
        }
    }

    function togglePalette() {
        isOpen ? closePalette() : openPalette();
    }

    function openPalette() {
        isOpen = true;
        palette.classList.add('is-open');
        palette.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        showCommandsView();
        input.value = '';
        filteredCommands = [...COMMANDS];
        selectedIndex = 0;
        renderCommands();

        setTimeout(() => input.focus(), 100);
    }

    function closePalette() {
        isOpen = false;
        palette.classList.remove('is-open');
        palette.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function handleInput(e) {
        const query = e.target.value.toLowerCase().trim();

        if (EASTER_EGG_TRIGGERS.includes(query)) {
            showReleaseNotesView();
            return;
        }

        if (query === '') {
            filteredCommands = [...COMMANDS];
        } else {
            filteredCommands = COMMANDS.filter(cmd => {
                const searchText = `${cmd.title} ${cmd.description} ${cmd.keywords.join(' ')}`.toLowerCase();
                return searchText.includes(query);
            });
        }

        selectedIndex = 0;
        renderCommands();
    }

    function handleInputKeydown(e) {
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                selectedIndex = Math.min(selectedIndex + 1, filteredCommands.length - 1);
                renderCommands();
                scrollSelectedIntoView();
                break;
            case 'ArrowUp':
                e.preventDefault();
                selectedIndex = Math.max(selectedIndex - 1, 0);
                renderCommands();
                scrollSelectedIntoView();
                break;
            case 'Enter':
                e.preventDefault();
                if (filteredCommands[selectedIndex]) {
                    filteredCommands[selectedIndex].action();
                }
                break;
        }
    }

    function scrollSelectedIntoView() {
        const selected = results.querySelector('.is-selected');
        if (selected) {
            selected.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
    }

    function renderCommands() {
        if (filteredCommands.length === 0) {
            results.innerHTML = `<div class="benos-no-results"><p>No commands found</p></div>`;
            return;
        }

        results.innerHTML = filteredCommands.map((cmd, index) => `
            <div class="benos-result ${index === selectedIndex ? 'is-selected' : ''}"
                 data-command-id="${cmd.id}"
                 role="option"
                 aria-selected="${index === selectedIndex}">
                <div class="benos-result-icon">${cmd.icon}</div>
                <div class="benos-result-content">
                    <div class="benos-result-title">${cmd.title}</div>
                    <div class="benos-result-description">${cmd.description}</div>
                </div>
            </div>
        `).join('');

        results.querySelectorAll('.benos-result').forEach((el, index) => {
            el.addEventListener('click', () => filteredCommands[index].action());
            el.addEventListener('mouseenter', () => {
                selectedIndex = index;
                renderCommands();
            });
        });
    }

    function renderReleaseNotes() {
        const content = document.getElementById('benos-release-content');
        if (!content) return;

        content.innerHTML = RELEASE_NOTES.map(release => `
            <div class="benos-release-entry">
                <div class="benos-release-version">
                    <span>v${release.version}</span>
                    <time>${release.date}</time>
                </div>
                <h3 class="benos-release-name">${release.name}</h3>
                <p class="benos-release-description">${release.description}</p>
                <div class="benos-release-tags">
                    ${release.tags.map(tag => `<span class="benos-release-tag">${tag}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }

    function showCommandsView() {
        releaseNotesView.classList.remove('is-active');
        commandsView.classList.add('is-active');
        input.focus();
    }

    function showReleaseNotesView() {
        commandsView.classList.remove('is-active');
        releaseNotesView.classList.add('is-active');
    }

    async function copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        }
    }

    function showToast(message) {
        const existingToast = document.querySelector('.benos-toast');
        if (existingToast) existingToast.remove();

        const toast = document.createElement('div');
        toast.className = 'benos-toast';
        toast.textContent = message;
        document.body.appendChild(toast);

        requestAnimationFrame(() => toast.classList.add('is-visible'));

        setTimeout(() => {
            toast.classList.remove('is-visible');
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }

    function triggerSurprise() {
        const surprises = [
            () => {
                showToast('You found a secret!');
                document.body.classList.add('benos-party');
                setTimeout(() => document.body.classList.remove('benos-party'), 3000);
            },
            () => {
                const avatar = document.querySelector('.avatar-container');
                if (avatar) {
                    avatar.style.transition = 'transform 1s ease';
                    avatar.style.transform = 'rotate(360deg)';
                    setTimeout(() => avatar.style.transform = '', 1000);
                }
                showToast('Wheee!');
            },
            () => {
                document.documentElement.style.setProperty('--color-accent', '#10b981');
                document.documentElement.style.setProperty('--color-accent-light', '#34d399');
                showToast('New color scheme!');
                setTimeout(() => {
                    document.documentElement.style.setProperty('--color-accent', '#6366f1');
                    document.documentElement.style.setProperty('--color-accent-light', '#818cf8');
                }, 5000);
            },
            () => {
                console.log('%c Thanks for exploring! ', 'background: #6366f1; color: white; font-size: 20px; padding: 10px;');
                showToast('Check the console ;)');
            }
        ];

        surprises[Math.floor(Math.random() * surprises.length)]();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
