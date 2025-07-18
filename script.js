function sendEmail() {
    const name = document.getElementById('name').value;
    const projectTitle = document.getElementById('projectTitle').value;
    const message = document.getElementById('message').value;

    if (!name || !projectTitle || !message) {
        alert("Por favor, preencha todos os campos.");
        return; 
    }

    const subject = encodeURIComponent(`Fale Conosco: ${projectTitle}`);
    const body = encodeURIComponent(`Nome: ${name}\n\nMensagem: ${message}`);

    window.location.href = `mailto:?subject=${subject}&body=${body}`;
}

let currentCategory = 'cakes';
let currentPage = 1;
const itemsPerPage = 6; 
let totalItems = 0; 

function filterCategory(category) {
    const images = document.querySelectorAll('.gallery img');
    totalItems = 0; 

    images.forEach(img => {
        if (img.getAttribute('data-category') === category) {
            img.style.display = 'block'; 
            totalItems++; 
        } else {
            img.style.display = 'none'; 
        }
    });
}

function paginateGallery() {
    const images = document.querySelectorAll('.gallery img');
    const categoryImages = Array.from(images).filter(img => img.getAttribute('data-category') === currentCategory);
    
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    let startIndex = (currentPage - 1) * itemsPerPage;
    let endIndex = startIndex + itemsPerPage;

    categoryImages.forEach((img, index) => {
        if (index >= startIndex && index < endIndex) {
            img.style.display = 'block'; 
        } else {
            img.style.display = 'none'; 
        }
    });

    document.getElementById('prev').style.display = currentPage > 1 ? 'inline-block' : 'none';
    document.getElementById('next').style.display = currentPage < totalPages ? 'inline-block' : 'none';
}

document.querySelectorAll('.catalogo nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelectorAll('.catalogo nav a').forEach(a => a.classList.remove('active'));
        this.classList.add('active');
        
        currentCategory = this.getAttribute('href').substring(1);
        currentPage = 1; 
        filterCategory(currentCategory);
        paginateGallery();
    });
});

document.getElementById('prev').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        paginateGallery();
    }
});

document.getElementById('next').addEventListener('click', () => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        paginateGallery();
    }
});

filterCategory(currentCategory);
paginateGallery();

document.getElementById('orderButton').addEventListener('click', () => {
    alert('Pedido realizado!');
});

document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carrossel-track');
    const slides = Array.from(document.querySelectorAll('.comentario-slide'));
    const dots = Array.from(document.querySelectorAll('.carrossel-indicador'));
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    let currentIdx = 0;
    let autoSlideInterval;
    const slideInterval = 5000; 


    initCarrossel();

    function initCarrossel() {
        updateSlide(); 
        startAutoSlide();

        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);

        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => goToSlide(idx));
        });
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, slideInterval);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    function updateSlide() {
        track.style.transform = `translateX(-${currentIdx * 100}%)`; 
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentIdx);
        });
    }

    function prevSlide() {
        currentIdx = (currentIdx - 1 + slides.length) % slides.length;
        updateSlide();
        resetAutoSlide();
    }

    function nextSlide() {
        currentIdx = (currentIdx + 1) % slides.length;
        updateSlide();
        resetAutoSlide();
    }

    function goToSlide(idx) {
        currentIdx = idx;
        updateSlide();
        resetAutoSlide();
    }

    track.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    track.addEventListener('mouseleave', () => {
        startAutoSlide();
    });

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            sendEmail(); 
        });
    }
});
