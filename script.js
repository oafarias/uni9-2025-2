$(document).ready(function() {
    const sections = $('section');
    const navItems = $('.nav-item');
    const header = $('header');

    // Função para destacar o menu ativo e adicionar sombra no header
    $(window).on('scroll', function () {
        const scrollPosition = $(window).scrollTop();

        // Adiciona ou remove a sombra do header
        if (scrollPosition > 10) {
            header.css('box-shadow', '0px 2px 10px rgba(0, 0, 0, 0.1)');
        } else {
            header.css('box-shadow', 'none');
        }

        // Determina a seção ativa
        let activeSectionIndex = 0;
        sections.each(function(i) {
            const section = $(this);
            const sectionTop = section.offset().top - header.outerHeight();
            const sectionBottom = sectionTop + section.outerHeight();

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSectionIndex = i;
                return false; // Sai do loop 'each'
            }
        });

        // Remove a classe 'active' de todos e adiciona na seção correta
        navItems.removeClass('active');
        $(navItems[activeSectionIndex]).addClass('active');
    });

    // Configuração geral do ScrollReveal
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1500,
        delay: 200,
        reset: false // A animação ocorrerá apenas uma vez
    });

    // Aplicando animações aos elementos originais
    sr.reveal('#cta', { origin: 'left' });
    sr.reveal('#banner', { origin: 'right', delay: 400 });
    sr.reveal('#locals .local', { interval: 300 });
    sr.reveal('#avaliacoes_content .feedback', { interval: 300 });

});