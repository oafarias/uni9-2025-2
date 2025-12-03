$(document).ready(function() {
    const sections = $('section');
    const navItems = $('.nav-item');
    const header = $('header');

    // --- Sua Lógica Original de Scroll ---
    $(window).on('scroll', function () {
        const scrollPosition = $(window).scrollTop();
        if (scrollPosition > 10) {
            header.css('box-shadow', '0px 2px 10px rgba(0, 0, 0, 0.1)');
        } else {
            header.css('box-shadow', 'none');
        }

        let activeSectionIndex = 0;
        sections.each(function(i) {
            const section = $(this);
            const sectionTop = section.offset().top - header.outerHeight();
            const sectionBottom = sectionTop + section.outerHeight();
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSectionIndex = i;
                return false;
            }
        });
        navItems.removeClass('active');
        $(navItems[activeSectionIndex]).addClass('active');
    });

    const sr = ScrollReveal({
        origin: 'bottom', distance: '60px', duration: 1500, delay: 200, reset: false
    });
    sr.reveal('#cta', { origin: 'left' });
    sr.reveal('#banner', { origin: 'right', delay: 400 });
    sr.reveal('#locals .local', { interval: 300 });
    sr.reveal('#avaliacoes_content .feedback', { interval: 300 });

    // --- NOVA LÓGICA DO PROJETO (MODAL + SQL) ---
    const modal = $('#modal-overlay');
    
    // Abre o modal ao clicar em qualquer botão de agendar
    $('#btn-agendar-nav, #btn-agendar-hero').on('click', function(e) {
        e.preventDefault();
        modal.addClass('open');
    });

    // Fecha o modal
    $('.close-modal').on('click', function() {
        modal.removeClass('open');
    });

    // Simula o envio pro Banco de Dados
    $('#agendamento-form').on('submit', function(e) {
        e.preventDefault();
        
        const nome = $('#nome').val();
        const servico = $('#servico').val();
        const dentista = $('#dentista').val();
        const data = $('#data').val().replace('T', ' ');

        // Gerando o comando SQL para mostrar pro professor
        const sqlQuery = `INSERT INTO AGENDAMENTOS (paciente_nome, servico_id, dentista_id, data_inicio, status) VALUES ('${nome}', ${servico}, ${dentista}, '${data}', 'Pendente');`;

        console.log("%c[SIMULAÇÃO SQL] Executando no Servidor...", "color: blue; font-weight: bold;");
        console.log(sqlQuery);
        
        alert("Agendamento enviado! Verifique o console (F12) para ver o código SQL gerado.");
        modal.removeClass('open');
        this.reset();
    });
});