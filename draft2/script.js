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
    if (navbar) {
        const onScroll = () => {
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };

        // set initial state and listen
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }
});
            
