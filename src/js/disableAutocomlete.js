'use strict';

(function () {
  const fields = document.querySelectorAll('input');

  fields.forEach(field => {
    field.addEventListener('focus', function () {
      field.removeAttribute('readonly');
    });
  });
})();

// Переписать с делегированием
