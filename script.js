// --- AOS Initialization ---
AOS.init({
    duration: 800, // Duração da animação em ms
    once: true,    // Animação acontece apenas uma vez
    offset: 100,    // Trigger animation slightly later
    delay: 100,     // Slight delay globally
  });
  
  // --- Sticky Header Background Change ---
  const header = document.getElementById('main-header');
  const scrollThreshold = 50; // Pixels to scroll before changing header
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  
  // --- Versículo do Dia Logic (Existing Code) ---
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
      // Adicione MUITO MAIS versículos aqui!
  ];
  
  function exibirVersiculoDoDia() {
      const elementoTexto = document.getElementById('versiculo-do-dia-texto');
      const elementoRef = document.getElementById('versiculo-do-dia-ref');
  
      if (!elementoTexto || !elementoRef) {
          console.error("Elementos para o versículo do dia não encontrados!");
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
  
      const indice = (diaDoAno - 1 + versiculosDiarios.length) % versiculosDiarios.length; // Ensure positive index
      const versiculoSelecionado = versiculosDiarios[indice];
  
      elementoTexto.textContent = `"${versiculoSelecionado.texto}"`;
      elementoRef.textContent = `- ${versiculoSelecionado.referencia}`;
  }
  
  document.addEventListener('DOMContentLoaded', exibirVersiculoDoDia);
  
  
  // --- Rolagem Suave para links internos ---
  document.querySelectorAll('header nav a[href^="#"], .hero-content a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
  
          if (targetElement) {
              let headerOffset = header.offsetHeight;
              // Adjust offset if header might change height (or use a fixed value)
              if (!header.classList.contains('scrolled') && window.pageYOffset < scrollThreshold) {
                   // Estimate height before scroll or use a fixed value if simpler
                   // headerOffset = 70; // Example fixed offset
              }
  
              const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
              const offsetPosition = elementPosition - headerOffset - 20; // Extra space
  
              window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth"
              });
          }
      });
  });
  
  // --- Atualizar Ano no Rodapé ---
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  
  // --- (Opcional) Mobile Menu Toggle ---
  // Add JavaScript here if you implement a burger menu for mobile navigation
  /* Example (needs corresponding HTML burger button):
  const navToggle = document.querySelector('.nav-toggle-button'); // Add this button in HTML
  const navMenu = document.querySelector('#main-header nav ul');
  
  navToggle.addEventListener('click', () => {
      navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex'; // Basic toggle
      // Add class toggling for better animation/styling
  });
  */