document.addEventListener('DOMContentLoaded', function() {
    const nodes = document.querySelectorAll('.node-header');
    nodes.forEach(node => {
      node.addEventListener('click', function() {
        const content = node.nextElementSibling;
        content.style.display = (content.style.display === 'none' || content.style.display === '') ? 'block' : 'none';
      });
    });
  });
  