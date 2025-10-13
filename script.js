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
