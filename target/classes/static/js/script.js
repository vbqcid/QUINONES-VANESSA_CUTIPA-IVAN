document.addEventListener("DOMContentLoaded", function() {
    const slider = document.querySelector('.slider');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const textos = document.querySelectorAll('.texto');

    let slideIndex = 0;


    function showSlide(index) {
        const slides = document.querySelectorAll('.slider img');
        if (index >= slides.length) { slideIndex = 0; }
        if (index < 0) { slideIndex = slides.length - 1; }
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = 'none';
            textos[i].style.display = 'none';
        }
        slides[slideIndex].style.display = 'block';
        textos[slideIndex].style.display = 'block';
    }


    showSlide(slideIndex);

    // Función para avanzar a la siguiente diapositiva
    function nextSlide() {
        showSlide(++slideIndex);
    }

    // Función para retroceder a la diapositiva anterior
    function prevSlide() {
        showSlide(--slideIndex);
    }


    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Autoplay del slideshow
    setInterval(nextSlide, 7000); // Cambia la diapo cada 7 segundos
});