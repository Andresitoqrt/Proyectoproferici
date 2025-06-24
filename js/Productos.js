const API_URL = 'https://685ac4819f6ef9611157b4d1.mockapi.io/Andresflores_CarlosGonzales/Productos';
const IMG_API_URL = 'https://api.imgbb.com/1/upload?key=578a7908d51e4ae0f1c7dfddfd786535';

const form = document.getElementById('Marca-form');
const nameEl = document.getElementById('name');
const priceEl = document.getElementById('price');
const name_ProductEl = document.getElementById('name_product');
const imagenFileEl = document.getElementById('imagen-file');
const imagenUrlEl = document.getElementById('imagen-url');
const idEl = document.getElementById('product-id');
const cancelBtn = document.getElementById('btn-cancel');
const submitBtn = document.getElementById('btn-submit');
const tbody = document.getElementById('product-tbody');

// Carga inicial
window.addEventListener('DOMContentLoaded', CargarProductos);

async function CargarProductos() {
  const res = await fetch(API_URL);
  const data = await res.json();
  CargarTabla(data);
}

function CargarTabla(Productos) {
  tbody.innerHTML = '';
  Productos.forEach(Productos => {
    tbody.innerHTML += `
    <tr>
      <td><img src="${Productos.imagen}" alt="Foto de ${Productos.name}" /></td>
      <td>${Productos.name}</td>
      <td>${Productos.price}</td>
      <td>${Productos.ProductsName}</td>
      <td>
        <button onclick="CargarParaEditar('${Productos.id}')">Editar</button>
        <button onclick="BorrarProductos('${Productos.id}')">Eliminar</button>
      </td>
    </tr>
    `;
  });
}

async function BorrarProductos(id) {
  if (!confirm('¿Eliminar este Productos?')) return;
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  CargarProductos();
  alert("El registro fue Productos");
}

async function CargarParaEditar(id) {
  const res = await fetch(`${API_URL}/${id}`);
  const p = await res.json();

  nameEl.value = p.name;
  priceEl.value = p.price;
  name_ProductEl.value = p.ProductsName;
  imagenUrlEl.value = p.imagen;
  imagenFileEl.value = '';
  idEl.value = p.id;

  submitBtn.textContent = 'Actualizar';
  cancelBtn.hidden = false;
}

cancelBtn.addEventListener('click', () => {
  form.reset();
  idEl.value = '';
  submitBtn.textContent = 'Agregar';
  cancelBtn.hidden = true;
});

async function subirImagen(file) {
  const fd = new FormData();
  fd.append('image', file);
  const res = await fetch(IMG_API_URL, { method: 'POST', body: fd });
  const obj = await res.json();
  return obj.data.url;
}

form.addEventListener('submit', async e => {
  e.preventDefault();

  let imageUrl = imagenUrlEl.value;
  if (imagenFileEl.files.length > 0) {
    imageUrl = await subirImagen(imagenFileEl.files[0]);
  }

  const payload = {
    name : nameEl.value,
    price: priceEl.value,
    ProductsName: name_ProductEl.value,
    imagen: imageUrl
  };

  if (idEl.value) {
    await fetch(`${API_URL}/${idEl.value}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    alert("Registro actualizado");
  } 
  else {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    alert("Registro agregado");
  }

  form.reset();
  cancelBtn.hidden = true;
  submitBtn.textContent = 'Agregar';
  CargarProductos();
});
