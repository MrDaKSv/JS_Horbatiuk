function createTabs(tabNode) {
    const tabButtons = [];
    const tabContents = [];
  
    // збираються дані з дочірніх елементів
    tabNode.childNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE && node.getAttribute('data-tabname')) {
        const tabName = node.getAttribute('data-tabname');
        tabButtons.push(createTabButton(tabName));
        tabContents.push(node);
      }
    });
  
    // створюється верхня панель з кнопками закладок
    const tabPanel = document.createElement('div');
    tabPanel.classList.add('tab-panel');
    tabButtons.forEach(button => {
      tabPanel.appendChild(button);
    });
  
    // прикріплення панелі закладок
    tabNode.insertBefore(tabPanel, tabNode.firstChild);
  
    // вивід вмісту закладок та додавання обробник подій
    tabContents.forEach((content, index) => {
      if (index === 0) {
        content.style.display = 'block';
        tabButtons[index].classList.add('active');
      } else {
        content.style.display = 'none';
      }
      tabButtons[index].addEventListener('click', () => switchTab(index));
    });
  
    // функція перемикання між закладками
    function switchTab(selectedIndex) {
      tabContents.forEach((content, index) => {
        if (index === selectedIndex) {
          content.style.display = 'block';
          tabButtons[index].classList.add('active');
        } else {
          content.style.display = 'none';
          tabButtons[index].classList.remove('active');
        }
      });
    }
  
    // функція створення кнопки закладки
    function createTabButton(tabName) {
      const button = document.createElement('button');
      button.textContent = tabName;
      return button;
    }
  }
  
  // виклик функції createTabs для вузла з id="tabs"
  createTabs(document.getElementById('tabs'));