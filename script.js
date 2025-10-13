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

// Render utilitário
function createDestinoCard(destino) {
  const card = document.createElement('article');
  card.className = 'card';
  card.innerHTML = `
    <div class="card__media">
      <img src="${destino.img}" alt="${destino.nome}">
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

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  renderDestinosHome();
  renderDestinosGrid();
});

// =============================
// Carrossel de Roteiros (Home)
// =============================
const roteiros = [
  { titulo: 'Luanda cultural', desc: 'Museus, Marginal e Ilha.' },
  { titulo: 'Aventura na Huíla', desc: 'Tundavala e Serra da Leba.' },
  { titulo: 'Costa de Benguela', desc: 'Praias e gastronomia.' },
  { titulo: 'Serra da Leba', desc: 'Miradouros e curvas icónicas.' },
  { titulo: 'Malanje total', desc: 'Kalandula e Pungo Andongo.' },
  { titulo: 'Safari em Quiçama', desc: 'Fauna e paisagens savânicas.' },
];

function renderRoteirosCarousel() {
  const vp = document.getElementById('carouselRoteiros');
  if (!vp) return;
  vp.innerHTML = '';
  roteiros.forEach((r) => {
    const item = document.createElement('article');
    item.className = 'roteiro-card';
    item.innerHTML = `<h3>${r.titulo}</h3><p>${r.desc}</p>`;
    vp.appendChild(item);
  });

  let index = 0;
  const leftBtn = document.querySelector('.carousel__arrow--left');
  const rightBtn = document.querySelector('.carousel__arrow--right');
  const visible = 3; // 3 visíveis

  // Clone para looping infinito (efeito circular suave)
  // Clonamos o primeiro e último bloco de 3 itens para as extremidades
  const group = visible;
  const prepend = roteiros.slice(-group);
  const append = roteiros.slice(0, group);

  const items = Array.from(vp.children);
  // Prepend
  prepend.forEach((r) => {
    const item = document.createElement('article');
    item.className = 'roteiro-card';
    item.innerHTML = `<h3>${r.titulo}</h3><p>${r.desc}</p>`;
    vp.insertBefore(item, vp.firstChild);
  });
  // Append
  append.forEach((r) => {
    const item = document.createElement('article');
    item.className = 'roteiro-card';
    item.innerHTML = `<h3>${r.titulo}</h3><p>${r.desc}</p>`;
    vp.appendChild(item);
  });

  const gap = 16; // mesmo do CSS

  function getItemWidth() {
    const width = vp.clientWidth;
    return (width - (visible - 1) * gap) / visible;
  }

  function setTranslate(newIndex, animated = true) {
    const itemWidth = getItemWidth();
    vp.style.transition = animated ? 'transform .35s ease' : 'none';
    vp.style.transform = `translateX(-${newIndex * (itemWidth + gap)}px)`;
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
    item.innerHTML = `<h3>${prefixo}${r.titulo}</h3><p>${r.desc}</p>`;
    page.appendChild(item);
  });
}

document.addEventListener('DOMContentLoaded', renderRoteirosPage);
