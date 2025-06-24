const API_URL = 'https://685ac4819f6ef9611157b4d1.mockapi.io/Andresflores_CarlosGonzales/Productos'

const container = document.getElementById('cards-container');

async function CargarPersonas() {
  try {
    const res  = await fetch(API_URL);
    const data = await res.json();
    CargarTarjetas(data);
  } catch (err) {
    console.error('Error al cargar datos:', err);
    container.innerHTML = '<p>Error al cargar las personas.</p>';
  }
}

function CargarTarjetas(personas) {
  container.innerHTML = '';
  if (!personas.length) {
    container.innerHTML = '<p>No hay personas registradas.</p>';
    return;
  }

  personas.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${p.imagen}" alt="Foto de ${p.Name}">
      <h2>${p.name}</h2>
      <p>💰 ${p.price}</p>
    `;
    container.appendChild(card);
  });
}

// Al cargar la página:
window.addEventListener('DOMContentLoaded', CargarPersonas);
