const hoverSound = new Audio('media/MChover.mp3');
const clickSound = new Audio('media/MCclick.mp3');

const playSound = (audio) => {
    const soundClone = audio.cloneNode(true);
    soundClone.play().catch(() => {
    });
};

const myProjects = [
    {
        title: "OGminigames",
        description: "A small plugin that I made to assist me in the revival of Minecraft's old console minigames! (This will lead nowhere, is private for now)",
        url: "#",
        shadowColor: "rgba(143, 62, 180, 0.651)"
    },
    {
        title: "Chair guardian",
        description: "Small basic (yet handy) motion detection program to make sure noone steals my chair.",
        url: "https://github.com/Nishchay-Bhudia/Intelligent-Office-Surveillance-System",
        shadowColor: "rgba(80, 255, 80, 0.65)"
    },
    {
        title: "CV",
        description: "Not really a project, but its ntd. (This will lead nowhere)",
        url: "#",
        shadowColor: "rgba(139, 56, 56, 0.651)"
    },
    {
        title: "MyEyesOnly",
        description: "A file encryption/splitting software, to make it easier to upload things securely online",
        url: "https://github.com/wiiuavi/MyEyesOnly",
        shadowColor: "rgba(30, 177, 182, 0.65)"
    },
    {
        title: "HopefullySecureP2P",
        description: "A python chatbox program, encrypting messages when talking to anyone on the network. This lay the foundation for MyEyesOnly",
        url: "https://github.com/wiiuavi/hopefully-secure-P2P",
        shadowColor: "rgba(233, 0, 0, 0.65)"
    },
    {
        title: "RestarauntModernizer",
        description: "Project to make it very easy for restaraunts to implement their own digital menu system using QR codes!",
        url: "https://github.com/wiiuavi/hopefully-secure-P2P",
        shadowColor: "rgba(0, 247, 255, 0.65)"
    },
    {
        title: "InventoryTab",
        description: "This chrome extension turns your new-tab into a minecraft inventory! with more than 30 bookmark slots, you can carry every website you need!",
        url: "https://github.com/wiiuavi/hopefully-secure-P2P",
        shadowColor: "rgba(30, 40, 182, 0.65)"
    },
    {
        title: "MyPortfolio",
        description: "The github repo behind this very site!",
        url: "https://github.com/wiiuavi/web-portfolio",
        shadowColor: "rgba(233, 22, 222, 0.65)"
    },
    {
        title: "Example proj",
        description: "for any more things ill add here. (This will lead nowhere)",
        url: "#",
        shadowColor: "rgba(139, 56, 56, 0.651)"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
        myProjects.forEach(proj => {
            const linkWrapper = document.createElement('a');
            linkWrapper.href = proj.url;
            linkWrapper.className = 'project-card-link mobile-hover-target';
            
            linkWrapper.innerHTML = `
                <div class="project-card" style="--hover-shadow: ${proj.shadowColor};">
                    <h3>${proj.title}</h3>
                    <p>${proj.description}</p>
                </div>
            `;

            linkWrapper.addEventListener('mouseenter', () => playSound(hoverSound));
            linkWrapper.addEventListener('click', () => playSound(clickSound));

            projectsContainer.appendChild(linkWrapper);
        });
    }

    const interactiveElements = document.querySelectorAll('.nav-links a, #hamburger, .contact-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => playSound(hoverSound));
        el.addEventListener('click', () => playSound(clickSound));
    });

    const heroImages = ['media/heroimg1.png', 'media/heroimg2.png']; 
    const slideshowContainer = document.getElementById('hero-slideshow');
    if (slideshowContainer) {
        heroImages.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Hero Slide ${index + 1}`; 

            if(index === 0) img.classList.add('active');
            slideshowContainer.appendChild(img);
        });

        let currentSlide = 0;
        const slides = slideshowContainer.querySelectorAll('img');
        if (slides.length > 1) {
            setInterval(() => {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].classList.add('active');
            }, 4000);
        }
    }

    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    if (window.innerWidth <= 768) {
        const hoverTargets = document.querySelectorAll('.mobile-hover-target');
        const observerOptions = {
            root: null,
            rootMargin: '-40% 0px -40% 0px', 
            threshold: 0
        };
        const middleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const card = entry.target.querySelector('.project-card') || entry.target; 
                
                if (entry.isIntersecting) {
                    if (!card.classList.contains('hover-active')) {
                        playSound(hoverSound);
                    }
                    card.classList.add('hover-active');
                } else {
                    card.classList.remove('hover-active');
                }
            });
        }, observerOptions);
        hoverTargets.forEach(target => middleObserver.observe(target));
    }

    const navbar = document.querySelector('.navbar');
    const zone = document.querySelector('.scroll-zone'); 

    if (navbar) {
        const onScroll = () => {
            const scrollY = window.scrollY;
            let isInZone = false;
            if (zone) {
                const rect = zone.getBoundingClientRect();
                if (rect.top <= 0) {
                    isInZone = true;
                }
            }
            if (scrollY > 20 && !isInZone) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    const canvas = document.getElementById("animation-canvas");
    if (canvas && zone) {
        const context = canvas.getContext("2d");
        canvas.width = 1280;
        canvas.height = 720;
        context.imageSmoothingEnabled = false; 

        const totalFrames = 85; 
        const currentFrame = index => `./media/frames/ezgif-frame-${index.toString().padStart(3, '0')}.png`;
        const images = [];
        let loadedImagesCount = 0;

        for (let i = 1; i <= totalFrames; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            img.onload = () => {
                loadedImagesCount++;
                if (loadedImagesCount === totalFrames) {
                    context.drawImage(images[0], 0, 0);
                }
            };
            images.push(img);
        }

        window.addEventListener('scroll', () => {
            if (!zone) return;

            const rect = zone.getBoundingClientRect();
            const totalScrollable = zone.scrollHeight - window.innerHeight;
            const scrolledInsideZone = -rect.top;

            let scrollPercent = scrolledInsideZone / totalScrollable;
            scrollPercent = Math.max(0, Math.min(0.99, scrollPercent));

            const frameIndex = Math.floor(scrollPercent * totalFrames);

            requestAnimationFrame(() => {
                if (images[frameIndex]) {
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    context.drawImage(images[frameIndex], 0, 0);
                }

                const endOverlay = document.getElementById('end-overlay');
                const glowText = document.getElementById('glow-text');

                if (endOverlay && glowText) {
                    if (frameIndex >= (totalFrames - 10)) {
                        endOverlay.classList.add('visible');
                        glowText.classList.add('animate-in');
                    } else {
                        endOverlay.classList.remove('visible');
                        glowText.classList.remove('animate-in');
                    }
                }
            });
        });
    }
});