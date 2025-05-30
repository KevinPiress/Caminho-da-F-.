// --- AOS Initialization ---
AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    delay: 100,
});

// --- Sticky Header Background Change ---
const header = document.getElementById('main-header');
const scrollThreshold = 50;

window.addEventListener('scroll', () => {
    if (window.pageYOffset > scrollThreshold) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// --- Versículo do Dia Logic ---
const versiculosDiarios = [
    { texto: "O Senhor te abençoe e te guarde; o Senhor faça resplandecer o seu rosto sobre ti e te conceda graça; o Senhor volte para ti o seu rosto e te dê paz.", referencia: "Números 6:24-26" },
    { texto: "Porque sou eu que conheço os planos que tenho para vocês', diz o Senhor, 'planos de fazê-los prosperar e não de causar dano, planos de dar a vocês esperança e um futuro.", referencia: "Jeremias 29:11" },
    { texto: "Deleitem-se no Senhor, e ele atenderá aos desejos do seu coração.", referencia: "Salmos 37:4" },
    { texto: "Confie no Senhor de todo o seu coração e não se apóie em seu próprio entendimento; reconheça o Senhor em todos os seus caminhos, e ele endireitará as suas veredas.", referencia: "Provérbios 3:5-6" },
    { texto: "O amor é paciente, o amor é bondoso. Não inveja, não se vangloria, não se orgulha.", referencia: "1 Coríntios 13:4" },
    { texto: "Venham a mim, todos os que estão cansados e sobrecarregados, e eu darei descanso a vocês.", referencia: "Mateus 11:28" },
    { texto: "Mas aqueles que esperam no Senhor renovam as suas forças. Voam alto como águias; correm e não ficam exaustos, andam e não se cansam.", referencia: "Isaías 40:31" },
    { texto: "Não andem ansiosos por coisa alguma, mas em tudo, pela oração e súplicas, e com ação de graças, apresentem seus pedidos a Deus.", referencia: "Filipenses 4:6" },
    { texto: "E a paz de Deus, que excede todo o entendimento, guardará o coração e a mente de vocês em Cristo Jesus.", referencia: "Filipenses 4:7" },
    { texto: "Pois o salário do pecado é a morte, mas o dom gratuito de Deus é a vida eterna em Cristo Jesus, nosso Senhor.", referencia: "Romanos 6:23" },
    { texto: "Mas Deus demonstra seu amor por nós: Cristo morreu em nosso favor quando ainda éramos pecadores.", referencia: "Romanos 5:8" },
    { texto: "Respondeu Jesus: 'Eu sou o caminho, a verdade e a vida. Ninguém vem ao Pai, a não ser por mim.'", referencia: "João 14:6" },
    { texto: "Tudo posso naquele que me fortalece.", referencia: "Filipenses 4:13" },
    { texto: "O Senhor é o meu pastor; nada me faltará.", referencia: "Salmos 23:1" },
    { texto: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.", referencia: "João 3:16" },
    { texto: "Ensina-nos a contar os nossos dias para que o nosso coração alcance sabedoria.", referencia: "Salmos 90:12" },
    { texto: "O coração alegre aformoseia o rosto, mas pela dor do coração o espírito se abate.", referencia: "Provérbios 15:13" },
    { texto: "Lancem sobre ele toda a sua ansiedade, porque ele tem cuidado de vocês.", referencia: "1 Pedro 5:7" },
    { texto: "O Senhor é a minha força e o meu escudo; nele o meu coração confia, e dele recebo ajuda. Meu coração exulta de alegria, e com o meu cântico lhe darei graças.", referencia: "Salmos 28:7" },
    { texto: "Não se amoldem ao padrão deste mundo, mas transformem-se pela renovação da sua mente, para que sejam capazes de experimentar e comprovar a boa, agradável e perfeita vontade de Deus.", referencia: "Romanos 12:2" },
];

function exibirVersiculoDoDia() {
    const elementoTexto = document.getElementById('versiculo-do-dia-texto');
    const elementoRef = document.getElementById('versiculo-do-dia-ref');

    // Só executa se os elementos existirem na página atual
    if (!elementoTexto || !elementoRef) {
        return;
    }

    if (versiculosDiarios.length === 0) {
        elementoTexto.textContent = "Nenhum versículo disponível.";
        elementoRef.textContent = "";
        return;
    }

    const agora = new Date();
    const inicioDoAno = new Date(agora.getFullYear(), 0, 0);
    const diff = agora - inicioDoAno;
    const umDia = 1000 * 60 * 60 * 24;
    const diaDoAno = Math.floor(diff / umDia);

    const indice = (diaDoAno - 1 + versiculosDiarios.length) % versiculosDiarios.length;
    const versiculoSelecionado = versiculosDiarios[indice];

    elementoTexto.textContent = `"${versiculoSelecionado.texto}"`;
    elementoRef.textContent = `- ${versiculoSelecionado.referencia}`;
}

// --- Mobile Menu Toggle ---
const navToggle = document.getElementById('nav-toggle-button');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('nav-menu-active');
        const isExpanded = navMenu.classList.contains('nav-menu-active');
        navToggle.setAttribute('aria-expanded', isExpanded.toString());
    });
}

// --- Highlight Active Navigation Link & Year ---
document.addEventListener('DOMContentLoaded', () => {
    // Versículo do dia (chamado aqui para garantir que o DOM está pronto)
    exibirVersiculoDoDia();

    // Atualizar Ano no Rodapé
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Highlight active nav link
    const navLinks = document.querySelectorAll('#main-header nav ul a');
    const currentPagePath = window.location.pathname; // e.g., "/caminho/inspiracao.html" or "/inspiracao.html"
    const currentPageFile = currentPagePath.substring(currentPagePath.lastIndexOf('/') + 1); // e.g., "inspiracao.html"

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        const linkFile = linkHref.substring(linkHref.lastIndexOf('/') + 1);

        // Handle index.html or empty path for homepage
        if ((currentPageFile === "" || currentPageFile === "index.html") && (linkFile === "index.html" || linkFile === "")) {
            link.classList.add('active');
        } else if (linkFile === currentPageFile && currentPageFile !== "") {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});