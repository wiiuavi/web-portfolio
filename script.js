const myProjects = [
    {
        title: "OGminigames",
        description: "A small plugin that I made to assist me in the revival of Minecraft's old console minigames!",
        url: "#",
        shadowColor: "rgba(143, 62, 180, 0.651)"
    },
    {
        title: "Chair guardian",
        description: "Small basic (yet handy) motion detection program to make sure noone steals my chair.",
        url: "https://github.com/Nishchay-Bhudia/Intelligent-Office-Surveillance-System",
        shadowColor: "rgba(80, 160, 255, 0.651)"
    },
    {
        title: "CV",
        description: "Not really a project, but its ntd.",
        url: "#",
        shadowColor: "rgba(139, 56, 56, 0.651)"
    },
    {
        title: "Example proj",
        description: "for any more things ill add here.",
        url: "#",
        shadowColor: "rgba(139, 56, 56, 0.651)"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.getElementById('projects-container');
    
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
        projectsContainer.appendChild(linkWrapper);
    });

    const heroImages = ['media/heroimg1.png', 'media/heroimg2.png']; 
    const slideshowContainer = document.getElementById('hero-slideshow');
    
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

    const navbar = document.querySelector('.navbar');
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

    const scrollZone = document.querySelector('.scroll-zone'); 

    if (navbar) {
        const onScroll = () => {
            const scrollY = window.scrollY;
            let isInZone = false;
            
            if (scrollZone) {
                const rect = scrollZone.getBoundingClientRect();
                if (rect.top <= 0) isInZone = true;
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
                    card.classList.add('hover-active');
                } else {
                    card.classList.remove('hover-active');
                }
            });
        }, observerOptions);

        hoverTargets.forEach(target => middleObserver.observe(target));
    }

    const glowText = document.querySelector('.glow-text');
    if (glowText) {
        const glowObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.5 }); 

        glowObserver.observe(glowText);
    }

    const canvas = document.getElementById("animation-canvas");
    if (canvas && scrollZone) {
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
            const rect = scrollZone.getBoundingClientRect();
            const totalScrollable = scrollZone.scrollHeight - window.innerHeight;
            const scrolledInsideZone = -rect.top;

            let scrollPercent = scrolledInsideZone / totalScrollable;
            scrollPercent = Math.max(0, Math.min(0.99, scrollPercent));
            
            const frameIndex = Math.floor(scrollPercent * totalFrames);

            requestAnimationFrame(() => {
                if (images[frameIndex]) {
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    context.drawImage(images[frameIndex], 0, 0);
                }
            });
        });
    }
});