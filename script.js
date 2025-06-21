document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica para o Menu Hamburger ---
    const hamburger = document.querySelector('.hamburger-menu');
    const navList = document.querySelector('.main-nav .nav-list');

    if (hamburger && navList) {
        hamburger.addEventListener('click', () => {
            navList.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Fecha o menu hamburger se um link for clicado (para mobile)
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    hamburger.classList.remove('active'); // Desativa o X
                }
            });
        });

        // Fecha o menu hamburger e reseta o ícone ao redimensionar a tela
        // (Assume que o breakpoint para esconder o menu é 768px, ajuste se necessário)
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    }

    // --- Lógica para o Carrossel de Imagens ---
    const carouselImages = document.querySelectorAll('.hero-section .carousel-image');
    const carouselDots = document.querySelectorAll('.carousel-dots .dot');
    const carouselContainer = document.querySelector('.hero-section .carousel-container');

    // Só inicializa o carrossel se houver mais de uma imagem
    if (carouselImages.length > 1) {
        let currentIndex = 0;
        const intervalTime = 4000; // 4 segundos para troca automática
        let autoSlideInterval; // Variável para armazenar o ID do intervalo

        function showImage(index) {
            // Remove 'active' de todas as imagens e dots
            carouselImages.forEach(img => img.classList.remove('active'));
            carouselDots.forEach(dot => dot.classList.remove('active'));

            // Adiciona 'active' à imagem e dot corretos
            carouselImages[index].classList.add('active');
            carouselDots[index].classList.add('active');
        }

        function nextImage() {
            currentIndex++;
            if (currentIndex >= carouselImages.length) {
                currentIndex = 0; // Volta para a primeira imagem
            }
            showImage(currentIndex);
        }

        function prevImage() {
            currentIndex--; // Não está sendo usado atualmente, mas útil se adicionar botões de navegação
            if (currentIndex < 0) {
                currentIndex = carouselImages.length - 1; // Vai para a última imagem
            }
            showImage(currentIndex);
        }

        // Função para reiniciar o slide automático
        function startAutoSlide() {
            // Limpa qualquer intervalo existente para evitar múltiplos auto-slides
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(nextImage, intervalTime);
        }

        // Inicializa o carrossel na primeira imagem e inicia o auto-slide
        showImage(currentIndex);
        startAutoSlide();

        // Adiciona funcionalidade aos dots
        carouselDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index; // Define o índice da imagem para o dot clicado
                showImage(currentIndex);
                startAutoSlide(); // Reinicia o auto-slide ao clicar no dot
            });
        });

        // Pausar o auto-slide ao passar o mouse sobre o carrossel
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => {
                clearInterval(autoSlideInterval);
            });

            carouselContainer.addEventListener('mouseleave', () => {
                startAutoSlide();
            });
        }

    } else if (carouselImages.length === 1) {
        // Se houver apenas uma imagem, apenas a exibe e esconde os dots
        carouselImages[0].classList.add('active');
        if (carouselDots.length > 0) {
            carouselDots.forEach(dot => dot.style.display = 'none');
        }
    }

// --- Lógica para o Botão "Voltar ao Topo" ---
const backToTopButton = document.querySelector('.back-to-top');

if (backToTopButton) { // Garante que o botão existe no HTML
    // Mostra ou esconde o botão baseado na posição da rolagem
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Mostra o botão após rolar 300px
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    // Rolagem suave ao clicar no botão
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault(); // Evita o comportamento padrão do link (#)
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Faz a rolagem suave
        });
    });
}


});