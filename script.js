// Navegação mobile (abrir/fechar)
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('is-open');
    nav.setAttribute('aria-expanded', String(!expanded));
  });
})();

// =============================
// Dados de destinos (placeholder)
// =============================
const destinos = [
  {
    id: 'tundavala',
    nome: 'Fenda da Tundavala',
    local: 'Lubango, Huíla',
    img: 'imagens/tundavala.jpg',
    descricao:
      'Miradouro icônico com penhascos dramáticos e vista deslumbrante sobre o planalto da Huíla.',
  },
  {
    id: 'morro-moco',
    nome: 'Morro do Môco',
    local: 'Huambo',
    img: 'imagens/morro.jpg',
    descricao:
      'Pico mais alto de Angola, trilhas para trekking e biodiversidade única nas suas encostas.',
  },
  {
    id: 'baia-azul',
    nome: 'Praia da Baía Azul',
    local: 'Benguela',
    img: 'imagens/baja.jpg',
    descricao:
      'Praia de águas calmas e cristalinas, ideal para lazer e passeios ao pôr do sol.',
  },
  {
    id: 'quicama',
    nome: 'Parque Nacional da Quiçama',
    local: 'Bengo/Luanda',
    img: 'imagens/quicama.jpg',
    descricao:
      'Reserva com fauna reintroduzida, safáris próximos a Luanda e paisagens savânicas.',
  },
  {
    id: 'pedras-negras',
    nome: 'Pedras Negras de Pungo Andongo',
    local: 'Malanje',
    img: 'imagens/pedras-negras.jpg',
    descricao:
      'Formações rochosas monumentais cheias de lendas e vistas do vale ao redor.',
  },
  {
    id: 'kalandula',
    nome: 'Quedas de Kalandula',
    local: 'Malanje',
    img: 'imagens/kalandula.jpg',
    descricao:
      'Uma das maiores cataratas de África, imponência e névoa criam um cenário inesquecível.',
  },
];

// =============================
// Dados de eventos (placeholder)
// =============================
const eventos = [
  {
    id: 'carnaval-luanda',
    nome: 'Carnaval de Luanda',
    local: 'Luanda',
    img: 'imagens/carnaval-luanda.jpg',
    descricao: 'Desfile com grupos carnavalescos, música, dança e tradição.'
  },
  {
    id: 'expo-benguela',
    nome: 'Expo Benguela',
    local: 'Benguela',
    img: 'imagens/expo-benguela.jpg',
    descricao: 'Feira de negócios, cultura e gastronomia regional.'
  },
  {
    id: 'festival-musica-huambo',
    nome: 'Festival de Música do Huambo',
    local: 'Huambo',
    img: 'imagens/festival-huambo.jpg',
    descricao: 'Artistas locais e nacionais celebrando a música angolana.'
  },
  {
    id: 'feira-artesanato-lubango',
    nome: 'Feira de Artesanato do Lubango',
    local: 'Lubango',
    img: 'imagens/feira-lubango.jpg',
    descricao: 'Peças artesanais, esculturas e tecidos tradicionais.'
  },
  {
    id: 'festas-tradicionais-kuito',
    nome: 'Festas Tradicionais do Kuito',
    local: 'Kuito, Bié',
    img: 'imagens/festas-kuito.jpg',
    descricao: 'Celebrações comunitárias com danças e rituais.'
  },
  {
    id: 'maratona-luanda',
    nome: 'Maratona de Luanda',
    local: 'Luanda',
    img: 'imagens/maratona-luanda.jpg',
    descricao: 'Evento desportivo com atletas nacionais e internacionais.'
  }
];

// Render utilitário
function createDestinoCard(destino) {
  const card = document.createElement('article');
  card.className = 'card';
  card.innerHTML = `
    <div class="card__media">
      <img src="${destino.img}" alt="${destino.nome}" onerror="fallbackDestino(this)">
    </div>
    <div class="card__body">
      <h3 class="card__title">${destino.nome}</h3>
      <div class="card__meta">${destino.local}</div>
    </div>
  `;
  card.addEventListener('click', () => openDestinoModal(destino));
  return card;
}

function renderDestinosHome() {
  const container = document.getElementById('destinosHome');
  if (!container) return;
  container.innerHTML = '';
  destinos.slice(0, 6).forEach((d) => container.appendChild(createDestinoCard(d)));
}

function renderDestinosGrid() {
  const grid = document.getElementById('destinosGrid');
  if (!grid) return;
  grid.innerHTML = '';
  destinos.forEach((d) => grid.appendChild(createDestinoCard(d)));
}

function createEventoCard(evento) {
  const card = document.createElement('article');
  card.className = 'card';
  card.innerHTML = `
    <div class="card__media">
      <img src="${evento.img}" alt="${evento.nome}" onerror="fallbackEvento(this)">
    </div>
    <div class="card__body">
      <h3 class="card__title">${evento.nome}</h3>
      <div class="card__meta">${evento.local}</div>
    </div>
  `;
  card.addEventListener('click', () => openDestinoModal(evento));
  return card;
}

function renderEventosHome() {
  const container = document.getElementById('eventosHome');
  if (!container) return;
  container.innerHTML = '';
  eventos.slice(0, 6).forEach((e) => container.appendChild(createEventoCard(e)));
}

function renderEventosGrid() {
  const grid = document.getElementById('eventosGrid');
  if (!grid) return;
  grid.innerHTML = '';
  eventos.forEach((e) => grid.appendChild(createEventoCard(e)));
}

// Modal
const modalEl = document.getElementById('modal');
const modalCloseBtn = modalEl ? modalEl.querySelector('.modal__close') : null;
const modalImg = document.getElementById('modalImg');
const modalTitulo = document.getElementById('modalTitulo');
const modalDescricao = document.getElementById('modalDescricao');
const modalLocal = document.getElementById('modalLocal');

function openDestinoModal(destino) {
  if (!modalEl) return;
  modalTitulo && (modalTitulo.textContent = destino.nome);
  modalDescricao && (modalDescricao.textContent = destino.descricao);
  modalLocal && (modalLocal.textContent = destino.local);
  if (modalImg) {
    modalImg.src = destino.img;
    modalImg.alt = destino.nome;
  }
  modalEl.classList.add('is-open');
  modalEl.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  if (!modalEl) return;
  modalEl.classList.remove('is-open');
  modalEl.setAttribute('aria-hidden', 'true');
}

modalCloseBtn && modalCloseBtn.addEventListener('click', closeModal);
modalEl && modalEl.addEventListener('click', (e) => { if (e.target === modalEl) closeModal(); });

// Fallbacks de imagem específicos
function fallbackDestino(imgEl) {
  imgEl.onerror = null;
  imgEl.src = 'https://placehold.co/600x400?text=Destino';
}

function fallbackEvento(imgEl) {
  imgEl.onerror = null;
  imgEl.src = 'https://placehold.co/600x400?text=Evento';
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  renderDestinosHome();
  renderDestinosGrid();
  renderEventosHome();
  renderEventosGrid();
});

// =============================
// Carrossel de Roteiros (Home)
// =============================
const roteiros = [
  { titulo: 'Luanda cultural', desc: 'Museus, Marginal e Ilha.', img: 'imagens/rot-luanda.jpg' },
  { titulo: 'Aventura na Huíla', desc: 'Tundavala e Serra da Leba.', img: 'imagens/rot-huila.jpg' },
  { titulo: 'Costa de Benguela', desc: 'Praias e gastronomia.', img: 'imagens/rot-benguela.jpg' },
  { titulo: 'Serra da Leba', desc: 'Miradouros e curvas icónicas.', img: 'imagens/rot-leba.jpg' },
  { titulo: 'Malanje total', desc: 'Kalandula e Pungo Andongo.', img: 'imagens/rot-malanje.jpg' },
  { titulo: 'Safari em Quiçama', desc: 'Fauna e paisagens savânicas.', img: 'imagens/rot-quicama.jpg' },
];

function renderRoteirosCarousel() {
  const vp = document.getElementById('carouselRoteiros');
  if (!vp) return;
  vp.innerHTML = '';
  // criamos os itens base primeiro
  const baseItems = roteiros.map((r) => {
    const item = document.createElement('article');
    item.className = 'roteiro-card';
    item.innerHTML = `
      <div class="card__body">
        <h3 class="card__title">${r.titulo}</h3>
        <p>${r.desc}</p>
      </div>`;
    return item;
  });
  baseItems.forEach((el) => vp.appendChild(el));

  let index = 0;
  const leftBtn = document.querySelector('.carousel__arrow--left');
  const rightBtn = document.querySelector('.carousel__arrow--right');
  const visible = 3; // 3 visíveis

  // Clone para looping infinito (efeito circular suave)
  // Clonamos o primeiro e último bloco de 3 itens para as extremidades
  const group = visible;
  const prepend = roteiros.slice(-group);
  const append = roteiros.slice(0, group);

  // Prepend
  prepend.forEach((r) => {
    const item = document.createElement('article');
    item.className = 'roteiro-card';
    item.innerHTML = `
      <div class=\"card__body\">
        <h3 class=\"card__title\">${r.titulo}</h3>
        <p>${r.desc}</p>
      </div>`;
    vp.insertBefore(item, vp.firstChild);
  });
  // Append
  append.forEach((r) => {
    const item = document.createElement('article');
    item.className = 'roteiro-card';
    item.innerHTML = `
      <div class=\"card__body\">
        <h3 class=\"card__title\">${r.titulo}</h3>
        <p>${r.desc}</p>
      </div>`;
    vp.appendChild(item);
  });

  const gap = 16; // mesmo do CSS

  function getItemWidth() {
    // como usamos flex e gap fixo, obter a largura real do primeiro card
    const first = vp.children[0];
    if (first) return first.getBoundingClientRect().width + gap; // inclui gap
    const width = vp.clientWidth;
    return (width - (visible - 1) * gap) / visible + gap;
  }

  function setTranslate(newIndex, animated = true) {
    const itemWidth = getItemWidth();
    vp.style.transition = animated ? 'transform .35s ease' : 'none';
    vp.style.transform = `translateX(-${newIndex * itemWidth}px)`;
  }

  // Começa após os prepends
  index = group;
  setTranslate(index, false);

  function snapLoop() {
    const maxRealIndex = group + roteiros.length - 1;
    if (index > maxRealIndex) {
      index = group; // volta ao início real
      setTranslate(index, false);
    } else if (index < group) {
      index = group + roteiros.length - 1; // vai ao fim real
      setTranslate(index, false);
    }
  }

  rightBtn && rightBtn.addEventListener('click', () => {
    index += 1;
    setTranslate(index, true);
    // Após a animação, corrigir para o índice equivalente
    setTimeout(snapLoop, 380);
  });

  leftBtn && leftBtn.addEventListener('click', () => {
    index -= 1;
    setTranslate(index, true);
    setTimeout(snapLoop, 380);
  });

  window.addEventListener('resize', () => setTranslate(index, false));
}

document.addEventListener('DOMContentLoaded', renderRoteirosCarousel);

// Página de Roteiros (recomendações)
function renderRoteirosPage() {
  const page = document.getElementById('roteirosPage');
  if (!page) return;
  page.innerHTML = '';
  // Construção diferente: destaque + lista
  roteiros.forEach((r, i) => {
    const item = document.createElement('article');
    item.className = 'roteiro-card';
    const prefixo = i === 0 ? 'Destaque: ' : '';
    item.innerHTML = `
      <div class="card__body">
        <h3 class="card__title">${prefixo}${r.titulo}</h3>
        <p>${r.desc}</p>
      </div>`;
    page.appendChild(item);
  });
}

document.addEventListener('DOMContentLoaded', renderRoteirosPage);

// =============================
// Reservas (simulação)
// =============================
const ofertas = [
  { id: 'of1', titulo: 'Hotel Baía Azul', tipo: 'hotel', destino: 'Benguela', img: 'imagens/hotel-baia.jpg', desc: 'Frente-mar, pequeno-almoço incluído.' },
  { id: 'of2', titulo: 'Lodge Tundavala View', tipo: 'lodge', destino: 'Lubango', img: 'imagens/lodge-tundavala.jpg', desc: 'Vista para a Tundavala, trilhas próximas.' },
  { id: 'of3', titulo: 'Guesthouse Morro do Môco', tipo: 'guesthouse', destino: 'Huambo', img: 'imagens/guest-morro.jpg', desc: 'Aconchegante, ideal para trekkers.' },
  { id: 'of4', titulo: 'Hotel Kalandula Falls', tipo: 'hotel', destino: 'Malanje', img: 'imagens/hotel-kalandula.jpg', desc: 'Próximo às quedas, quartos com varanda.' },
];

function renderOfertas(list) {
  const wrap = document.getElementById('reservasResultados');
  if (!wrap) return;
  wrap.innerHTML = '';
  list.forEach((o) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="card__media"><img src="${o.img}" alt="${o.titulo}" onerror="this.onerror=null;this.src='https://placehold.co/600x400?text=Reserva'"></div>
      <div class="card__body">
        <h3 class="card__title">${o.titulo}</h3>
        <div class="card__meta">${o.destino} · ${o.tipo}</div>
        <p>${o.desc}</p>
      </div>`;
    card.addEventListener('click', () => openDestinoModal({ nome: o.titulo, local: `${o.destino} · ${o.tipo}`, descricao: o.desc, img: o.img }));
    wrap.appendChild(card);
  });
}

function initReservas() {
  const selectDestino = document.getElementById('resDestino');
  const form = document.getElementById('formReservas');
  if (!selectDestino || !form) return;

  // popular destinos únicos
  const destinosSet = new Set(destinos.map((d) => d.local.split(',')[0]).concat(ofertas.map((o) => o.destino)));
  const unique = Array.from(destinosSet).sort();
  unique.forEach((d) => {
    const opt = document.createElement('option');
    opt.value = d;
    opt.textContent = d;
    selectDestino.appendChild(opt);
  });

  renderOfertas(ofertas);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const destino = document.getElementById('resDestino').value;
    const tipo = document.getElementById('resTipo').value;
    let list = ofertas.slice();
    if (destino) list = list.filter((o) => o.destino === destino);
    if (tipo) list = list.filter((o) => o.tipo === tipo);
    renderOfertas(list);
  });
}

document.addEventListener('DOMContentLoaded', initReservas);

// =============================
// Blog (cards + busca)
// =============================
const posts = [
  { id: 'p1', titulo: 'Guia rápido de Luanda', resumo: 'O que ver e comer em 48h.', img: 'imagens/post-luanda.jpg' },
  { id: 'p2', titulo: 'Roteiro Serra da Leba', resumo: 'Curvas, miradouros e segurança.', img: 'imagens/post-leba.jpg' },
  { id: 'p3', titulo: 'Praias de Benguela', resumo: 'Top 5 praias imperdíveis.', img: 'imagens/post-benguela.jpg' },
  { id: 'p4', titulo: 'Kalandula essencial', resumo: 'Quando ir e onde ficar.', img: 'imagens/post-kalandula.jpg' },
];

function renderPosts(list) {
  const grid = document.getElementById('blogGrid');
  if (!grid) return;
  grid.innerHTML = '';
  list.forEach((p) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="card__media"><img src="${p.img}" alt="${p.titulo}" onerror="this.onerror=null;this.src='https://placehold.co/600x400?text=Artigo'"></div>
      <div class="card__body">
        <h3 class="card__title">${p.titulo}</h3>
        <p>${p.resumo}</p>
      </div>`;
    grid.appendChild(card);
  });
}

function initBlog() {
  const input = document.getElementById('blogSearch');
  const btn = document.getElementById('blogSearchBtn');
  if (!input || !btn) return;
  renderPosts(posts);
  btn.addEventListener('click', () => {
    const q = input.value.trim().toLowerCase();
    const filtered = q ? posts.filter((p) => p.titulo.toLowerCase().includes(q) || p.resumo.toLowerCase().includes(q)) : posts;
    renderPosts(filtered);
  });
}

document.addEventListener('DOMContentLoaded', initBlog);

// =============================
// Login simples (simulação)
// =============================
function initAuth() {
  const form = document.getElementById('loginForm');
  const loginView = document.getElementById('loginView');
  const accountView = document.getElementById('accountView');
  const accountEmail = document.getElementById('accountEmail');
  const logoutBtn = document.getElementById('logoutBtn');
  const togglePwd = document.getElementById('togglePwd');
  const toRegister = document.getElementById('toRegister');
  const toLogin = document.getElementById('toLogin');
  const registerView = document.getElementById('registerView');
  if (!form || !loginView || !accountView) return;

  const saved = localStorage.getItem('da_user_email');
  if (saved) {
    loginView.style.display = 'none';
    accountView.style.display = '';
    accountEmail && (accountEmail.textContent = saved);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const pwd = document.getElementById('loginPassword').value;
    if (!email || !pwd) return;
    localStorage.setItem('da_user_email', email);
    loginView.style.display = 'none';
    accountView.style.display = '';
    accountEmail && (accountEmail.textContent = email);
  });

  logoutBtn && logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('da_user_email');
    accountView.style.display = 'none';
    loginView.style.display = '';
  });

  togglePwd && togglePwd.addEventListener('click', () => {
    const input = document.getElementById('loginPassword');
    if (!input) return;
    input.type = input.type === 'password' ? 'text' : 'password';
  });

  toRegister && toRegister.addEventListener('click', () => {
    loginView.style.display = 'none';
    registerView && (registerView.style.display = '');
  });
  toLogin && toLogin.addEventListener('click', () => {
    registerView && (registerView.style.display = 'none');
    loginView.style.display = '';
  });

  const registerForm = document.getElementById('registerForm');
  registerForm && registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const p1 = document.getElementById('regPassword').value;
    const p2 = document.getElementById('regPassword2').value;
    if (!name || !email || !p1 || p1 !== p2) return;
    // simula criação de conta
    localStorage.setItem('da_user_email', email);
    registerView && (registerView.style.display = 'none');
    accountView.style.display = '';
    accountEmail && (accountEmail.textContent = email);
  });
}

document.addEventListener('DOMContentLoaded', initAuth);

// =============================
// Guard: bloquear roteiros sem login
// =============================
function guardRoteirosAccess() {
  const isRoteirosPage = !!document.getElementById('roteirosPage');
  if (!isRoteirosPage) return;
  const logged = !!localStorage.getItem('da_user_email');
  if (!logged) {
    window.location.href = 'area-utilizador.html?next=roteiros.html';
  }
}

document.addEventListener('DOMContentLoaded', guardRoteirosAccess);

// =============================
// Animações de entrada suaves
// =============================
function applyRevealAnimations() {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        obs.unobserve(entry.target);
      }
    });
  }, { root: null, threshold: 0.12, rootMargin: '0px 0px -10% 0px' });

  // Alvos: itens de cards, cabeçalhos e itens do carrossel
  const groups = [
    ...document.querySelectorAll('.cards'),
    ...document.querySelectorAll('.section-header'),
    ...document.querySelectorAll('.carousel__viewport')
  ];
  groups.forEach((group) => {
    const children = group.classList.contains('section-header')
      ? Array.from(group.children)
      : Array.from(group.children);
    children.forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${Math.min(i * 60, 360)}ms`;
      observer.observe(el);
    });
  });
}

document.addEventListener('DOMContentLoaded', applyRevealAnimations);

// Reaplicar após renders dinâmicos
const _apply = () => applyRevealAnimations();
