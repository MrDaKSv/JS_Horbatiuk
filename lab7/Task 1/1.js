// відображення розмірів і координат блоків
document.getElementById('getInfoBtn').addEventListener('click', function() {
  const blocks = document.querySelectorAll('.block');
  blocks.forEach(block => {
    const rect = block.getBoundingClientRect();
    const containerRect = document.getElementById('container').getBoundingClientRect();
    const scrollTop = document.getElementById('container').scrollTop;
    const blockInfo = `
      Розміри блоку ${block.id}: ${rect.width}px x ${rect.height}px.
      Координати відносно вікна: (${rect.left}px, ${rect.top}px).
      Координати відносно контейнера: (${rect.left - containerRect.left}px, ${rect.top - containerRect.top}px).
      Поточна позиція прокрутки контейнера: ${scrollTop}px.
    `;
    alert(blockInfo);
  });
});

// зміна розмірів блоку
document.querySelectorAll('.block').forEach(block => {
  block.addEventListener('click', function() {
    const newWidth = prompt('Введіть нову ширину для блоку:');
    const newHeight = prompt('Введіть нову висоту для блоку:');
    if (newWidth && newHeight) {
      block.style.width = newWidth + 'px';
      block.style.height = newHeight + 'px';
    }
  });
});

// показ або приховування
document.querySelectorAll('[data-toggle-id]').forEach(toggler => {
  const targetId = toggler.getAttribute('data-toggle-id');
  toggler.addEventListener('click', function() {
    const targetElement = document.getElementById(targetId);

    targetElement.classList.toggle('hidden');
  });
});
