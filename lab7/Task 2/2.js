// кнопка додавання нового блоку
document.getElementById('addBlockBtn').addEventListener('click', function() {
  const container = document.getElementById('container');
  const blockContent = prompt('Введіть текст для нового блоку:');
  if (blockContent) {
    const block = document.createElement('div');
    block.classList.add('block');
    block.textContent = blockContent;
    block.style.backgroundColor = getRandomColor();
    block.style.width = getRandomSize() + 'px';
    block.style.height = getRandomSize() + 'px';
    block.addEventListener('click', function() {
      const rect = block.getBoundingClientRect();
      alert(`Розміри блоку: ${rect.width}px x ${rect.height}px.\nКоординати: (${rect.left}px, ${rect.top}px)`);
    });
    container.appendChild(block);
    animateBlock(block, 'fadeIn');
    scrollToBottom();
  }
});
// видалення блоку при кліку на нього
document.getElementById('container').addEventListener('click', function(event) {
  if (event.target.classList.contains('block')) {
    const block = event.target;
    animateBlock(block, 'fadeOut', function() {
      block.remove();
      scrollToTop();
    });
  }
});
// зміна кольору блоку при наведенні миші
document.getElementById('container').addEventListener('mouseover', function(event) {
  if (event.target.classList.contains('block')) {
    event.target.style.backgroundColor = getRandomColor();
  }
});

// випадаюче меню
document.getElementById('container').addEventListener('contextmenu', function(event) {
  event.preventDefault(); // Заборона стандартної події контекстного меню
  const targetBlock = event.target;
  if (targetBlock.classList.contains('block')) {
    const newContent = prompt('Введіть новий текст для блоку:');
    if (newContent) {
      targetBlock.textContent = newContent;
    }
  }
});
// отримання випадкового кольору
function getRandomColor() {
  return '#' + Math.floor(Math.random()*16777215).toString(16);
}
// отримання випадкового розміру блоку
function getRandomSize() {
  return Math.floor(Math.random() * (150 - 50) + 50);
}
// анімація блоку
function animateBlock(element, animation, callback) {
  element.style.animation = `${animation} 0.5s`;
  element.addEventListener('animationend', function() {
    element.style.animation = '';
    if (callback) callback();
  });
}

function scrollToTop() {
  document.getElementById('container').scrollTop = 0;
}

function scrollToBottom() {
  const container = document.getElementById('container');
  container.scrollTop = container.scrollHeight;
}