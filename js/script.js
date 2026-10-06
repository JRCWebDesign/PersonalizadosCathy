(() => {
  const input = document.getElementById('mug-input');
  const phrase = document.getElementById('mug-phrase');
  const mug = document.querySelector('.mug');
  const count = document.getElementById('character-count');
  const link = document.getElementById('idea-link');
  if (!input || !phrase || !mug || !count || !link) return;

  function updatePreview() {
    const text = input.value.trim();
    const color = document.querySelector('input[name="ink"]:checked');
    phrase.textContent = text || 'Tu frase acá';
    mug.classList.toggle('long-phrase', text.length > 28);
    count.textContent = `${input.value.length}/48`;
    mug.style.setProperty('--print', color.value);
    mug.setAttribute('aria-label', `Taza ilustrativa con la frase: ${text || 'Tu frase acá'}. Color ${color.dataset.name}.`);
    const message = text
      ? `Hola Cathy! Quiero consultar por una taza con la frase: "${text}", en color ${color.dataset.name}. ¿Me contás precio y tiempos?`
      : 'Hola Cathy! Quiero consultar por una taza personalizada. ¿Me ayudás con una idea?';
    link.href = `https://wa.me/59896018390?text=${encodeURIComponent(message)}`;
  }

  input.addEventListener('input', updatePreview);
  document.querySelectorAll('input[name="ink"]').forEach(color => {
    color.addEventListener('change', updatePreview);
  });
  document.querySelectorAll('[data-phrase]').forEach(button => {
    button.addEventListener('click', () => {
      input.value = button.dataset.phrase;
      updatePreview();
    });
  });
  updatePreview();
  document.getElementById('editor').hidden = false;
})();

(() => {
  const products = (window.CATHY_PRODUCTOS || []).filter(p => p.activo && p.nombre);
  const grid = document.getElementById('product-grid');
  const rows = document.getElementById('cart-items');
  const total = document.getElementById('cart-total');
  const notes = document.getElementById('order-notes');
  const orderLink = document.getElementById('order-link');
  const cart = new Map();
  const drawer = document.getElementById('cart-drawer');
  const toggles = document.querySelectorAll('.cart-toggle');
  const floatingCart = document.querySelector('.floating-cart');
  let opener = null;
  function openCart(event) {
    opener = event.currentTarget;
    drawer.showModal();
    document.body.classList.add('cart-open');
    toggles.forEach(button => button.setAttribute('aria-expanded', 'true'));
  }
  function closeCart() { drawer.close(); }
  toggles.forEach(button => button.addEventListener('click', openCart));
  drawer.querySelector('.drawer-close').addEventListener('click', closeCart);
  drawer.querySelector('.continue-shopping').addEventListener('click', closeCart);
  drawer.addEventListener('click', event => {
    if (event.target === drawer) {
      const bounds = drawer.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeCart();
    }
  });
  drawer.addEventListener('close', () => {
    document.body.classList.remove('cart-open');
    toggles.forEach(button => button.setAttribute('aria-expanded', 'false'));
    if (opener && !opener.hidden) opener.focus();
  });
  const money = value => new Intl.NumberFormat('es-UY', { style: 'currency', currency: 'UYU', maximumFractionDigits: 2 }).format(value);
  const hasPrice = p => typeof p.precio === 'number' && Number.isFinite(p.precio) && p.precio >= 0;
  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function updateCart() {
    const focusedLabel = rows.contains(document.activeElement) ? document.activeElement.getAttribute('aria-label') : null;
    rows.replaceChildren();
    const selected = products.filter(p => cart.has(p.id));
    if (!selected.length) rows.append(element('p', '', 'Todavía no agregaste productos.'));
    let subtotal = 0;
    selected.forEach(p => {
      const quantity = cart.get(p.id);
      if (hasPrice(p)) subtotal += quantity * p.precio;
      const row = element('div', 'cart-row');
      const productInfo = element('div', 'cart-product-info');
      if (p.imagen) {
        const thumbnail = element('img', 'cart-thumbnail');
        thumbnail.src = p.imagen;
        thumbnail.alt = '';
        thumbnail.width = 56;
        thumbnail.height = 56;
        thumbnail.onerror = () => thumbnail.remove();
        productInfo.append(thumbnail);
      }
      productInfo.append(element('strong', '', p.nombre));
      row.append(productInfo);
      const controls = element('div', 'cart-controls');
      const minus = element('button', '', '−');
      minus.type = 'button';
      minus.setAttribute('aria-label', 'Quitar una unidad de ' + p.nombre);
      minus.onclick = () => { if (quantity === 1) cart.delete(p.id); else cart.set(p.id, quantity - 1); updateCart(); };
      const plus = element('button', '', '+');
      plus.type = 'button';
      plus.disabled = quantity >= 99;
      plus.setAttribute('aria-label', 'Agregar una unidad de ' + p.nombre);
      plus.onclick = () => { cart.set(p.id, Math.min(99, quantity + 1)); updateCart(); };
      controls.append(minus, element('span', '', String(quantity)), plus);
      row.append(controls);
      rows.append(row);
    });
    if (focusedLabel) {
      const nextFocus = Array.from(rows.querySelectorAll('button')).find(button => button.getAttribute('aria-label') === focusedLabel);
      (nextFocus || drawer.querySelector('.continue-shopping')).focus();
    }
    const allPriced = selected.length && selected.every(hasPrice);
    total.textContent = selected.length ? (allPriced ? 'Total: ' + money(subtotal) : 'Precio final a confirmar por WhatsApp.' + (subtotal ? ' Subtotal de productos con precio: ' + money(subtotal) : '')) : '';
    orderLink.hidden = !selected.length;
    const itemCount = selected.reduce((sum, p) => sum + cart.get(p.id), 0);
    document.querySelectorAll('.cart-count').forEach(badge => { badge.textContent = itemCount; });
    floatingCart.hidden = !itemCount;
    const lines = selected.map(p => '- ' + cart.get(p.id) + ' × ' + p.nombre + (hasPrice(p) ? ' (' + money(p.precio) + ' c/u)' : ' (consultar precio)'));
    const message = ['Hola Cathy! Quiero hacer este pedido:', ...lines, total.textContent, notes.value.trim() ? 'Personalización: ' + notes.value.trim() : 'Quiero coordinar la personalización.', '¿Me confirmás disponibilidad, diseño y tiempos?'].join('\n');
    orderLink.href = 'https://wa.me/59896018390?text=' + encodeURIComponent(message);
  }
  products.forEach(p => {
    const card = element('article', 'product-card');
    card.id = p.id;
    const placeholder = () => element('div', 'product-placeholder', p.nombre);
    if (p.imagen) {
      const img = element('img');
      img.src = p.imagen;
      img.alt = p.nombre;
      img.loading = 'lazy';
      img.width = 400;
      img.height = 400;
      img.onerror = () => img.replaceWith(placeholder());
      card.append(img);
    } else card.append(placeholder());
    card.append(element('h3', '', p.nombre), element('p', '', p.descripcion));
    if (p.opciones) card.append(element('p', 'product-options', p.opciones));
    card.append(element('p', 'product-price', hasPrice(p) ? money(p.precio) : 'Consultar precio'));
    const button = element('button', 'button', 'Agregar al pedido +');
    button.type = 'button';
    button.setAttribute('aria-label', 'Agregar ' + p.nombre + ' al pedido');
    button.onclick = () => {
      cart.set(p.id, Math.min(99, (cart.get(p.id) || 0) + 1));
      updateCart();
      document.getElementById('cart-status').textContent = p.nombre + ' agregado al pedido.';
      button.textContent = 'Agregado ✓';
      setTimeout(() => { button.textContent = 'Agregar al pedido +'; }, 1200);
    };
    card.append(button);
    grid.append(card);
  });
  notes.addEventListener('input', updateCart);
  updateCart();
})();
