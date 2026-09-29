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
