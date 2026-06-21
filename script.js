// waitinf for html/js to connect
document.addEventListener('DOMContentLoaded', () => {
    const actionBtn = document.getElementById('action-btn');
    if (actionBtn) {
        actionBtn.addEventListener('click', () => {
            alert('hi :|');
        });
    }

    // navbar fadein
    const navbar = document.querySelector('.navbar');
    
    // ===============

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

            // Fade in 
            if (scrollY > 20 && !isInZone) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

        };


        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    //todo - collapse bookmarklets on small devices/large zoom


    const canvas = document.getElementById("animation-canvas");
    const context = canvas.getContext("2d");

    // I TOOK MOST OF THIS FROM STACK OVERFLOW!!!
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
    });
    });
});