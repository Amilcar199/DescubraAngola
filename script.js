// ================================
// 📍 Modal para destinos/eventos
// ================================
const modal = document.getElementById('modal');
const modalTitulo = document.getElementById('modalTitulo');
const modalDescricao = document.getElementById('modalDescricao');

function abrirModal(titulo) {
  if (!modal || !modalTitulo || !modalDescricao) return;
  modal.style.display = 'flex';
  modalTitulo.textContent = titulo;
  modalDescricao.textContent = `Aqui vai aparecer mais detalhes sobre ${titulo}. 
  Podes meter a história, localização, preço e outras informações.`;
}
function fecharModal() {
  if (!modal) return;
  modal.style.display = 'none';
}

// ================================
// 🧭 Scroll com setas nos roteiros
// ================================
function scrollRoteiros(direcao) {
  const container = document.getElementById('roteirosContainer');
  if (!container) return;
  const scrollAmount = 300; // distância que ele rola
  if (direcao === 'direita') {
    container.scrollLeft += scrollAmount;
  } else {
    container.scrollLeft -= scrollAmount;
  }
}

// ================================
// 📌 "Ver todos" destinos e eventos
// ================================
function mostrarMaisDestinos() {
  alert('Aqui vai abrir a página com mais destinos populares!');
}
function mostrarMaisEventos() {
  alert('Aqui vai abrir a página com mais eventos culturais!');
}

// Fechar modal se clicar fora
window.onclick = function(e) {
  if (e.target === modal) {
    fecharModal();
  }
}
